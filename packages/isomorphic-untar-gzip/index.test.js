const fs = require("fs-extra");
const path = require("path");

const untar = require("./lib/node").default;

const FIXTURES_DIR = path.join(__dirname, "fixtures");

describe("isomorphic-untar", () => {
  it("Should be able to extract a tar file", async () => {
    let tarFile = await fs.readFile(
      path.join(FIXTURES_DIR, "react-17.0.2.tar")
    );
    let files = await untar(tarFile.buffer);
    expect(files).toMatchSnapshot();
  });

  it("Should be able to extract a tar.gz file", async () => {
    let tarFile = await fs.readFile(
      path.join(FIXTURES_DIR, "react-17.0.2.tgz")
    );
    let files = await untar(tarFile.buffer);
    expect(files).toMatchSnapshot();
  });

  it("Should also work with a UInt8Array", async () => {
    let tarFile = await fs.readFile(
      path.join(FIXTURES_DIR, "react-17.0.2.tgz")
    );
    let files = await untar(new Uint8Array(tarFile.buffer));
    expect(files).toMatchSnapshot();
  });
});
