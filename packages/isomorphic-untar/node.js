const tarStream = require("tar-stream");

module.exports = function untar(buffer) {
  buffer = Buffer.from(buffer);
  const extract = tarStream.extract();
  const files = [];
  extract.on("entry", (header, stream, cb) => {
    const chunk = [];

    stream.on("data", (data) => chunk.push(data));
    stream.on("end", () => {
      const buffer = Buffer.concat(chunk).buffer;
      const file = {
        name: header.name,
        buffer,

        // metadata
        mode: header.mode,
        uid: header.uid,
        gid: header.gid,
        size: header.size,
        mtime: header.mtime ? header.mtime.getTime() : undefined,
        type: header.type,
        uname: header.uname,
        gname: header.gname,
        devmajor: header.devmajor,
        devminor: header.devminor,
      };

      if (header.type === "symlink" || header.type === "link") {
        file.linkname = header.linkname;
      }

      files.push(file);
      cb();
    });
  });

  const promise = new Promise((resolve, reject) => {
    extract.on("finish", () => resolve(files));
    extract.on("error", reject);
  });

  extract.then = promise.then.bind(promise);
  extract.catch = promise.catch.bind(promise);

  extract.end(buffer);

  return promise;
};
