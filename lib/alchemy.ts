import { Alchemy, AssetTransfersCategory, AssetTransfersResult, Network, toHex } from "alchemy-sdk";

const ALCHEMY_API_KEY = process.env.ALCHEMY_KEY ?? "";

export const alchemy = new Alchemy({
  apiKey: ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
});

const TRANSFER_CATEGORIES = [
  AssetTransfersCategory.INTERNAL,
  AssetTransfersCategory.EXTERNAL,
  AssetTransfersCategory.ERC20,
  // AssetTransfersCategory.ERC1155,
  // AssetTransfersCategory.ERC721,
];

export async function getTransfersForBlock(blockNumber: number): Promise<AssetTransfersResult[]> {
  const blockNumberHex = toHex(blockNumber);
  const { transfers } = await alchemy.core.getAssetTransfers({
    fromBlock: blockNumberHex,
    toBlock: blockNumberHex,
    category: TRANSFER_CATEGORIES,
  });
  return transfers;
}

export async function getTransaction(txHash: string) {
  return await alchemy.core.getTransaction(txHash);
}

export async function getBlock(blockNumber: number) {
  return await alchemy.core.getBlock(blockNumber);
}

export async function getTransactionReceiptsForBlock(blockNumber: number) {
  const { receipts } = await alchemy.core.getTransactionReceipts({ blockNumber: toHex(blockNumber) });
  if (receipts === null) {
    throw new Error(`transaction receipts null`);
  }
  return receipts;
}
