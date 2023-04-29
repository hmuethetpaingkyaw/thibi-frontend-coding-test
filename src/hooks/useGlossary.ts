import React from 'react';
import { getAll } from '../services/glossaryService';
import type { Glossary, GlossaryActionType, GlossaryStateType } from '@/types/Glossary';
import type { LoadingActionType } from '@/types/Loading';
import { filteredGlossaries, sortedGlossaries } from '@/utils/glossary';

const initialState: GlossaryStateType = {
  glossaries: [],
  loading: false,
};

function reducer(state: GlossaryStateType, action: GlossaryActionType | LoadingActionType) {
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

  const fetchGlossaries = async (filteredAlphabet?: string | undefined) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const result = await getAll();

    if (filteredAlphabet) {
      const data = filteredGlossaries(result, filteredAlphabet);
      dispatch({ type: 'SET_GLOSSARY', payload: { data: data } });
    } else {
      const data = sortedGlossaries(result);
      dispatch({ type: 'SET_GLOSSARY', payload: { data: data } });
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return {
    fetchGlossaries,
    state: state,
  };
};

export default useGlossary;
