import AWS from 'aws-sdk';

export const readFromS3 = async (bucket: string, key:string) => {
  const s3 = new AWS.S3();

  try {
    const object = await s3.getObject({ Bucket: bucket, Key: key}).promise();

    return JSON.parse(object.Body?.toString()!);
  }
  catch (error){
    if (error.code == "NoSuchKey"){
      return undefined;
    }
    throw error;
  }
};