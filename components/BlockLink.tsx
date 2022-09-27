const BlockLink = ({ number }: { number: number }) => {
  const url = `https://etherscan.io/block/${number}`;
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {number}
    </a>
  );
};

export default BlockLink;
