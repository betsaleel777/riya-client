import { DepenseValidation, DepenseValidations } from "~/types/depense";
import { DetteValidation, DetteValidations } from "~/types/dette";
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

const useDetteValidationFilter = (dettes: Ref<DetteValidations>) => {
  const search = ref("");
  const filterCardData = computed(() => {
    return Array.isArray(dettes.value)
      ? dettes.value.filter((dette: DetteValidation) => {
        if (dette.code !== undefined)
          return !search.value || dette.code.toLowerCase().includes(search.value.toLowerCase());
      })
      : [];
  });
  return { filterCardData, search };
}

export { useDepenseValidationFilter, useVisiteValidationFilter, useDetteValidationFilter }