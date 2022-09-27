type FlashbotsBundleType = "flashbots" | "rogue" | "miner_payout";

type FlashbotsTransaction = {
  transaction_hash: string;
  tx_index: number;
  bundle_type: FlashbotsBundleType;
  bundle_index: number;
  block_number: number;
  eoa_address: string;
  to_address: string;
  gas_used: number;
  is_megabundle?: boolean;
};

type FlashbotsBlock = {
  block_number: number;
  miner: string;
  miner_reward: string; // in wei
  coinbase_transfers: string; // in wei
  gas_used: number;
  transactions: FlashbotsTransaction[];
};

type FlashbotsResponse = {
  latest_block_number: number;
  blocks: FlashbotsBlock[];
};

export async function getFlashbotsBlock(blockNumber: number): Promise<FlashbotsBlock | null> {
  const url = `https://blocks.flashbots.net/v1/blocks?block_number=${blockNumber}`;
  const response = await fetch(url);
  const data: FlashbotsResponse = await response.json();
  if (data.blocks.length === 0) {
    return null;
  }
  return data.blocks[0];
}
