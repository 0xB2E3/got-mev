export type TransferData = {
  fromAddress: string;
  toAddress: string;
  category: string;
  value: number;
  tokenId: string;
  asset: string;
};

export type TransactionData = {
  hash: string;
  fromAddress: string;
  toAddress: string;
  paymentGas: number;
  paymentTransfer: number;
  paymentTotal: number;
  transfers: TransferData[];
  flashbots: boolean;
  flashbotsBundleIndex?: number;
  summary: TransactionTransferSummary;
  gasUsed: number;
  effectiveGasPrice: number;
};

export type BlockData = {
  number: number;
  timestamp: number;
  miner: string;
  // minerPaymentAmount,
  transactions: TransactionData[];
  flashbots: boolean;
  numTransactions: number;
};

export type TransactionTransferSummary = {
  totals: Record<string, Record<string, number>>;
  assets: string[];
  addresses: string[];
};
