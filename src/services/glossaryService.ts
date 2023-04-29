import { getData } from "./apiService";

export async function getAll() {
  try {
    let response = await getData(`glossaries`);
    return response.data;
  } catch (e) {
    throw e;
  }
}
