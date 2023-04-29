import { Glossary } from "@/types/Glossary";

export const filteredGlossaries = (data: Glossary[], filteredAlphabet: string) => {
  return data?.filter((glossary: Glossary) => {
    let glossaryInitialalphabet = glossary.attributes?.en_term[0].toLowerCase();
    filteredAlphabet = filteredAlphabet!.toLowerCase();

    return glossaryInitialalphabet === filteredAlphabet;
  });
};

export const sortedGlossaries = (data: Glossary[]) => {
  return data?.sort((prevGlossary: Glossary, nextGlossary: Glossary) => {
    let prevGlossaryInitialAlphabet = prevGlossary.attributes?.en_term[0].toLowerCase();
    let nextGlossaryInitialAlphabet = nextGlossary.attributes?.en_term[0].toLowerCase();
    return prevGlossaryInitialAlphabet?.localeCompare(nextGlossaryInitialAlphabet);
  });
};

