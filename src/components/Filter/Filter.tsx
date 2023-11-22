import { useMemo } from "react";
import { classNameFactory } from "@/utils/dom";
import { Searchbar } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, IconButton, Modal } from "@/uikit";
import { useDisclosure } from "@/hooks/useDisclosure";
import Select, { MultiValue } from "react-select";
import { ApiService } from "@/services/news-api";
import { ISource } from "@/services/types/source.type";
import { ICategory } from "@/services/types/category.type";
import configs from "@/configs";
import { useQuery } from "@tanstack/react-query";
import { useFilterSearchParams } from "@/hooks/useFilterSearchParams";
import { format, parse } from "date-fns";

import "./Filter.scss";

const cn = classNameFactory("filter");
const DATE_FOMRAT = "yyyy-MM-dd";

export const Filter = () => {
  const modal = useDisclosure();
  const [sources, setSources] = useFilterSearchParams(configs.filterParams.sources);
  const [categories, setCategories] = useFilterSearchParams(configs.filterParams.categories);
  const [date, setDate] = useFilterSearchParams(configs.filterParams.from);

  const { data } = useQuery({
    queryKey: ["sources"],
    queryFn: async () => {
      const data = await ApiService.getSources();
      return data.sources;
    },
  });

  const selectedSources: ISource[] | undefined = useMemo(() => {
    return sources?.split(",").map(sourceId => {
      const foundSource = data?.find(source => source.id === sourceId);
      if (foundSource) return foundSource;
      return { id: sourceId, name: sourceId };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const selectedCategories: ICategory[] | undefined = useMemo(() => {
    return categories?.split(",").map(categoryId => {
      const foundCategory = configs.categories?.find(category => category.value === categoryId);
      if (foundCategory) return foundCategory;
      return { value: categoryId, label: categoryId };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectSource = (sources: MultiValue<ISource>) => {
    const sourceIds = sources.map(source => source.id).join(",");
    setSources(sourceIds);
  };

  const handleSelectCategories = (categories: MultiValue<ICategory>) => {
    const catgoryIds = categories.map(category => category.value).join(",");
    setCategories(catgoryIds);
  };
  const handleSelectDate = (date: Date) => {
    const formattedDate = format(date, DATE_FOMRAT);
    setDate(formattedDate);
  };

  const parsedDate = date ? parse(date, DATE_FOMRAT, new Date()) : null;

  return (
    <div className={cn("")}>
      <Searchbar />
      <IconButton onClick={modal.onOpen} data-testid="btn-filter">
        <FontAwesomeIcon icon={faFilter} className={cn("filter-icon")} />
      </IconButton>
      <Modal title="Filter" isOpen={modal.isOpen} onClose={modal.onClose}>
        <div className="modal-filter">
          <Select
            options={data}
            menuPosition="fixed"
            placeholder="Sources"
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
            isMulti
            defaultValue={selectedSources}
            onChange={handleSelectSource}
            id="filter-sources"
          />
          <Select
            options={configs.categories}
            defaultValue={selectedCategories}
            placeholder="Categories"
            menuPosition="fixed"
            isMulti
            onChange={handleSelectCategories}
          />
          <DatePicker placeholderText="Date" selected={parsedDate} onChange={handleSelectDate} />
        </div>
      </Modal>
    </div>
  );
};
