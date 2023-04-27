import { promises as fs } from 'fs';
import path from 'path';

const JSON_FILEPATH = path.join(__dirname, 'json');

export const readFakeLayoutData = async () => {
  const filePath = path.join(JSON_FILEPATH, 'layout.json');
  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString());
};
