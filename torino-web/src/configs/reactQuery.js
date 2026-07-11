const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
    staleTime: 60 * 1000, //1 min
  },
};

export default defaultOptions;
