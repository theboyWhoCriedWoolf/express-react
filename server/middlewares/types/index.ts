/**
 * exports middleware options
 */
export interface IMiddlewareOptions {
  publicPath?: string;
  outputPath?: string;
}

/**
 * Express Types
 */

type CspOverrideTypes = string | ConcatArray<string> | string | string[] | any[];

export interface ICsp {
  directives: { [key: string]: CspOverrideTypes };
}

export interface ICspOverrides {
  [key: string]: CspOverrideTypes;
}
