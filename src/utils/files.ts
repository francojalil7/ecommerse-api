import fs from "fs/promises";
import { Cart, Product } from "../interface/interfaces";

export const readData = async (filePath: string) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === "ENOENT") {
      await writeData(filePath, []);
      return [];
    }
    throw error;
  }
};

export const writeData = async (filePath: string, data: Product[] | Cart[]) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    await fs.writeFile(filePath, JSON.stringify([]));
  }
};
