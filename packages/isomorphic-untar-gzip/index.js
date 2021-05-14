import untar from "isomorphic-untar";
import * as gzip from "gzip-js";
import isGzip from "./is-gzip";

function isArrayBuffer(value) {
  return value instanceof ArrayBuffer || value instanceof SharedArrayBuffer;
}

export default function isomorphicUntar(buffer) {
  if (isArrayBuffer(buffer)) {
    buffer = new Uint8Array(buffer);
  }

  if (!(buffer instanceof Uint8Array)) {
    throw new Error(
      "Buffer should be an ArrayBuffer, SharedArrayBuffer or Uint8Array"
    );
  }

  if (isGzip(buffer)) {
    buffer = new Uint8Array(gzip.unzip(buffer));
  }

  return untar(buffer.buffer);
}
