import { shortAddress } from "../lib/utils";

type Props = {
  hash: string;
  children?: JSX.Element;
  short?: boolean;
};
const TransactionLink = ({ hash, children = undefined, short = true }: Props) => {
  const url = `https://etherscan.io/tx/${hash}`;

  return (
    <a href={url} target="_blank" rel="noreferrer">
      {children ?? short ? shortAddress(hash) : hash}
    </a>
  );
};

export default TransactionLink;
