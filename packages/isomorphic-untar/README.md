# Isomorphic untar

untar a tarball in the browser or node.

## Installation

Install this library using `yarn add isomorphic-untar`

## Usage

This library currently only exports a single function which takes in an ArrayBuffer or SharedArrayBuffer and outputs an array of files.

```Typescript
type UntarredFiles = Array<{
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
```
