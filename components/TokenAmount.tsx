import styled from "styled-components";
import { formatNumber } from "../lib/utils";

const TokenAmountContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const TokenAmountLabel = styled.div`
  width: 140px;
  text-align: right;
`;

const TokenAmountAssetLabel = styled.div`
  width: 80px;
`;

type TokenAmountProps = { name: string; amount: number };
const TokenAmount = ({ name, amount }: TokenAmountProps) => {
  return (
    <TokenAmountContainer>
      <TokenAmountLabel>{formatNumber(amount ?? 0)}</TokenAmountLabel>
      <TokenAmountAssetLabel>{name}</TokenAmountAssetLabel>
    </TokenAmountContainer>
  );
};

export default TokenAmount;
