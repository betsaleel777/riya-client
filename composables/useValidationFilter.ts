import type { AchatValidation, AchatValidations } from "~/types/achat";
import type { DepenseValidation, DepenseValidations } from "~/types/depense";
import type { DetteValidation, DetteValidations } from "~/types/dette";
import type { LoyerValidation, LoyerValidations } from "~/types/loyer";
import type { VisiteValidation, VisiteValidations } from "~/types/visite";

const useDepenseValidationFilter = (depenses: Ref<DepenseValidations>) => {
  const search = ref("");
  const filterCardData = computed(() => {
    return Array.isArray(depenses.value)
      ? depenses.value.filter((depense: DepenseValidation) => {
          if (depense.titre !== undefined)
            return (
              !search.value || depense.titre.toLowerCase().includes(search.value.toLowerCase())
            );
        })
      : [];
  });
  return { filterCardData, search };
};

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
};

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
};

const useLoyerValidationFilter = (loyers: Ref<LoyerValidations>) => {
  const search = ref("");
  const filterCardData = computed(() => {
    return Array.isArray(loyers.value)
      ? loyers.value.filter((loyer: LoyerValidation) => {
          if (loyer.code !== undefined && loyer.bien !== undefined)
            return (
              !search.value ||
              loyer.code.toLowerCase().includes(search.value.toLowerCase()) ||
              loyer.bien.toLowerCase().includes(search.value.toLowerCase())
            );
        })
      : [];
  });
  return { filterCardData, search };
};

const useAchatValidationFilter = (achats: Ref<AchatValidations>) => {
  const search = ref("");
  const filterCardData = computed(() => {
    return Array.isArray(achats.value)
      ? achats.value.filter((achat: AchatValidation) => {
          if (achat.code !== undefined && achat.bien !== undefined)
            return (
              !search.value ||
              achat.code.toLowerCase().includes(search.value.toLowerCase()) ||
              achat.bien.toLowerCase().includes(search.value.toLowerCase())
            );
        })
      : [];
  });
  return { filterCardData, search };
};

export {
  useDepenseValidationFilter,
  useVisiteValidationFilter,
  useDetteValidationFilter,
  useLoyerValidationFilter,
  useAchatValidationFilter,
};
