import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWordsFailed,
  getWordsPending,
  getWordsSuccess,
} from "../word.slice";
import { fetchWords } from "../word.api";

const useWords = () => {
  const { loading, error, words } = useSelector((state) => state.word);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [pagination, setPagination] = React.useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    limit: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [params, setParams] = React.useState({
    query: "",
    searchType: "prefix",
    partOfSpeech: "",
    savedStatus: "saved",
    page: 1,
    limit: 10,
  });

  const getWords = useCallback(async () => {
    dispatch(getWordsPending());
    try {
      const response = await fetchWords(params);

      if (response.success) {
        dispatch(getWordsSuccess(response.data.results));
        setPagination({
          totalItems: response.meta.totalItems,
          totalPages: response.meta.totalPages,
          currentPage: response.meta.currentPage,
          hasNextPage: response.meta.hasNextPage,
          hasPreviousPage: response.meta.hasPrevPage,
        });
      }
    } catch (error) {
      dispatch(getWordsFailed(error));
    }
  }, [dispatch, params]);

  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
      page: newParams.page || 1,
    }));
  }, []);

  const handleSearchTypeChange = useCallback(
    (searchType) => {
      updateParams({ searchType, page: 1 });
    },
    [updateParams]
  );

  const handlePOSChange = useCallback(
    (partOfSpeech) => {
      updateParams({ partOfSpeech, page: 1 });
    },
    [updateParams]
  );

  const handleSavedStatusChange = useCallback(
    (savedStatus) => {
      updateParams({ savedStatus, page: 1 });
    },
    [updateParams]
  );

  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      updateParams({ page: pagination.currentPage + 1 });
    }
  }, [pagination.currentPage, pagination.hasNextPage, updateParams]);

  const prevPage = useCallback(() => {
    if (pagination.hasPreviousPage) {
      updateParams({ page: pagination.currentPage - 1 });
    }
  }, [pagination.currentPage, pagination.hasPreviousPage, updateParams]);

  const gotoPage = useCallback(
    (page) => {
      if (page >= 1 && page <= pagination.totalPages) {
        updateParams({ page });
      }
    },
    [pagination.totalPages, updateParams]
  );

  React.useEffect(() => {
    getWords();
  }, [getWords]);

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      updateParams({ query: searchTerm, page: 1 });
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [searchTerm, updateParams]);

  return {
    words,
    loading,
    error,
    pagination,
    params: {
      ...params,
      search: searchTerm,
    },
    actions: {
      handleSearch: setSearchTerm,
      handleSavedStatusChange,
      handleSearchTypeChange,
      handlePOSChange,
      nextPage,
      prevPage,
      gotoPage,
      refetch: getWords,
    },
  };
};

export default useWords;
