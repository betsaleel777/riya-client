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
      ? types.value.filter((type: Type) => !search.value || type.nom?.toLowerCase().includes(search.value.toLowerCase()))
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
  return { filterTableData, setPage, search, total, pageSize };
};

const useProprietaireFilterPagination = (proprietaires: Ref<Proprietaires>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(proprietaires.value)
      ? proprietaires.value.filter((proprietaire: Proprietaire) =>
        !search.value || proprietaire.nom_complet.toLowerCase().includes(search.value.toLowerCase()) || proprietaire.telephone.includes(search.value)
        || proprietaire.cni.includes(search.value)
      )
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
  return { filterTableData, setPage, search, total, pageSize };
};

const usePersonneFilterPagination = (personnes: Ref<Clients>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(personnes.value)
      ? personnes.value.filter((personne: Client) => !search.value || personne.nom_complet?.toLowerCase().includes(search.value.toLowerCase())
        || personne.telephone.includes(search.value) || personne.cni.includes(search.value))
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
  return { filterTableData, setPage, search, total, pageSize };
};

const useAppartementFilterPagination = (appartements: Ref<Appartements>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(appartements.value)
      ? appartements.value.filter((appartement: Appartement) => !search.value || appartement.nom.toLowerCase().includes(search.value.toLowerCase())
        || appartement.proprietaire?.toLowerCase().includes(search.value.toLowerCase()) || appartement.quartier.toLowerCase().includes(search.value.toLowerCase())
        || appartement.status === search.value
      ) : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
  return { filterTableData, setPage, search, total, pageSize };
};

const useTerrainFilterPagination = (terrains: Ref<Terrains>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(terrains.value)
      ? terrains.value.filter((terrain: Terrain) => !search.value || terrain.nom.toLowerCase().includes(search.value.toLowerCase())
        || terrain.proprietaire?.toLowerCase().includes(search.value.toLowerCase()) || terrain.quartier.toLowerCase().includes(search.value.toLowerCase())
        || terrain.status === search.value
      ) : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
  return { filterTableData, setPage, search, total, pageSize };
};

const useUserFilterPagination = (utilisateurs: Ref<Utilisateurs>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(utilisateurs.value)
      ? utilisateurs.value.filter((utilisateur: Utilisateur) => !search.value || utilisateur.name.toLowerCase().includes(search.value.toLowerCase()))
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
  return { filterTableData, setPage, search, total, pageSize };
};

const useVisiteFilterPagination = (visites: Ref<Visites>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(visites.value)
      ? visites.value.filter((visite: Visite) => !search.value || visite.code.toLowerCase().includes(search.value.toLowerCase())
        || visite.personne?.toLowerCase().includes(search.value.toLowerCase())
        || visite.status === search.value || visite.avanceStatus === search.value)
      : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
  return { filterTableData, setPage, search, total, pageSize };
};

const useContratFilterPagination = (contrats: Ref<Contrats>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(contrats.value)
      ? contrats.value.filter((contrat: Contrat) => !search.value || contrat.code.toLowerCase().includes(search.value.toLowerCase())
        || contrat.client?.includes(search.value) || contrat.bien.includes(search.value) || contrat.status === search.value
        || contrat.etat === search.value
      ) : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
  return { filterTableData, setPage, search, total, pageSize };
};

const usePurchaseFilterPagination = (achats: Ref<Achats>) => {
  const search = ref("");
  let total = ref(0);
  let currentPage = ref(1);
  let pageSize = ref(8);
  const filterTableData = computed(() => {
    const filtered = Array.isArray(achats.value)
      ? achats.value.filter((achat: Achat) => !search.value || achat.code.toLowerCase().includes(search.value.toLowerCase())
        || achat.personne.includes(search.value) || achat.bien.includes(search.value)
      ) : [];
    total.value = filtered.length;
    return filtered.slice(
      pageSize.value * currentPage.value - pageSize.value,
      pageSize.value * currentPage.value
    );
  });
  const setPage = (val: number) => currentPage.value = val;
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
  const setPage = (val: number) => currentPage.value = val;
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
};
