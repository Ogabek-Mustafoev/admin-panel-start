import { Button, Input, Select } from "antd";
import { useCategoryProps } from "../props/catagory";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { debounce } from "lodash";
import { DeleteModal } from "@/components";
import { CatalogForm } from "../forms";
import { CategoryTree } from "../component/category-tree";

export const CategoryPage = () => {
  const {
    isLoading,
    query,
    categories,
    t,
    isOpenForm,
    statuses,
    filterBySearch,
    is_active,
    filterByStatus,
    fetchingProps,
    isOpen,
    category,
    onCancel,
    handleClick,
  } = useCategoryProps();

  return (
    <section className="relative -mt-6 -ml-6 flex gap-2 overflow-hidden">
      <div className="category-tree bg-theme h-screen max-w-sm flex-1 p-3 pt-6">
        <Input
          defaultValue={query}
          className="max-w-sm min-w-40 flex-1"
          placeholder={t("search", { ns: "pages" })}
          prefix={<IoMdSearch className="h-5 w-5 text-gray-400" />}
          onChange={debounce(({ target: { value } }) => filterBySearch(value?.trim()), 500)}
        />
        <div className="mt-3 mb-2 flex items-center gap-2">
          <h2 className="text-xl font-medium">{t("allCategories", { ns: "pages" })}:</h2>
          <p className="bg-primary rounded-lg px-2 py-1 font-medium text-white">{categories?.length ?? 0}</p>
        </div>
        <CategoryTree />
      </div>
      <div className="top-0 z-10 flex items-start gap-3 pt-6">
        <Select
          allowClear
          value={is_active}
          options={statuses}
          showSearch={false}
          className="w-48"
          loading={false}
          onChange={filterByStatus}
          placeholder={t("status")}
        />
        <Button onClick={() => handleClick()} icon={<IoMdAdd />} type="primary" className="ml-auto">
          {t("addCategory")}
        </Button>
      </div>

      <CatalogForm
        open={isOpenForm}
        onAction={onCancel}
        category={category}
        isFetching={isLoading}
        fetchingProps={fetchingProps}
      />
      <DeleteModal
        isOpen={isOpen}
        onCancel={onCancel}
        fetchProps={fetchingProps}
        url={`/_a/categories/${category?.id}`}
      />
    </section>
  );
};
