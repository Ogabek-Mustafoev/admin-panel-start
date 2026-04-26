import { useFetchData } from "@/hooks";
import { type TCategoryData } from "@/schema/category";
import { useTranslation } from "react-i18next";

export const useCategoryProps = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchData<TCategoryData>({
    url: `/_a/categories`,
  });


  const filterBySearch = (value: string) => {
    
  };

  console.log(data);

  return {
    t,
    data: data?.data || [],
    isLoading,
    search: '',
    filterBySearch
  };
};
