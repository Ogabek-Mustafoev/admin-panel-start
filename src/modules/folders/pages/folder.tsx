import { Button, Empty, Input, Select, Skeleton } from "antd";
import { useFolderProps } from "../props/folder";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { debounce } from "lodash";
import { DeleteModal } from "@/components";
import { FolderForm } from "../component/form";
import { FolderTree } from "../component/folder-tree";
import type { IFolder } from "@/schema/folder";

export const FolderPage = () => {
  const {
    isLoading,
    isFetching,
    query,
    folders,
    t,
    isOpenForm,
    statuses,
    filterBySearch,
    is_active,
    filterByStatus,
    fetchingProps,
    isOpen,
    folder,
    onCancel,
    handleClick,
    foldersCount,
  } = useFolderProps();

  return (
    <section className="relative -mt-6 -ml-6 flex gap-2 overflow-hidden">
      <div className="category-tree bg-themeBg before:bg-themeBg h-screen max-w-sm flex-1 p-3 pt-6">
        <Input
          allowClear
          value={query}
          className="max-w-sm min-w-40 flex-1"
          placeholder={t("search", { ns: "pages" })}
          prefix={<IoMdSearch className="h-5 w-5 text-gray-400" />}
          onChange={debounce(({ target: { value } }) => filterBySearch(value?.trim()), 500)}
        />
        <div className="mt-3 mb-2 flex items-center gap-2">
          <h2 className="text-xl font-medium">{t("allFolders", { ns: "pages" })}:</h2>
          <p className="bg-primary rounded-lg px-2 py-1 font-medium text-white">{foldersCount}</p>
        </div>
        {isLoading ? (
          <div className="flex flex-col gap-2.5">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : folders?.length ? (
          <FolderTree
            isFetching={isFetching}
            activeFolderId={folder?.id ?? folder?.parent_id}
            foldersData={folders ?? []}
            onAddChild={item => handleClick({ parent_id: item.id } as IFolder)}
            onEdit={item => handleClick(item)}
            onDelete={item => handleClick(item, true)}
          />
        ) : (
          <Empty className="mt-20" description={t("noFolders", { ns: "pages" })} />
        )}
      </div>
      <div className="top-0 z-10 flex flex-1 flex-col gap-3 pt-6">
        <div className="flex w-full items-center justify-between gap-2">
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
          <Button onClick={() => handleClick()} icon={<IoMdAdd />} type="primary">
            {t("addFolder")}
          </Button>
        </div>
        {isOpenForm ? (
          <FolderForm onAction={onCancel} folder={folder} isFetching={isFetching} fetchingProps={fetchingProps} />
        ) : (
          <div className="bg-themeBg blur-bg m-auto flex max-w-sm flex-col items-center justify-center gap-3 rounded-2xl p-3">
            <Empty description={t("selectFolderToEdit", { ns: "pages" })} />
          </div>
        )}
      </div>
      <DeleteModal isOpen={isOpen} onCancel={onCancel} fetchProps={fetchingProps} url={`/_a/folders/${folder?.id}`} />
    </section>
  );
};
