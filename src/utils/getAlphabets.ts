export const getAlphabets = (): string[] => {
  const alphabets: string[] = [];
  const bitsNumberA = 65;
  const bitsNumberZ = 90;

  for (let i = bitsNumberA; i <= bitsNumberZ; i++) {
    const alphabet = String.fromCharCode(i);
    alphabets.push(alphabet);
  }
  return alphabets;
};
