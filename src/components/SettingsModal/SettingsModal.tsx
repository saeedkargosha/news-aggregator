import { FC } from "react";
import { classNameFactory } from "@/utils/dom";
import Select, { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Modal } from "@/uikit";
import { useQuery } from "@tanstack/react-query";
import { ApiService } from "@/services/news-api";
import configs from "@/configs";
import { sourcesSelector, sourcesStore, useSourcesStore } from "@/store/sources.store";
import { ISource } from "@/services/types/source.type";
import { useCategoriesStore, categoriesSelector, categoriesStore } from "@/store/categories.store";
import { useAuthorsStore, authorsSelector, authorsStore } from "@/store/authors.store";
import { ICategory } from "@/services/types/category.type";
import { IAuthor } from "@/services/types/author.type";
import "./SettingsModal.scss";

const cn = classNameFactory("add-category-modal");

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const sources = useSourcesStore(sourcesSelector);
  const categories = useCategoriesStore(categoriesSelector);
  const authors = useAuthorsStore(authorsSelector);

  const { data } = useQuery({
    queryKey: ["sources"],
    queryFn: async () => {
      const data = await ApiService.getSources();
      return data.sources;
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Personalized news feed">
      <div className={cn("")}>
        <Select
          options={data}
          menuPosition="fixed"
          value={sources}
          placeholder="Sources"
          getOptionLabel={option => option.name}
          getOptionValue={option => option.id}
          isMulti
          onChange={(value: MultiValue<ISource>) => {
            sourcesStore.setSources(value as ISource[]);
          }}
        />
        <Select
          options={configs.categories}
          value={categories}
          placeholder="Categories"
          menuPosition="fixed"
          isMulti
          onChange={(value: MultiValue<ICategory>) => {
            categoriesStore.setCategories(value as ICategory[]);
          }}
        />
        <CreatableSelect
          value={authors}
          options={authors}
          placeholder="Authors"
          menuPosition="fixed"
          isMulti
          onChange={(value: MultiValue<IAuthor>) => {
            authorsStore.setAuthors(value as IAuthor[]);
          }}
        />
      </div>
    </Modal>
  );
};
