import untar from "isomorphic-untar";
import * as gzip from "gzip-js";

function isArrayBuffer(value) {
  return value instanceof ArrayBuffer || value instanceof SharedArrayBuffer;
}

function isTar(buffer) {
  if (!buffer || buffer.length < 262) {
    return false;
  }

  return (
    buffer[257] === 0x75 &&
    buffer[258] === 0x73 &&
    buffer[259] === 0x74 &&
    buffer[260] === 0x61 &&
    buffer[261] === 0x72
  );
}

function isGzip(buffer) {
  if (!buffer || buffer.length < 3) {
    return false;
  }

  return buffer[0] === 0x1f && buffer[1] === 0x8b && buffer[2] === 0x08;
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

  if (!isTar(buffer)) {
    throw new Error("Invalid tar file");
  }

  return untar(buffer.buffer);
}
