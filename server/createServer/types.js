// @flow
import type { createServer } from 'http';

export type ConnectOptions = {
  +key?: ?string,
  +cert?: ?string,
  +cs?: ?string,
  rejectUnauthorized?: boolean,
  requestCert?: boolean,
};

export type Certificates = {|
  serverKey?: string,
  serverCert?: string,
  clientCert?: string,
|};

export type NodeServer = {
  +server: createServer,
  http?: boolean,
  https?: boolean,
};
