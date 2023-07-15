import { useSocieteStore } from "~/store/societe";
import { Achat } from "~/types/achat";
import { Paiement } from "~/types/paiements";
import { Visite } from "~/types/visite";

const useVisiteInvoice = (visite: Visite | undefined) => {
  const { getOne } = useSocieteStore();
  const { societe } = useSocieteStore();
  getOne();
  const print = () => {
    if (societe !== undefined && visite !== undefined) invoicePdf(societe, visite);
  };
  return { print };
};

const useVisiteInvoiceProvisoire = (visite: Visite | undefined) => {
  const { getOne } = useSocieteStore();
  const { societe } = useSocieteStore();
  getOne();
  const print = () => {
    if (societe !== undefined && visite !== undefined) invoicePdf(societe, visite, true);
  };
  return { print };
};

const usePaiementReceipt = async (paiement: Paiement, achat: Achat) => {
  const { getOne } = useSocieteStore();
  const { societe } = useSocieteStore();
  await getOne();
  const print = () => {
    if (societe !== undefined && paiement !== undefined)
      paiementReceiptPdf(societe, paiement, achat);
  };
  print();
};

export { useVisiteInvoice, useVisiteInvoiceProvisoire, usePaiementReceipt };
