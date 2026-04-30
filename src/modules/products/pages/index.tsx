import { Image, Input, Select, Skeleton, Table, Tag } from "antd";
import { useProductsProps } from "../props";
import { IoMdSearch } from "react-icons/io";
import { debounce } from "lodash";
import type { ICategory } from "@/schema/category";
import type { TableColumnsType } from "antd";
import dayjs from "dayjs";
import { useMemo } from "react";

export const ProductsPage = () => {
  const { isFetching, categories, t, query, statuses, filterBySearch, is_active, filterByStatus, locale, navigate } =
    useProductsProps();

  const tableColumns: TableColumnsType<ICategory> = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80,
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
              classNames={{ root: "h-12! overflow-hidden! rounded-lg!", image: "h-full! w-auto!" }}
            />
          ) : (
            <Skeleton.Image classNames={{ content: "w-12! h-10! bg-black/30!" }} />
          ),
      },
      {
        key: "mobile_image_url",
        width: 120,
        dataIndex: "mobile_image_url",
        title: t("mobilePhoto"),
        render: image_url =>
          image_url ? (
            <Image
              alt="logo"
              src={image_url}
              classNames={{ root: "h-12! overflow-hidden! rounded-lg!", image: "h-full! w-auto!" }}
            />
          ) : (
            <Skeleton.Image classNames={{ content: "w-12! h-10! bg-black/30!" }} />
          ),
      },
      {
        title: t("name", { ns: "table" }),
        dataIndex: "name",
        key: "name",
        render: (_, { name }) => <span>{name?.[locale]}</span>,
      },
      {
        title: t("status"),
        dataIndex: "is_active",
        width: 120,
        key: "is_active",
        render: (_, { is_active }) => (
          <Tag className="text-base! font-medium" color={is_active ? "success" : "error"}>
            {is_active ? t("active") : t("inactive")}
          </Tag>
        ),
      },
      {
        key: "created_at",
        dataIndex: "created_at",
        title: t("created_at", { ns: "table" }),
        render: date => dayjs(date).format("DD-MMM, YYYY | HH:mm"),
      },
      {
        key: "updated_at",
        dataIndex: "updated_at",
        title: t("updated_at", { ns: "table" }),
        render: date => dayjs(date).format("DD-MMM, YYYY | HH:mm"),
      },
    ],
    [locale],
  );

  return (
    <section className="relative overflow-hidden">
      <div className="sticky top-0 z-10 flex items-center gap-2">
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
          className="w-48"
          loading={false}
          onChange={filterByStatus}
          placeholder={t("status")}
        />
      </div>
      <div className="mt-4 mb-6 flex items-center gap-2">
        <h2 className="text-2xl font-medium">{t("allProducts", { ns: "pages" })}:</h2>
        <p className="bg-primary rounded-lg px-2 py-1 font-medium text-white">{categories?.length ?? 0}</p>
      </div>
      <Table<ICategory>
        bordered
        rowKey="id"
        size="small"
        onRow={product => ({
          onClick: () => navigate(`/products/${product.id}`),
          style: { cursor: "pointer" },
        })}
        pagination={false}
        loading={isFetching}
        columns={tableColumns}
        dataSource={categories}
        scroll={{ y: window.innerHeight - 225, x: 842 }}
      />
    </section>
  );
};
