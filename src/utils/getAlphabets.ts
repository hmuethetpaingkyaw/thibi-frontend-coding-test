export const getAlphabets = (): string[] => {
  const alphabets: string[] = [];
  const charCodeForA = 65;
  const charCodeForZ = 90;

  for (let alphabetCharCode = charCodeForA; alphabetCharCode <= charCodeForZ; alphabetCharCode++) {
    const alphabet = String.fromCharCode(alphabetCharCode);
    alphabets.push(alphabet);
  }
  return alphabets;
};
