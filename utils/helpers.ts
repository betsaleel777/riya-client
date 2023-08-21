import { jsPDF as JsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Societe } from "~/types/societe";
import { Visite } from "~/types/visite";
import * as dayjs from "dayjs";
import { Paiement } from "~/types/paiements";
import { Achat } from "~/types/achat";
import { Loyer } from "~/types/Loyer";
import { Personne } from "~/types/global";
import { Client } from "~/types/personne";
import { Appartement } from "~/types/appartement";

interface header {
  header: string;
  dataKey: string;
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const arrayPdf = (cols: header[], records: any[], filename: string) => {
  const doc = new JsPDF("l", "pt", cols.length > 10 ? "a3" : "a4");
  autoTable(doc, {
    headStyles: { fillColor: "#eff5ff", textColor: "#515365" },
    columns: cols,
    body: records,
    styles: { overflow: "linebreak" },
    pageBreak: "auto",
    margin: { top: 45 },
    didDrawPage: () => {
      doc.text(filename.toUpperCase(), cols.length > 10 ? 535 : 365, 30);
    },
  });
  doc.save(filename + ".pdf");
};

const invoicePdf = (societe: Societe, visite: Visite, provisoire: boolean = false) => {
  const doc = new JsPDF("p", "pt", "a4");
  autoTable(doc, {
    body: [
      [
        {
          content: societe.raison_sociale,
          styles: {
            halign: "left",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
        {
          content: provisoire ? "Reçu provisoire" : "reçu définitif",
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#3366ff",
    },
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `Reference: ${visite.code} \nDate: ${dayjs().format("DD/MM/YYYY")}`,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `Facturé à:
            \n${visite.personne?.nom_complet}
            \n${visite.personne?.ville} ${visite.personne?.quartier}
            \n${visite.personne?.pays}`,
          styles: {
            halign: "left",
          },
        },
        {
          content: `De: 
            \n${societe.raison_sociale} 
            \n${societe.siege}
            \n${societe.boite_postale}
            \nCôte d'voire`,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: "Montant dû:",
          styles: {
            halign: "right",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: visite.montant,
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#3366ff",
          },
        },
      ],
      [
        {
          content: dayjs().add(3, "days").format("DD/MM/YYYY"),
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    head: [["Description", "Quantité", "Prix", "Montant"]],
    body: [["Visite du bien: " + visite.appartement?.nom, "1", visite.montant, visite.montant]],
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });
  autoTable(doc, {
    body: [
      [
        {
          content: "Subtotal:",
          styles: {
            halign: "right",
          },
        },
        {
          content: visite.montant,
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "TVA:",
          styles: {
            halign: "right",
          },
        },
        {
          content: "0",
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Montant total:",
          styles: {
            halign: "right",
          },
        },
        {
          content: visite.montant,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `${societe.raison_sociale} ${societe.forme_juridique}, registre de commerce: ${societe.registre}`,
          styles: {
            halign: "center",
          },
        },
      ],
    ],
    theme: "plain",
  });
  return doc.save("invoice");
};
const paiementReceiptPdf = (societe: Societe, paiement: Paiement, achat: Achat) => {
  const doc = new JsPDF("p", "pt", "a4");
  autoTable(doc, {
    body: [
      [
        {
          content: societe.raison_sociale,
          styles: {
            halign: "left",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
        {
          content: "Reçu de paiement",
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#3366ff",
    },
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `Reference: ${paiement.code} \nDate: ${dayjs().format("DD/MM/YYYY")}`,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `Facturé à:
            \n${achat.personne?.nom_complet}
            \n${achat.personne?.ville} ${achat.personne?.quartier}
            \n${achat.personne?.pays}`,
          styles: {
            halign: "left",
          },
        },
        {
          content: `De: 
            \n${societe.raison_sociale} 
            \n${societe.siege}
            \n${societe.boite_postale}
            \nCôte d'voire`,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: "Montant dû:",
          styles: {
            halign: "right",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: achat.bien.cout_achat,
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#3366ff",
          },
        },
      ],
      [
        {
          content: dayjs().add(3, "days").format("DD/MM/YYYY"),
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    head: [["Description", "Quantité", "Prix", "Montant"]],
    body: [
      ["Achat du bien: " + achat.bien?.nom, "1", achat.bien.cout_achat, achat.bien.cout_achat],
    ],
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });
  autoTable(doc, {
    body: [
      [
        {
          content: "montant versé:",
          styles: {
            halign: "right",
          },
        },
        {
          content: paiement.montant,
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Reste à payer:",
          styles: {
            halign: "right",
          },
        },
        {
          content: achat.reste,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `${societe.raison_sociale} ${societe.forme_juridique}, registre de commerce: ${societe.registre}`,
          styles: {
            halign: "center",
          },
        },
      ],
    ],
    theme: "plain",
  });
  return doc.save("invoice");
};
const rentReceiptPdf = (societe: Societe, loyer: Loyer) => {
  const doc = new JsPDF("p", "pt", "a4");
  const client = loyer.client as Client;
  const bien = loyer.bien as Appartement;
  autoTable(doc, {
    body: [
      [
        {
          content: societe.raison_sociale,
          styles: {
            halign: "left",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
        {
          content: "Reçu de paiement",
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#3366ff",
    },
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `Reference: ${loyer.code} \nDate: ${dayjs().format("DD/MM/YYYY")}`,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `Facturé à:
            \n${client?.nom_complet}
            \n${client?.ville} ${client?.quartier}
            \n${client?.pays}`,
          styles: {
            halign: "left",
          },
        },
        {
          content: `De: 
            \n${societe.raison_sociale} 
            \n${societe.siege}
            \n${societe.boite_postale}
            \nCôte d'voire`,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: "Montant dû:",
          styles: {
            halign: "right",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content: loyer.montant,
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#3366ff",
          },
        },
      ],
      [
        {
          content: dayjs().add(3, "days").format("DD/MM/YYYY"),
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    head: [["Description", "Quantité", "Prix", "Montant"]],
    body: [["Loyer du bien: " + bien?.nom, "1", bien.montant_location, bien.montant_location]],
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });
  autoTable(doc, {
    body: [
      [
        {
          content: "montant versé:",
          styles: {
            halign: "right",
          },
        },
        {
          content: loyer.montant,
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });
  autoTable(doc, {
    body: [
      [
        {
          content: `${societe.raison_sociale} ${societe.forme_juridique}, registre de commerce: ${societe.registre}`,
          styles: {
            halign: "center",
          },
        },
      ],
    ],
    theme: "plain",
  });
  return doc.save("reçu-loyer");
};

export { capitalize, arrayPdf, invoicePdf, paiementReceiptPdf, rentReceiptPdf };
