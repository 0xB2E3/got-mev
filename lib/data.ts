import { fromHex } from "alchemy-sdk";
import { alchemy, getBlock, getTransaction, getTransactionReceiptsForBlock, getTransfersForBlock } from "./alchemy";
import { getFlashbotsBlock } from "./flashbots";
import { BlockData, TransactionData, TransactionTransferSummary, TransferData } from "./types";

function summarizeTransfers(transfers: TransferData[]): TransactionTransferSummary {
  const totals: Record<string, Record<string, number>> = {};
  const assets = new Set<string>();
  const addresses: string[] = [];

  for (const transfer of transfers) {
    let asset = transfer.asset;
    // combine WETH & ETH
    if (asset === "WETH") asset = "ETH";

    if (!addresses.includes(transfer.fromAddress)) {
      addresses.push(transfer.fromAddress);
    }

    totals[transfer.fromAddress] ||= {};
    totals[transfer.fromAddress][asset] ||= 0;
    totals[transfer.fromAddress][asset] -= transfer.value ?? 0;

    if (!addresses.includes(transfer.toAddress)) {
      addresses.push(transfer.toAddress);
    }

    totals[transfer.toAddress] ||= {};
    totals[transfer.toAddress][asset] ||= 0;
    totals[transfer.toAddress][asset] += transfer.value ?? 0;

    assets.add(asset);
  }

  return {
    totals,
    assets: Array.from(assets),
    addresses,
  };
}

export async function getData(txHash: string): Promise<BlockData | null> {
  const transaction = await getTransaction(txHash);
  if (!transaction) return null;

  const blockNumber = transaction.blockNumber!;

  const flashbotsBlock = await getFlashbotsBlock(blockNumber);
  const alchemyBlock = await getBlock(blockNumber);
  const alchemyTransfers = await getTransfersForBlock(blockNumber);
  const alchemyReceipts = await getTransactionReceiptsForBlock(blockNumber);

  const block: BlockData = {
    number: blockNumber,
    timestamp: alchemyBlock.timestamp,
    miner: alchemyBlock.miner,
    transactions: [],
    flashbots: false,
    numTransactions: alchemyBlock.transactions.length,
  };

  const txByHash: Record<string, TransactionData> = {};

  for (const receipt of alchemyReceipts) {
    const gasUsed = fromHex(receipt.gasUsed.toString());
    const effectiveGasPrice = Math.round(fromHex(receipt.effectiveGasPrice.toString()) * 1e-9);

    const transaction: TransactionData = {
      hash: receipt.transactionHash,
      fromAddress: receipt.from,
      toAddress: receipt.to,
      transfers: [],
      flashbots: false,
      summary: { totals: {}, assets: [], addresses: [] },
      gasUsed,
      effectiveGasPrice,
      paymentGas: gasUsed * 1e-9 * effectiveGasPrice,
      paymentTransfer: 0,
      paymentTotal: 0,
    };
    block.transactions.push(transaction);
    txByHash[receipt.transactionHash] = transaction;
  }

  for (const transfer of alchemyTransfers) {
    if (
      transfer.from == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" ||
      transfer.to == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    )
      continue;

    const transferData: TransferData = {
      fromAddress: transfer.from,
      toAddress: transfer.to ?? "-",
      category: transfer.category,
      value: transfer.value ?? 0,
      tokenId: transfer.tokenId ?? "-",
      asset: transfer.asset ?? "???",
    };
    txByHash[transfer.hash].transfers.push(transferData);
  }

  let bundleIndex: number | undefined = undefined;

  if (flashbotsBlock !== null) {
    block.flashbots = true;

    for (const tx of flashbotsBlock.transactions) {
      txByHash[tx.transaction_hash].flashbots = true;
      txByHash[tx.transaction_hash].flashbotsBundleIndex = tx.bundle_index;
      if (tx.transaction_hash == txHash) {
        bundleIndex = tx.bundle_index;
      }
    }
  }

  if (bundleIndex !== undefined) {
    block.transactions = block.transactions.filter((t) => t.flashbotsBundleIndex === bundleIndex);
  } else {
    block.transactions = block.transactions.filter((t) => t.hash === txHash);
  }

  for (const tx of block.transactions) {
    tx.summary = summarizeTransfers(tx.transfers);
    const minerTransfers = tx.summary.totals[block.miner.toLowerCase()] ?? {};
    const minerPayment = minerTransfers["ETH"] ?? 0;
    tx.paymentTransfer = minerPayment;
    tx.paymentTotal = tx.paymentGas + tx.paymentTransfer;
  }

  return block;
}
