import styled from "styled-components";
import { BlockData } from "../lib/types";
import AddressLink from "./AddressLink";
import BlockLink from "./BlockLink";
import DataDisplay from "./DataDisplay";
import Transactions from "./Transactions";

export const BlockContainer = styled.div`
  background: #eaeaea;
  display: flex;
`;

export const BlockInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  gap: 12px;
`;

type BlockProps = {
  block: BlockData;
};
export const Block = ({ block }: BlockProps) => {
  return (
    <BlockContainer>
      <BlockInfo>
        <DataDisplay label="Block #">
          <BlockLink number={block.number} />
        </DataDisplay>
        <DataDisplay label="Block Time (local)" value={new Date(block.timestamp * 1000).toLocaleString()} />
        <DataDisplay label="Mined by">
          <AddressLink address={block.miner} />
        </DataDisplay>
        <DataDisplay label="# Transactions" value={block.numTransactions.toString()} />
        <DataDisplay label="Flashbots?" value={block.flashbots ? "YES" : "NO"} />
      </BlockInfo>
      <Transactions transactions={block.transactions} miner={block.miner} />
    </BlockContainer>
  );
};
