import { readJsonFile } from "./file";
import { mocked } from "ts-jest/utils";
import { readFileSync } from "fs";

jest.mock("fs");

const readFileSyncMock = mocked(readFileSync);

describe("Read JSON File", () => {
  beforeEach( () => {
    jest.resetAllMocks
    readFileSyncMock.mockReset();
  });

  test("loads file and returns parsed JSON", () => {
    // given
    const buffer = Buffer.from(JSON.stringify({ ok: true }));
    readFileSyncMock.mockReturnValue(buffer);

    // when
    const result = readJsonFile("file.test")

    // then 
    expect(result.ok).toBe(true);
    expect(readFileSyncMock).toBeCalledWith("file.test");
  });

  test("when file does not exists returns undefined", () => {
    // given
    readFileSyncMock.mockImplementation(() => { throw { code:"ENOENT" } });

    // when
    const result = readJsonFile("file.test")

    // then 
    expect(result).toBeUndefined();
  });

  test("when file not JSON returns undefined", () => {
    // given
    const buffer = Buffer.from("notjson");
    readFileSyncMock.mockReturnValue(buffer);

    // when
    const result = readJsonFile("file.test")

    // then 
    expect(result).toBeUndefined();
  });
});