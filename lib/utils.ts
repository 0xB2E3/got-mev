export function shortAddress(address: string | null): string {
  if (!address) return "-";
  return `0x${address.slice(2, 6).toUpperCase()}..${address.slice(-4).toUpperCase()}`;
  // return `0x${address.slice(2, 8).toUpperCase()}`; // ..${address.slice(-4).toUpperCase()}`;
}

export function formatNumber(num: number, fractionDigits = 3): string {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
