// @flow
import ip from 'ip';
import chalk from 'chalk';

export default function appStarted(port: number, host: string, https?: boolean) {
  const divider = chalk.gray('\n-----------------------------------');
  const protocol = https ? 'https' : 'http';

  return `${chalk.green('✓')} Server started 
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`${protocol}://${host}:${port}`)}
LAN: ${chalk.magenta(`${protocol}://${ip.address()}:${port}`)}${divider}
   ${chalk.blueBright(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `;
}
