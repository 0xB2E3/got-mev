import styled from "styled-components";
import { shortAddress } from "../lib/utils";

const AddressLabel = styled.a<{ color: string }>`
  background: ${(p) => p.color};
`;

type AddressLinkProps = {
  address?: string;
  short?: boolean;
};
const AddressLink = ({ address, short = true }: AddressLinkProps) => {
  if (!address) {
    return <>-</>;
  }
  const url = `https://etherscan.io/address/${address}`;
  const color = `#${address.slice(2, 8)}33`;
  return (
    <AddressLabel color={color} href={url} target="_blank" rel="noreferrer">
      {short ? shortAddress(address) : address}
    </AddressLabel>
  );
};

export default AddressLink;
