import React from 'react';
import { getAll } from '../services/glossaryService';
import { Glossary, GlossaryStateType } from '@/types/Glossary';

const initialState: GlossaryStateType = {
  glossaries: [],
  loading: false,
};

function reducer(state: GlossaryStateType, action: any) {
  switch (action.type) {
    case 'SET_GLOSSARY':
      return { ...state, glossaries: action.payload.data };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      throw new Error();
  }
}

const useGlossary = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchGlossaries = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    let data = await getAll();
    data = await data.sort((a: any, b: any) => {
      let nameA = a.attributes?.en_term[0].toLowerCase();
      let nameB = b.attributes?.en_term[0].toLowerCase();

      return nameA?.localeCompare(nameB);
    });

    dispatch({ type: 'SET_GLOSSARY', payload: { data: data } });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const filteredGlossaries = async (letter: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    let data = await getAll();
    data = await data.filter((glossary: Glossary) => {
      let glossaryInitialLetter = glossary.attributes?.en_term[0].toLowerCase();
      let filteredLetter = letter!.toLowerCase();
      
      return glossaryInitialLetter === filteredLetter;
    });

    dispatch({ type: 'SET_GLOSSARY', payload: { data: data } });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return {
    fetchGlossaries,
    filteredGlossaries,
    state: state,
  };
};

export default useGlossary;
