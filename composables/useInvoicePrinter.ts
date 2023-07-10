import { useSocieteStore } from "~/store/societe";
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
  console.log(visite);
  const { getOne } = useSocieteStore();
  const { societe } = useSocieteStore();
  getOne();
  const print = () => {
    if (societe !== undefined && visite !== undefined) invoicePdf(societe, visite, true);
  };
  return { print };
};

export { useVisiteInvoice, useVisiteInvoiceProvisoire };
