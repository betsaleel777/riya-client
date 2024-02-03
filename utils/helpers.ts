import { jsPDF as JsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Societe } from "~/types/societe";
import { Visite } from "~/types/visite";
import dayjs from "dayjs";
import { Paiement } from "~/types/paiements";
import { Achat } from "~/types/achat";
import { Loyer } from "~/types/loyer";
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

const invoicePdf = (societe: Ref<Societe>, visite: Ref<Visite | undefined>, provisoire: boolean = false) => {
  const doc = new JsPDF("p", "pt", "a4");
  const total = visite.value?.montant! +
    (Number(visite.value?.frais!) + Number(visite.value?.caution!) + Number(visite.value?.avance!)) * visite.value?.appartement?.montant_location! + Number(visite.value?.frais_dossier!)
  autoTable(doc, {
    body: [
      [
        {
          content: societe.value.raison_sociale,
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
          content: `Reference: ${ visite.value?.code } \nDate: ${ dayjs().format("DD/MM/YYYY") }`,
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
            \n${ visite.value?.personne?.nom_complet }
            \n${ visite.value?.personne?.ville } ${ visite.value?.personne?.quartier }
            \n${ visite.value?.personne?.pays }`,
          styles: {
            halign: "left",
          },
        },
        {
          content: `De: 
            \n${ societe.value.raison_sociale } 
            \n${ societe.value.siege }
            \n${ societe.value.boite_postale }
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
          content: total,
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
    head: [["Description", "Quantité", "Prix Unitaire", 'date', "Montant"]],
    body: [
      [
        "Visite du bien: " + visite.value?.appartement?.nom,
        "1", useCurrency(visite.value?.montant!), visite?.value?.created_at!, useCurrency(visite.value?.montant!)
      ],
      [
        "Frais de dossier: ", societe.value.frais_dossier + "%",
        visite.value?.frais_dossier === undefined ? 0 : useCurrency(visite.value?.appartement?.montant_location!),
        '', visite.value?.frais_dossier === undefined ? 0 : useCurrency(visite.value.frais_dossier),
      ],
      [
        "Frais d'agence: ",
        visite.value?.frais === undefined ? "0 mois" : visite.value.frais + " mois",
        visite.value?.frais === undefined ? "" : useCurrency(visite.value?.appartement?.montant_location!),
        dayjs(visite.value?.fraisObject?.created_at!).format("DD-MM-YYYY"), visite.value?.frais === undefined ? "" :
          useCurrency(visite.value?.appartement?.montant_location! * visite.value.frais),
      ],
      [
        "Caution: ",
        visite.value?.caution === undefined ? "0 mois" : visite.value.caution + " mois",
        visite.value?.caution === undefined ? "" : useCurrency(visite.value?.appartement?.montant_location!),
        dayjs(visite.value?.cautionObject?.created_at).format("DD-MM-YYYY"), visite.value?.caution === undefined ? "" :
          useCurrency(visite.value?.appartement?.montant_location! * visite.value.caution),
      ],
      [
        "Avance: ",
        visite.value?.avance === undefined ? "0 mois" : visite.value.avance + " mois",
        visite.value?.avance === undefined ? "" : useCurrency(visite.value?.appartement?.montant_location!),
        dayjs(visite.value?.avanceObject?.created_at).format("DD-MM-YYYY"), visite.value?.avance === undefined ? "" :
          useCurrency(visite.value?.appartement?.montant_location! * visite.value.avance),
      ],
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
          content: "Subtotal:",
          styles: {
            halign: "right",
          },
        },
        {
          content: useCurrency(total),
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
          content: useCurrency(total),
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
          content: `${ societe.value.raison_sociale } ${ societe.value.forme_juridique }, registre de commerce: ${ societe.value.registre }`,
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
          content: `Reference: ${ paiement.code } \nDate: ${ dayjs().format("DD/MM/YYYY") }`,
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
            \n${ achat.personne?.nom_complet }
            \n${ achat.personne?.ville } ${ achat.personne?.quartier }
            \n${ achat.personne?.pays }`,
          styles: {
            halign: "left",
          },
        },
        {
          content: `De: 
            \n${ societe.raison_sociale } 
            \n${ societe.siege }
            \n${ societe.boite_postale }
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
          content: useCurrency(achat.bien.cout_achat),
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
      ["Achat du bien: " + achat.bien?.nom, "1", useCurrency(achat.bien.cout_achat), useCurrency(achat.bien.cout_achat)],
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
          content: useCurrency(paiement.montant),
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
          content: useCurrency(achat.reste),
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
          content: `${ societe.raison_sociale } ${ societe.forme_juridique }, registre de commerce: ${ societe.registre }`,
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
const rentReceiptPdf = (societe: Ref<Societe>, loyer: Loyer) => {
  const doc = new JsPDF("p", "pt", "a4");
  const client = loyer?.personne as Client;
  const bien = loyer?.bien as Appartement;
  let paid = 0
  loyer?.paiements.forEach((paiement) => paid += paiement.montant)
  const paiementsStorie = loyer?.paiements?.map((paiement) => (
    [paiement.code, paiement.audit.user.name, paiement.created_at, useCurrency(paiement.montant)]
  ))
  autoTable(doc, {
    body: [
      [
        {
          content: societe.value.raison_sociale,
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
          content: `Reference: ${ loyer?.code } \nDate: ${ dayjs().format("DD/MM/YYYY") }`,
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
            \n${ client?.nom_complet }
            \n${ client?.ville } ${ client?.quartier }
            \n${ client?.telephone }
            \n${ client?.email ?? '' }`,
          styles: {
            halign: "left",
          },
        },
        {
          content: `De: 
            \n${ societe.value.raison_sociale } 
            \n${ societe.value.siege }
            \n${ societe.value.boite_postale }
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
          content: useCurrency(loyer?.montant!),
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
    body: [["Loyer du bien: " + bien?.nom, "1", useCurrency(bien.montant_location), useCurrency(bien.montant_location)]],
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });
  autoTable(doc, {
    head: [["Code du paiement", "Caissier", "Date", "Montant"]],
    body: [...paiementsStorie!],
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
          content: useCurrency(paid),
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "reste à payer:",
          styles: {
            halign: "right",
          },
        },
        {
          content: useCurrency(loyer?.montant - paid),
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
          content: `${ societe.value.raison_sociale } ${ societe.value.forme_juridique }, registre de commerce: ${ societe.value.registre }`,
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

const purchaseReceiptPdf = (societe: Ref<Societe>, achat: Achat) => {
  const doc = new JsPDF("p", "pt", "a4");
  const paiements = achat.paiements
  const pending = paiements?.find((paiement) => paiement.status === statusValidable.wait)
  const paiementsStorie = paiements?.map((paiement) => (
    [paiement.code, paiement.audit.user.name, paiement.created_at, useCurrency(paiement.montant)]
  ))
  autoTable(doc, {
    body: [
      [
        {
          content: societe.value.raison_sociale,
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
          content: `Achat crée par: ${ achat.audit.user.name }`,
          styles: {
            halign: "left",
          },
        },
        {
          content: `Reference: ${ achat.code } \nDate: ${ dayjs().format("DD/MM/YYYY") }`,
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
            \n${ achat.personne?.nom_complet }
            \n${ achat.personne?.ville } ${ achat.personne?.quartier }
            \n${ achat.personne?.telephone }
            \n${ achat.personne?.email ?? '' }`,
          styles: {
            halign: "left",
          },
        },
        {
          content: `De: 
            \n${ societe.value.raison_sociale } 
            \n${ societe.value.siege }
            \n${ societe.value.boite_postale }
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
          content: useCurrency(achat.bien.cout_achat),
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
      ["Achat du bien: " + achat.bien?.nom, "1", useCurrency(achat.bien.cout_achat), useCurrency(achat.bien.cout_achat)],
    ],
    theme: "striped",
    headStyles: {
      fillColor: "#343a40",
    },
  });
  autoTable(doc, {
    head: [["Code du paiement", "Caissier", "Date", "Montant"]],
    body: [...paiementsStorie!],
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
          content: useCurrency(pending?.montant!),
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
          content: useCurrency(achat.bien.cout_achat - pending?.montant!),
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
          content: `${ societe.value.raison_sociale } ${ societe.value.forme_juridique }, registre de commerce: ${ societe.value.registre }`,
          styles: {
            halign: "center",
          },
        },
      ],
    ],
    theme: "plain",
  });
  return doc.save("reçu-achat");
}

/**
 * Convert an integer to its words representation
 */
const numberToFrench = (n: number, custom_join_character: string): string => {

  var string = n.toString(),
    units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;

  var and = custom_join_character || 'et';

  /* Is number zero? */
  if (parseInt(string) === 0) {
    return 'zero';
  }

  /* Array of units as words */
  units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze',
    'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];

  /* Array of tens as words */
  tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

  /* Array of scales as words */
  scales = ['', 'mille', 'million', 'milliard', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion'];

  /* Split user arguemnt into 3 digit chunks from right to left */
  start = string.length;
  chunks = [];
  while (start > 0) {
    end = start;
    chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }

  /* Check if function has enough scale words to be able to stringify the user argument */
  chunksLen = chunks.length;
  if (chunksLen > scales.length) {
    return '';
  }

  /* Stringify each integer in each chunk */
  words = [];
  for (i = 0; i < chunksLen; i++) {

    chunk = parseInt(chunks[i]);

    if (chunk) {

      /* Split chunk into array of individual integers */
      ints = chunks[i].split('').reverse().map(parseFloat);

      /* If tens integer is 1, i.e. 10, then add 10 to units integer */
      if (ints[1] === 1) {
        ints[0] += 10;
      }

      /* Add scale word if chunk is not zero and array item exists */
      if ((word = scales[i])) {
        words.push(word);
      }

      /* Add unit word if array item exists */
      if ((word = units[ints[0]])) {
        words.push(word);
      }

      /* Add tens word if array item exists */
      if ((word = tens[ints[1]])) {
        words.push(word);
      }

      /* Add 'and' string after units or tens integer if: */
      if (ints[0] || ints[1]) {

        /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
        if (ints[2] || !i && chunksLen) {
          words.push(and);
        }

      }

      /* Add hundreds word if array item exists */
      if ((word = units[ints[2]])) {
        words.push(word + ' cent');
      }

    }
  }
  return words.reverse().join(' ');
}

export { capitalize, arrayPdf, invoicePdf, paiementReceiptPdf, rentReceiptPdf, purchaseReceiptPdf, numberToFrench };
