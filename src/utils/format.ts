// utils/format.ts
export const formatIDR = (value: any) => {
  const num = Number(value);
  if (isNaN(num)) return "Rp0";
  return `Rp${num.toLocaleString("id-ID")}`;
};
