import styled from "styled-components";
import { TransactionData } from "../lib/types";
import { formatNumber } from "../lib/utils";
import AddressLink from "./AddressLink";
import { DataDisplay, DataLabel, DataWrapper } from "./DataDisplay";
import TransactionLink from "./TransactionLink";

export const TransactionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  flex-grow: 1;
`;

const TransactionContainer = styled.div`
  background: #f4f4f4;
  /* width: 100%; */
  display: flex;
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
`;

const TransactionCount = styled.div`
  text-align: left;
  color: #888;
`;

const BalancesAndTransfers = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: flex-start;
  gap: 12px;
`;

const AddressBalances = styled.div`
  background: #fff;
  display: flex;
  padding: 12px;
  gap: 50px;
  justify-content: space-between;
`;

const AmountWrapper = styled(DataWrapper)`
  width: 150px;
`;

const SectionLabel = styled(DataLabel)`
  font-size: 18px;
`;

const Transaction = ({ transaction, miner }: { transaction: TransactionData; miner: string }) => {
  return (
    <TransactionContainer>
      <TransactionInfo>
        <DataDisplay label={`Transaction`}>
          <TransactionLink hash={transaction.hash} />
        </DataDisplay>
        <DataDisplay label="Tx From">
          <AddressLink address={transaction.fromAddress} />
        </DataDisplay>
        <DataDisplay label="Tx To">
          <AddressLink address={transaction.toAddress} />
        </DataDisplay>
        <DataDisplay label="Gas Used" value={transaction.gasUsed.toLocaleString()} />
        <DataDisplay label="Effective Gas Price" value={`~${transaction.effectiveGasPrice} GWEI`} />
        <DataDisplay label="Payment (gas)" value={`${formatNumber(transaction.paymentGas)} ETH`} />
        <DataDisplay label="Payment (transfer)" value={`${formatNumber(transaction.paymentTransfer)} ETH`} />
        <DataDisplay label="Payment (total)" value={`${formatNumber(transaction.paymentTotal)} ETH`} />
        <DataDisplay label="Flashbots bundle" value={transaction.flashbotsBundleIndex?.toString() ?? "-"} />
      </TransactionInfo>
      <BalancesAndTransfers>
        <SectionLabel>Balance Changes</SectionLabel>

        {transaction.summary.addresses.map((addr, i) => (
          <AddressBalances key={i}>
            <DataDisplay
              label={`Addr #${i + 1} ${
                addr == transaction.fromAddress
                  ? "(Tx.from)"
                  : addr == transaction.toAddress
                  ? "(Tx.to)"
                  : addr == miner.toLowerCase()
                  ? "(Miner)"
                  : ""
              }`}
            >
              <AmountWrapper>
                <AddressLink address={addr} />
              </AmountWrapper>
            </DataDisplay>

            {transaction.summary.assets.map((asset, j) =>
              transaction.summary.totals[addr][asset] ? (
                <DataDisplay label={asset} key={`${i}_${j}`}>
                  <AmountWrapper>{formatNumber(transaction.summary.totals[addr][asset] ?? 0)}</AmountWrapper>
                </DataDisplay>
              ) : (
                <DataDisplay label="" key={`${i}_${j}`}>
                  <AmountWrapper />
                </DataDisplay>
              )
            )}
          </AddressBalances>
        ))}
        <SectionLabel style={{ marginTop: "12px" }}>Transfers</SectionLabel>
        {transaction.transfers.map((transfer, k) => (
          <AddressBalances key={k}>
            <DataDisplay label="From">
              <AddressLink address={transfer.fromAddress} />
            </DataDisplay>
            <DataDisplay label="To">
              <AddressLink address={transfer.toAddress} />
            </DataDisplay>
            <DataDisplay label="Amount">
              <AmountWrapper>{formatNumber(transfer.value)}</AmountWrapper>
            </DataDisplay>
            <DataDisplay label="Asset">
              <AmountWrapper>{transfer.asset}</AmountWrapper>
            </DataDisplay>
          </AddressBalances>
        ))}
      </BalancesAndTransfers>
    </TransactionContainer>
  );
};

const Transactions = ({ transactions, miner }: { transactions: TransactionData[]; miner: string }) => {
  return (
    <TransactionsWrapper>
      {/* <TransactionCount>...12 transactions...</TransactionCount> */}
      {transactions.map((transaction) => (
        <Transaction transaction={transaction} key={transaction.hash} miner={miner} />
      ))}
      {/* <TransactionCount>...301 transactions...</TransactionCount> */}
    </TransactionsWrapper>
  );
};

export default Transactions;
