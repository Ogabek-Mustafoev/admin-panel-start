import { Input } from "antd";
import { useCategoryProps } from "../props/catagory";
import { IoMdSearch } from "react-icons/io";
import { debounce } from "lodash";

export const CategoryPage = () => {
  const { isLoading, search, t, filterBySearch } = useCategoryProps();

  return (
    <section className="relative overflow-hidden">
      <div className="sticky top-0 z-10">
        <Input
          defaultValue={search}
          className="max-w-sm min-w-40 flex-1"
          placeholder={t("search", { ns: "pages" })}
          prefix={<IoMdSearch className="h-5 w-5 text-gray-400" />}
          onChange={debounce(
            ({ target: { value } }) => filterBySearch(value?.trim()),
            500,
          )}
        />
      </div>
    </section>
  );
};
