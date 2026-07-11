import { useQuery } from "@tanstack/react-query";

export const useGetUserData = () => {
  const queryFn = () => fetch("/api/auth/check-me").then((res) => res.json());
  const queryKey = ["user"];

  return useQuery({ queryFn, queryKey });
};
