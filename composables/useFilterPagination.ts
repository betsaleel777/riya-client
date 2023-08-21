import { Loyer, Loyers } from "~/types/Loyer";
import { Achat, Achats } from "~/types/achat";
import { Appartement, Appartements } from "~/types/appartement";
import { Contrat, Contrats } from "~/types/contrat";
import { Types, Type } from "~/types/global";
import { Paiement, Paiements } from "~/types/paiements";
import { Client, Clients } from "~/types/personne";
import { Proprietaires, Proprietaire } from "~/types/proprietaire";
import { Terrain, Terrains } from "~/types/terrain";
import { Utilisateur, Utilisateurs } from "~/types/utilisateur";
import { Visite, Visites } from "~/types/visite";

const useTypeFilterPagination = (types: Ref<Types>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(types.value)
      ? types.value.filter((type: Type) => {
          if (type.nom !== undefined)
            return !search.value || type.nom.toLowerCase().includes(search.value.toLowerCase());
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const useProprietaireFilterPagination = (proprietaires: Ref<Proprietaires>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(proprietaires.value)
      ? proprietaires.value.filter((proprietaire: Proprietaire) => {
          if (proprietaire.nom_complet !== undefined)
            return (
              !search.value ||
              proprietaire.nom_complet.toLowerCase().includes(search.value.toLowerCase())
            );
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const usePersonneFilterPagination = (personnes: Ref<Clients>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(personnes.value)
      ? personnes.value.filter((personne: Client) => {
          if (personne.nom_complet !== undefined)
            return (
              !search.value ||
              personne.nom_complet.toLowerCase().includes(search.value.toLowerCase())
            );
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const useAppartementFilterPagination = (appartements: Ref<Appartements>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(appartements.value)
      ? appartements.value.filter((appartement: Appartement) => {
          if (appartement.nom !== undefined)
            return (
              !search.value || appartement.nom.toLowerCase().includes(search.value.toLowerCase())
            );
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const useTerrainFilterPagination = (terrains: Ref<Terrains>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(terrains.value)
      ? terrains.value.filter((terrain: Terrain) => {
          if (terrain.nom !== undefined)
            return !search.value || terrain.nom.toLowerCase().includes(search.value.toLowerCase());
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const useUserFilterPagination = (utilisateurs: Ref<Utilisateurs>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(utilisateurs.value)
      ? utilisateurs.value.filter((utilisateur: Utilisateur) => {
          if (utilisateur.name !== undefined)
            return (
              !search.value || utilisateur.name.toLowerCase().includes(search.value.toLowerCase())
            );
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const useVisiteFilterPagination = (visites: Ref<Visites>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(visites.value)
      ? visites.value.filter((visite: Visite) => {
          if (visite.code !== undefined)
            return !search.value || visite.code.toLowerCase().includes(search.value.toLowerCase());
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const useContratFilterPagination = (contrats: Ref<Contrats>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(contrats.value)
      ? contrats.value.filter((contrat: Contrat) => {
          if (contrat.code !== undefined)
            return !search.value || contrat.code.toLowerCase().includes(search.value.toLowerCase());
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const usePurchaseFilterPagination = (achats: Ref<Achats>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(achats.value)
      ? achats.value.filter((achat: Achat) => {
          if (achat.code !== undefined)
            return !search.value || achat.code.toLowerCase().includes(search.value.toLowerCase());
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const useLoyerFilterPagination = (loyers: Ref<Loyers>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(loyers.value)
      ? loyers.value.filter((loyer: Loyer) => {
          if (loyer.code !== undefined)
            return !search.value || loyer.code.toLowerCase().includes(search.value.toLowerCase());
        })
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => {
    currentPage.value = val;
  };
  return { filterTableData, setPage, search, total, pageSize };
};

const usePaiementFilterPagination = (paiements: Paiements) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(paiements)
      ? paiements.filter((paiement: Paiement) => {
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
  const setPage = (val: number) => {
    currentPage.value = val;
  };
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
  useLoyerFilterPagination,
};
