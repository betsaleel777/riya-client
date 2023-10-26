import { DepenseValidation, DepenseValidations } from "~/types/depense";
import { VisiteValidation, VisiteValidations } from "~/types/visite";

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

const useVisiteValidationFilter = (visites: Ref<VisiteValidations>) => {
  const search = ref("");
  const filterCardData = computed(() => {
    return Array.isArray(visites.value)
      ? visites.value.filter((visite: VisiteValidation) => {
        if (visite.code !== undefined)
          return !search.value || visite.code.toLowerCase().includes(search.value.toLowerCase());
      })
      : [];
  });
  return { filterCardData, search };
}

export { useDepenseValidationFilter, useVisiteValidationFilter }
