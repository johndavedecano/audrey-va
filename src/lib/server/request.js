// @ts-nocheck
export const isFetchRequest = (headers) => {
  return (
    headers.get("content-type") === "application/json" ||
    headers.get("accept") === "application/json" ||
    headers.has("x-requested-with")
  );
};
