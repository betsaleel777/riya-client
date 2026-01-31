import { storeToRefs } from "pinia";
import { useSocieteStore } from "~/store/societe";
import type { Loyer } from "~/types/loyer";
import type { Achat } from "~/types/achat";
import type { Visite } from "~/types/visite";

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

export { useVisiteInvoice, useVisiteInvoiceProvisoire, useLoyerReceipt, useAchatReceipt };
