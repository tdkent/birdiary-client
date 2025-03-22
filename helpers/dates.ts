// Returns date in UTC formt: "YYYY-MM-DDT00:00:00.000Z"
export const createUtcDate = (d: Date) => {
  const date = new Date(d);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
};
