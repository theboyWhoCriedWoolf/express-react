import * as winston from 'winston';

/**
 * Setup logger
 * @return {object} logger
 */
export default ((): winston.Logger => {
  const { createLogger, transports, format } = winston;
  const { combine, colorize, simple, splat } = format;

  // $FlowInvalidType
  winston.addColors({
    error: 'bold red',
    warn: 'bold yellow',
    info: 'cyan',
    verbose: 'blue',
    debug: 'green',
    silly: 'magenta',
  });

  const logger: winston.Logger = createLogger({
    format: combine(colorize(), splat(), simple()),
    transports: [new transports.Console()],
  });

  return logger;
})();
