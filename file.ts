
import fs from "fs";

export const readJsonFile = (fileName:string) => {
  try {
    const data = fs.readFileSync(fileName);
    return JSON.parse(data.toString());
  }
  catch (error) {
    // handle file not found
    if (error.code === "ENOENT") {
      return undefined;
    }
    // handle invalid json
    if (error instanceof SyntaxError) {
      return undefined;
    }
    throw error;
  }
}