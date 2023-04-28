export type Glossary = {
  id: number;
  attributes: {
    en_term: string;
    mm_term: string;
    description: string;
    reference: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    subterm: string;
  };
};

export type GlossaryStateType = {
  glossaries: Glossary[];
  loading: boolean;
};

export type useGlossaryType = {
  state: GlossaryStateType;
  filteredGlossaries?: (letter: string) => void;
  fetchGlossaries?: () => void;
};