import { Utilisateurs } from "~/types/utilisateur";
import { Types } from "~/types/global";
import { Terrains } from "~/types/terrain";
import { Proprietaires } from "~/types/proprietaire";
import { Contrats } from "~/types/contrat";
import { Appartements } from "~/types/appartement";
import { Clients } from "~/types/personne";
import { Visites } from "~/types/visite";
import { Achats } from "~/types/achat";
import { Paiements } from "~/types/paiements";
import { Loyers } from "~/types/loyer";
import { Dettes } from "~/types/dette";

const useClientPrinter = (clients: Ref<Clients>) => {
  const records = computed(() =>
    clients.value.map((client) => {
      return {
        date: client.created_at,
        nom: client.nom_complet.toUpperCase(),
        email: client.email ?? "Aucun email",
        cni: client.cni,
        telephone: client.telephone,
        fonctions: client.fonctions,
        quartier: client.quartier,
        ville: client.ville,
      };
    })
  );
  const onPrint = () => {
    useArrayPrinter(
      ["nom", "email", "cni", "telephone", "fonctions", "quartier", "ville", "date"],
      records.value,
      "Clients"
    );
  };
  return { onPrint };
};

const useAppartementPrinter = (appartements: Ref<Appartements>) => {
  const records = computed(() =>
    appartements.value.map((appartement) => {
      return {
        date: appartement.created_at,
        nom: appartement.nom.toUpperCase(),
        montant: appartement.montant_location,
        proprietaire: appartement.proprietaire,
        type: appartement.type ?? "Auncun type",
        quartier: appartement.quartier,
        ville: appartement.ville,
      };
    })
  );
  const onPrint = () => {
    useArrayPrinter(
      ["nom", "montant", "proprietaire", "type", "quartier", "ville", "date"],
      records.value,
      "Appartements"
    );
  };
  return { onPrint };
};

const useContratPrinter = (contrats: Ref<Contrats>) => {
  const records = computed(() =>
    contrats.value.map((contrat) => {
      return {
        date: contrat.created_at,
        code: contrat.code,
        debut: contrat.debut,
        fin: contrat.fin,
        bien: contrat.bien,
      };
    })
  );
  const onPrint = () => {
    useArrayPrinter(["code", "debut", "fin", "date"], records.value, "Contrats");
  };
  return { onPrint };
};

const useProprietairePrinter = (proprietaire: Ref<Proprietaires>) => {
  const records = computed(() =>
    proprietaire.value.map((proprietaire) => {
      return {
        date: proprietaire.created_at,
        nom: proprietaire.nom_complet.toUpperCase(),
        email: proprietaire.email ?? "Aucun email",
        cni: proprietaire.cni,
        telephone: proprietaire.telephone,
      };
    })
  );
  const onPrint = () => {
    useArrayPrinter(
      ["nom", "email", "cni", "telephone", "appartement", "terrain", "date"],
      records.value,
      "Proprietaires"
    );
  };
  return { onPrint };
};

const useTerrainPrinter = (terrains: Ref<Terrains>) => {
  const records = computed(() =>
    terrains.value.map((terrain) => {
      return {
        date: terrain.created_at,
        nom: terrain.nom.toUpperCase(),
        montant: terrain.montant_location,
        proprietaire: terrain.proprietaire,
        type: terrain.type ?? "Auncun type",
        quartier: terrain.quartier,
        ville: terrain.ville,
      };
    })
  );
  const onPrint = () => {
    useArrayPrinter(
      ["nom", "montant", "proprietaire", "type", "quartier", "ville", "date"],
      records.value,
      "Terrains"
    );
  };
  return { onPrint };
};

const useTypePrinter = (types: Ref<Types>) => {
  const records = computed(() =>
    types.value.map((type) => {
      return { date: type.created_at, nom: type.nom };
    })
  );
  const onPrint = () => {
    useArrayPrinter(["nom", "date"], records.value, "types d'appartements");
  };
  return { onPrint };
};

const useUserPrinter = (utilisateurs: Ref<Utilisateurs>) => {
  const records = computed(() =>
    utilisateurs.value.map((user) => {
      return { date: user.created_at, nom: user.name, email: user.email };
    })
  );
  const onPrint = () => {
    useArrayPrinter(["nom", "date", "email"], records.value, "Utilisateurs");
  };
  return { onPrint };
};

const useVisitePrinter = (visites: Ref<Visites>) => {
  const records = computed(() =>
    visites.value.map((visite) => {
      return {
        date: visite.created_at,
        code: visite.code,
        montant: visite.montant,
        client: visite.personne,
      };
    })
  );
  const onPrint = () => {
    useArrayPrinter(["code", "client", "montant", "date"], records.value, "Visites");
  };
  return { onPrint };
};

const useAchatPrinter = (achats: Ref<Achats>) => {
  const records = computed(() =>
    achats.value.map((achat) => {
      return {
        date: achat.created_at,
        code: achat.code,
        total: achat.total,
        client: achat.personne,
        bien: achat.bien,
        reste: achat.reste,
      };
    })
  );
  const onPrint = () => {
    useArrayPrinter(["code", "client", "bien", "total", "reste", "date"], records.value, "Achats");
  };
  return { onPrint };
};

const usePaiementPrinter = (paiements: Paiements) => {
  const records = computed(() =>
    paiements.map((paiement) => {
      return {
        date: paiement.created_at,
        code: paiement.code,
        montant: paiement.montant,
        status: paiement.status,
      };
    })
  );
  const onPrint = () => {
    if (records.value !== undefined)
      useArrayPrinter(["code", "montant", "status", "date"], records.value, "Paiements");
  };
  return { onPrint };
};

const usePaiementRefPrinter = (paiements: Ref<Paiements>) => {
  const records = computed(() =>
    paiements.value.map((paiement) => {
      return {
        date: paiement.created_at,
        code: paiement.code,
        montant: paiement.montant,
        status: paiement.status,
      };
    })
  );
  const onPrint = () => {
    if (records.value !== undefined)
      useArrayPrinter(["code", "montant", "status", "date"], records.value, "Paiements");
  };
  return { onPrint };
};

const useLoyerPrinter = (loyers: Ref<Loyers>) => {
  const records = computed(() =>
    loyers.value.map((loyer) => {
      return {
        date: loyer.created_at,
        code: loyer.code,
        montant: loyer.montant,
        client: loyer.client,
        bien: loyer.bien,
        status: loyer.status,
      };
    })
  );
  const onPrint = () => {
    if (records.value !== undefined)
      useArrayPrinter(["code", "montant", "status", "date"], records.value, "Paiements");
  };
  return { onPrint };
};

const useDettePrinter = (dettes: Ref<Dettes>) => {
  const records = computed(() =>
    dettes.value.map((dette) => {
      return {
        date: dette.created_at,
        code: dette.code,
        montant: dette.montant,
        status: dette.status,
        type: dette.origine_type,
        contrat: dette.origine_code,
      };
    })
  );
  const onPrint = () => {
    if (records.value !== undefined)
      useArrayPrinter(
        ["code", "montant", "status", "type", "contrat", "date"],
        records.value,
        "Dettes"
      );
  };
  return { onPrint };
};

export {
  useClientPrinter,
  useAppartementPrinter,
  useContratPrinter,
  useProprietairePrinter,
  useTerrainPrinter,
  useTypePrinter,
  useUserPrinter,
  useVisitePrinter,
  useAchatPrinter,
  usePaiementPrinter,
  useLoyerPrinter,
  usePaiementRefPrinter,
  useDettePrinter,
};
