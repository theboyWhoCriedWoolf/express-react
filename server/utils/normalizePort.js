// @flow

export default function normalizePort(val: number): number {
  const port: number = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;

  return 3000;
}
