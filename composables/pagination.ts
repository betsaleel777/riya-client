import { DataPaginate, SearchData } from "~/types/global";
type PaginateFunction = (id?: number) => Promise<void>;
type SearchFunction = (data: SearchData) => Promise<void>;

export const useServerPagination = (
  liste: Ref<DataPaginate | undefined>,
  getPaginate: PaginateFunction,
  getSearch: SearchFunction
) => {
  const toSearch = ref("");
  const loadedSearch = ref(false);
  const searchExists = computed(() => toSearch.value !== "" && toSearch.value.trim().length !== 0);
  const setPage = async (val: number) => {
    searchExists.value
      ? await getSearch({ search: toSearch.value, page: val })
      : await getPaginate(val);
  };
  const total = computed(() => liste.value?.meta?.total);
  const pageSize = computed(() => liste.value?.meta.per_page);
  const currentPage = computed(() => liste.value?.meta.current_page);
  const search = async () => {
    if (searchExists) {
      await getSearch({ search: toSearch.value, page: 1 });
      loadedSearch.value = true;
    }
  };
  const setRefresh = async () => {
    toSearch.value = "";
    await getPaginate();
    loadedSearch.value = false;
  };
  return {
    setPage,
    setRefresh,
    search,
    total,
    pageSize,
    currentPage,
    toSearch,
    searchExists,
    loadedSearch,
  };
};
