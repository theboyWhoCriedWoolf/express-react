/**
 * Normalize a port into a number, string, or false.
 */
export default function normalizePort(val: string): number | string | null {
  const port: number = parseInt(val, 10);
  // named pipe
  if (Number.isNaN(port)) return val;
  // port number
  if (port >= 0) return port;

  return null;
}
