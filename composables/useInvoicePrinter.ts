import { useSocieteStore } from "~/store/societe";
import { Loyer } from "~/types/Loyer";
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

const useVisiteInvoiceProvisoire = async (visite: Visite | undefined) => {
  const { getOne } = useSocieteStore();
  const { societe } = useSocieteStore();
  await getOne();
  const print = () => {
    if (societe !== undefined && visite !== undefined) invoicePdf(societe, visite, true);
  };
  return { print };
};

const usePaiementReceipt = async (paiement: Paiement, achat: Achat) => {
  const { getOne } = useSocieteStore();
  const { societe } = useSocieteStore();
  getOne().then(() => {
    const print = () => {
      if (societe !== undefined && paiement !== undefined)
        paiementReceiptPdf(societe, paiement, achat);
    };
    print();
  });
};

const useLoyerReceipt = async (loyer: Ref<Loyer | undefined>) => {
  const { getOne } = useSocieteStore();
  const { societe } = useSocieteStore();
  getOne().then(() => {
    const print = () => {
      if (societe !== undefined && loyer !== undefined) rentReceiptPdf(societe, loyer.value!);
    };
    print();
  });
};

export { useVisiteInvoice, useVisiteInvoiceProvisoire, usePaiementReceipt, useLoyerReceipt };
