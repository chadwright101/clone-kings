export function generateOrderNumber() {
  const now = performance.now();
  const microTime = Math.floor(now * 1000)
    .toString()
    .slice(-4);
  const random = Math.random().toString(36).substr(2, 2).toUpperCase();
  return `OR-${microTime}${random}`;
}
