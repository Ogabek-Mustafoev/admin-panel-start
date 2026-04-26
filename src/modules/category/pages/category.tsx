import { Image, Input, Select, Skeleton, Table } from "antd";
import { useCategoryProps } from "../props/catagory";
import { IoMdSearch } from "react-icons/io";
import { debounce } from "lodash";
import type { ICategory } from "@/schema/category";
import type { TableColumnsType } from "antd";

export const CategoryPage = () => {
  const { isFetching, query, categories, t, statuses, filterBySearch, is_active, filterByStatus, locale } =
    useCategoryProps();

  const tableColumns: TableColumnsType<ICategory> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      key: "img",
      width: 120,
      dataIndex: "image_url",
      title: t("photo", { ns: "table" }),
      render: image_url =>
        image_url ? (
          <Image
            alt="logo"
            src={image_url}
            className="h-full! w-full! object-cover"
          />
        ) : (
          <Skeleton.Image  classNames={{content: "w-14! h-12! bg-black/30!"}} />
        ),
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (_, { name }) => <span>{name?.[locale]}</span>,
    },
    {
      title: t("status"),
      dataIndex: "is_active",
      key: "is_active",
      render: (_, { is_active }) => <span className="">{is_active ? t("active") : t("inactive")}</span>,
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="sticky top-0 z-10 flex items-center justify-between">
        <Input
          defaultValue={query}
          className="max-w-sm min-w-40 flex-1"
          placeholder={t("search", { ns: "pages" })}
          prefix={<IoMdSearch className="h-5 w-5 text-gray-400" />}
          onChange={debounce(({ target: { value } }) => filterBySearch(value?.trim()), 500)}
        />
        <Select
          allowClear
          value={is_active}
          options={statuses}
          showSearch={false}
          className="min-w-60"
          loading={false}
          onChange={filterByStatus}
          placeholder={t("status")}
        />
      </div>
      <div className="mt-4 flex items-center mb-6 gap-2">
        <h2 className="text-2xl font-medium">{t("allCategories", { ns: "pages" })}:</h2>
        <p className="bg-primary rounded-lg px-2 py-1 font-medium">{categories?.length ?? 0}</p>
      </div>
      <Table
        bordered
        rowKey="id"
        pagination={false}
        loading={isFetching}
        columns={tableColumns}
        dataSource={[...(categories || []), ...(categories || []), ...(categories || [])]}
        // onScroll={handleTableScroll}
        scroll={{ y: window.innerHeight - 225, x: 800 }}
      />
    </section>
  );
};
