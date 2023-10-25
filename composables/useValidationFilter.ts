import { DepenseValidation, DepenseValidations } from "~/types/depense";

const useDepenseValidationFilter = (depenses: Ref<DepenseValidations>) => {
  const search = ref("");
  const filterCardData = computed(() => {
    return Array.isArray(depenses.value)
      ? depenses.value.filter((depense: DepenseValidation) => {
        if (depense.titre !== undefined)
          return !search.value || depense.titre.toLowerCase().includes(search.value.toLowerCase());
      })
      : [];
  });
  return { filterCardData, search };
}

export { useDepenseValidationFilter }
