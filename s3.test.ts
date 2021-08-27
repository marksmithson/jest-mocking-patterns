import { S3 } from 'aws-sdk';
import { mocked } from 'ts-jest/utils';
import { readFromS3 } from "./s3";

const S3Mock = mocked(S3);
const mockGetObjectPromise = jest.fn();
const mockGetObject = jest.fn(() => ({ promise: mockGetObjectPromise }));
S3Mock.mockImplementation(() => ({ getObject: mockGetObject } as any));

jest.mock('aws-sdk');

describe("readFromS3 tests", () => {
  beforeEach(()=>{
    jest.clearAllMocks();
    mockGetObjectPromise.mockReset();
  });

 test("get object", async () => {
   // given
   const buffer = Buffer.from(JSON.stringify({ ok: true }));
   mockGetObjectPromise.mockResolvedValue({Body:buffer});

   // when
   const result = await readFromS3("me.smithson.test-bucket", "file.test.json");

   // then
   expect(result.ok).toBe(true);
   expect(mockGetObject).toBeCalledWith({Bucket:"me.smithson.test-bucket", Key: "file.test.json"});
 });

 test("object does not exist", async () => {
   // given
   mockGetObjectPromise.mockRejectedValue({code:"NoSuchKey"});
  
   // when
  const result = await readFromS3("me.smithson.test-bucket", "file.testdsa.json");

  // then
  expect(result).toBeUndefined();
 });
});