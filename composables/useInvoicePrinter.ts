import { storeToRefs } from "pinia";
import { useSocieteStore } from "~/store/societe";
import { Loyer } from "~/types/loyer";
import { Achat } from "~/types/achat";
import { Paiement } from "~/types/paiements";
import { Visite } from "~/types/visite";

const useVisiteInvoice = (visite: Ref<Visite | undefined>) => {
  const { getOne } = useSocieteStore();
  const { societe } = storeToRefs(useSocieteStore());
  getOne().then(() => {
    if (societe !== undefined && visite !== undefined) invoicePdf(societe, visite);
  });
};

const useVisiteInvoiceProvisoire = async (visite: Ref<Visite | undefined>) => {
  const { getOne } = useSocieteStore();
  const { societe } = storeToRefs(useSocieteStore());
  getOne().then(() => {
    if (societe !== undefined && visite !== undefined) invoicePdf(societe, visite, true);
  });
};

const usePaiementReceipt = async (paiement: Paiement, achat: Achat) => {
  const { getOne } = useSocieteStore();
  const { societe } = useSocieteStore();
  getOne().then(() => {
    if (societe !== undefined && paiement !== undefined) paiementReceiptPdf(societe, paiement, achat);
  });
};

const useLoyerReceipt = async (loyer: Loyer) => {
  const { getOne } = useSocieteStore();
  const { societe } = storeToRefs(useSocieteStore());
  getOne().then(() => rentReceiptPdf(societe, loyer));
};

const useAchatReceipt = async (achat: Achat) => {
  const { getOne } = useSocieteStore();
  const { societe } = storeToRefs(useSocieteStore());
  getOne().then(() => purchaseReceiptPdf(societe, achat));
};

export { useVisiteInvoice, useVisiteInvoiceProvisoire, usePaiementReceipt, useLoyerReceipt, useAchatReceipt };
