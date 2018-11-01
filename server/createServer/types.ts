import * as http from 'http';
import * as https from 'https';

export interface ICertOptions {
  serverKey?: string;
  serverCert?: string;
  clientCert?: string;
}

export interface ICreateServer {
  https: boolean;
  server: http.Server | https.Server;
}
