export class APILogger {
  info(req: any, res: any, next: any): void {
    console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url}`);
    next();
  }

  error(message: string): void {
    console.error(`[${new Date().toISOString()}] ${message}`);
  }
}
