import styled from "styled-components";

export const DataLabel = styled.div`
  text-transform: uppercase;
  font-size: 14px;
  line-height: 16px;
  color: #888;
`;

export const DataValue = styled.span`
  fort-weight: bold;
  font-size: 16px;
`;

export const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

type DataDisplayProps = {
  label: string;
  value?: string;
  children?: JSX.Element;
};
export const DataDisplay = ({ label, value = undefined, children = undefined }: DataDisplayProps) => {
  if (value === undefined && children === undefined) {
    throw new Error("undefined data");
  }
  return (
    <DataWrapper>
      <DataLabel>{label}</DataLabel>
      <DataValue>{children ?? value}</DataValue>
    </DataWrapper>
  );
};

export default DataDisplay;
