export type UntarredFiles = Array<{
  name: string;
  buffer: ArrayBuffer;

  // metadata
  mode?: string;
  uid?: number;
  gid?: number;
  size?: number;
  mtime?: number;
  type?: string;
  linkname?: string;
  uname?: string;
  gname?: string;
  devmajor?: number;
  devminor?: number;
}>;

declare function _default(buffer: ArrayBufferLike): Promise<UntarredFiles>;

export default _default;
