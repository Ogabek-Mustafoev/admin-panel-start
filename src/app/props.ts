import { useAppSelector } from "@/hooks";

export const useAppProps = () => {
  const { data: userMe } = useAppSelector((state) => state.auth);

  return {
    isUserExist: !!userMe?.id,
  };
};
