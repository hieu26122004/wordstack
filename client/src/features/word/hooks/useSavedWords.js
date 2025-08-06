import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { saveWordSuccess, unsaveWordSuccess } from "../word.slice";
import { saveWord, unsaveWord } from "../word.api";
import { toast } from "sonner";

const useSavedWords = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  const handleSaveWord = useCallback(
    async (wordId, notes = null) => {
      setLoading(true);
      setError(null);
      dispatch(saveWordSuccess(wordId));
      try {
        const response = await saveWord(wordId, notes);
        toast.success(response.message);
      } catch (error) {
        toast.error(error);
        dispatch(unsaveWordSuccess(wordId));
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const handleUnsaveWord = useCallback(
    async (wordId) => {
      setLoading(true);
      setError(null);
      dispatch(unsaveWordSuccess(wordId));
      try {
        const response = await unsaveWord(wordId);
        toast.success(response.message);
      } catch (error) {
        toast.error(error);
        dispatch(saveWordSuccess(wordId));
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const toggleSaveWord = useCallback(
    async (word, notes = null) => {
      if (word.isSaved) {
        await handleUnsaveWord(word.id);
      } else {
        await handleSaveWord(word.id, notes);
      }
    },
    [handleSaveWord, handleUnsaveWord]
  );

  return {
    loading,
    error,
    actions: {
      saveWord,
      unsaveWord,
      toggleSaveWord,
    },
  };
};

export default useSavedWords;
