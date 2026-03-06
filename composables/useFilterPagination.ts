import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Achat, Achats } from "~/types/achat";
import type { Appartement, Appartements } from "~/types/appartement";
import type { Contrat, Contrats, DetailsOwnerContract } from "~/types/contrat";
import type { Types, Type } from "~/types/global";
import type { Paiement, Paiements } from "~/types/paiements";
import type { Client, Clients } from "~/types/personne";
import type { Proprietaires, Proprietaire } from "~/types/proprietaire";
import type { Terrain, Terrains } from "~/types/terrain";
import type { Utilisateur, Utilisateurs } from "~/types/utilisateur";
import type { Visite, Visites } from "~/types/visite";

dayjs.extend(customParseFormat);

const useTypeFilterPagination = (types: Ref<Types>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(types.value)
      ? types.value.filter(
        (type: Type) =>
          !search.value || type.nom?.toLowerCase().includes(search.value.toLowerCase())
      )
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  return { filterTableData, setPage, search, total, pageSize };
};

const useProprietaireFilterPagination = (proprietaires: Ref<Proprietaires>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(proprietaires.value)
      ? proprietaires.value.filter(
        (proprietaire: Proprietaire) =>
          !search.value ||
          proprietaire.nom_complet.toLowerCase().includes(search.value.toLowerCase()) ||
          proprietaire.telephone.includes(search.value) ||
          proprietaire.cni.includes(search.value)
      )
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  return { filterTableData, setPage, search, total, pageSize };
};

const usePersonneFilterPagination = (personnes: Ref<Clients>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(personnes.value)
      ? personnes.value.filter(
        (personne: Client) =>
          !search.value ||
          personne.nom_complet?.toLowerCase().includes(search.value.toLowerCase()) ||
          personne.telephone.includes(search.value) ||
          personne.cni.includes(search.value)
      )
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  return { filterTableData, setPage, search, total, pageSize };
};

const useAppartementFilterPagination = (appartements: Ref<Appartements>) => {
  const search = ref("");
  const filterStatus = ref<string | null>(null);
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const base = Array.isArray(appartements.value)
      ? appartements.value.filter(
        (appartement: Appartement) =>
          !search.value ||
          appartement.nom.toLowerCase().includes(search.value.toLowerCase()) ||
          appartement.proprietaire?.toLowerCase().includes(search.value.toLowerCase()) ||
          appartement.quartier.toLowerCase().includes(search.value.toLowerCase())
      )
      : [];
    const filtered = filterStatus.value
      ? base.filter((appartement: Appartement) => appartement.status === filterStatus.value)
      : base;
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  const resetFilters = () => filterStatus.value = null;
  const hasActiveFilters = computed(() => !!filterStatus.value);
  return {
    filterTableData,
    setPage,
    search,
    total,
    pageSize,
    filterStatus,
    resetFilters,
    hasActiveFilters,
  };
};

const useTerrainFilterPagination = (terrains: Ref<Terrains>) => {
  const search = ref("");
  const filterStatus = ref<string | null>(null);
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const base = Array.isArray(terrains.value)
      ? terrains.value.filter(
        (terrain: Terrain) =>
          !search.value ||
          terrain.nom.toLowerCase().includes(search.value.toLowerCase()) ||
          terrain.proprietaire?.toLowerCase().includes(search.value.toLowerCase()) ||
          terrain.quartier.toLowerCase().includes(search.value.toLowerCase())
      )
      : [];
    const filtered = filterStatus.value
      ? base.filter((terrain: Terrain) => terrain.status === filterStatus.value)
      : base;
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  const resetFilters = () => {
    filterStatus.value = null;
  };
  const hasActiveFilters = computed(() => !!filterStatus.value);
  return {
    filterTableData,
    setPage,
    search,
    total,
    pageSize,
    filterStatus,
    resetFilters,
    hasActiveFilters,
  };
};

const useUserFilterPagination = (utilisateurs: Ref<Utilisateurs>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(utilisateurs.value)
      ? utilisateurs.value.filter(
        (utilisateur: Utilisateur) =>
          !search.value || utilisateur.name.toLowerCase().includes(search.value.toLowerCase())
      )
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  return { filterTableData, setPage, search, total, pageSize };
};

const useVisiteFilterPagination = (visites: Ref<Visites>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(visites.value)
      ? visites.value.filter(
        (visite: Visite) =>
          !search.value ||
          visite.code.toLowerCase().includes(search.value.toLowerCase()) ||
          visite.personne?.toLowerCase().includes(search.value.toLowerCase()) ||
          visite.status === search.value ||
          visite.avanceStatus === search.value
      )
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  return { filterTableData, setPage, search, total, pageSize };
};

const useContratFilterPagination = (contrats: Ref<Contrats>) => {
  const search = ref("");
  const filterStatus = ref<string | null>(null);
  const filterEtat = ref<string | null>(null);
  const filterDateRange = ref<[string, string] | null>(null);
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    let filtered = Array.isArray(contrats.value) ? [...contrats.value] : [];
    if (search.value.trim()) {
      const q = search.value.toLowerCase();
      filtered = filtered.filter(
        (contrat: Contrat) =>
          contrat.code.toLowerCase().includes(q) ||
          contrat.client.toLowerCase().includes(q) ||
          contrat.bien.toLowerCase().includes(q)
      );
    }
    if (filterStatus.value) {
      filtered = filtered.filter((c: Contrat) => c.status === filterStatus.value);
    }
    if (filterEtat.value) {
      filtered = filtered.filter((c: Contrat) => c.etat === filterEtat.value);
    }
    const [start, end] = filterDateRange.value ?? [];
    if (start && end) {
      const startDate = dayjs(start, "YYYY-MM-DD");
      const endDate = dayjs(end, "YYYY-MM-DD");
      filtered = filtered.filter((c: Contrat) => {
        const debut = c.debut;
        if (!debut) return false;
        const debutDate = dayjs(debut, "DD-MM-YYYY", true);
        if (!debutDate.isValid()) return false;
        return !debutDate.isBefore(startDate, "day") && !debutDate.isAfter(endDate, "day");
      });
    }
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  const resetFilters = () => {
    filterStatus.value = null;
    filterEtat.value = null;
    filterDateRange.value = null;
  };
  const hasActiveFilters = computed(
    () =>
      !!filterStatus.value ||
      !!filterEtat.value ||
      (filterDateRange.value &&
        Array.isArray(filterDateRange.value) &&
        filterDateRange.value.some(Boolean))
  );
  return {
    filterTableData,
    setPage,
    search,
    total,
    pageSize,
    filterStatus,
    filterEtat,
    filterDateRange,
    resetFilters,
    hasActiveFilters,
  };
};

const usePurchaseFilterPagination = (achats: Ref<Achats>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(achats.value)
      ? achats.value.filter(
        (achat: Achat) =>
          !search.value ||
          achat.code.toLowerCase().includes(search.value.toLowerCase()) ||
          achat.personne.includes(search.value) ||
          achat.bien.includes(search.value)
      )
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  return { filterTableData, setPage, search, total, pageSize };
};

const usePaiementFilterPagination = (paiements: Ref<Paiements>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(paiements.value)
      ? paiements.value.filter((paiement: Paiement) => {
        if (paiement.code !== undefined)
          return (
            !search.value || paiement.code.toLowerCase().includes(search.value.toLowerCase())
          );
      })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => (currentPage.value = val);
  return { filterTableData, setPage, search, total, pageSize };
};

const useOwnerContratFilter = (details: Ref<DetailsOwnerContract[]>) => {
  const search = ref("");
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(2);

  watch(search, () => (currentPage.value = 1));

  const filteredContrats = computed(() => {
    const list = details.value ?? [];
    if (!search.value.trim()) return list;
    const q = search.value.toLowerCase();
    return list.filter(
      (c) =>
        c.bien?.toLowerCase().includes(q) ||
        c.code?.toLowerCase().includes(q) ||
        c.client?.toLowerCase().includes(q),
    );
  });

  const filterTableData = computed(() => {
    const filtered = filteredContrats.value;
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value,
    );
  });

  const setPage = (val: number) => (currentPage.value = val);
  return { filterTableData, setPage, search, total, pageSize };
};

export {
  useTypeFilterPagination,
  useProprietaireFilterPagination,
  usePersonneFilterPagination,
  useAppartementFilterPagination,
  useTerrainFilterPagination,
  useUserFilterPagination,
  useVisiteFilterPagination,
  useContratFilterPagination,
  usePurchaseFilterPagination,
  usePaiementFilterPagination,
  useOwnerContratFilter,
};
