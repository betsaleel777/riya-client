<script lang="ts" setup>
import { Contrat } from "~/types/contrat";
import { useSocieteStore } from "~/store/societe";
import { storeToRefs } from "pinia";
import { Printer } from "@element-plus/icons-vue";
import customParseFormat from "dayjs/plugin/customParseFormat";

const dayjs = useDayjs();
dayjs.extend(customParseFormat);
const props = defineProps<{ contrat: Contrat }>();
const { societe, loading } = storeToRefs(useSocieteStore());
const { getOne } = useSocieteStore();
let url = ref("");
getOne().then(async () => {
  const blob = await useDownloadFile(societe.value?.logo!);
  if (blob) url.value = URL.createObjectURL(blob);
});
const dateStart = computed(() =>
  dayjs(props.contrat?.debut, "DD-MM-YYYY", "fr").format("YYYY-MM-DD")
);
const printzone = ref<HTMLElement>();
const imprimer = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "L'impression du contrat est en cours",
  });
  const html = printzone.value!;
  await domPrinter(html);
  loading.close();
};
</script>

<template>
  <div class="d-flex flex-row-reverse mb-2">
    <el-button @click="imprimer" type="warning" plain :icon="Printer">imprimer</el-button>
  </div>
  <div v-if="!loading" v-loading="loading">
    <div ref="printzone" class="col-lg-12">
      <div class="card">
        <div class="card-body pe-5 ps-5">
          <div class="row text-center">
            <div class="col-4">
              <el-image
                fit="fill"
                v-if="url.length > 0"
                :src="url"
                style="height: 80%; width: 90%"
              />
            </div>
            <div class="col-4">
              <el-image src="/images/eccuissonci.png" style="height: 140px; width: 140px" />
            </div>
            <div class="col-4">
              <div class="d-flex flex-column py-4">
                <h4>République de Côte d'ivoire</h4>
                <span>Union-Discipline-Travail</span>
                <el-image fit="fill" src="/images/ci-flag.png" style="height: 15px; width: 100%" />
              </div>
            </div>
          </div>
          <div style="width: 80%" class="container">
            <div class="text-center">
              <div class="d-flex justify-content-center align-baseline my-3">
                <h2 class="rounded border border-primary p-2 text-uppercase text-warning">
                  bail à usage d'habitation
                </h2>
              </div>
              <div class="d-flex flex-column">
                <span class="text-muted"><u>Texte de référence:</u></span>
                <span
                  ><em
                    >Loi N°2019-576 du 26 juin 2019 instituant Code de la Construction et de
                    l’Habitat</em
                  >
                </span>
                <span class="my-1">ENTRE:</span>
              </div>
            </div>
            <p class="text-justify">
              <b
                >L’agence <span class="text-uppercase">{{ societe.raison_sociale }}</span></b
              >, entreprise individuelle, représentée par Madame TOTO, domiciliée à Abidjan,
              immatriculée au RCCM de Toumodi sous le {{ societe.registre }}, Tél. :
              {{ societe.contact }} ; compte contribuable n°<b>1703538F</b>. Désignée dans tout ce
              qui suit : « Le BAILLEUR ».
            </p>
            <div class="d-flex flex-row-reverse">
              <b>D'une part</b>
            </div>
            <div class="text-center my-1">ET</div>
            <p class="text-justify">
              <b>LE LOCATAIRE: </b>
              {{ props.contrat?.operation?.personne?.nom_complet }}<br />
              Référence identité (CNI- Passeport- RCCM) N°{{
                props.contrat.operation?.personne?.cni
              }}. Etablie le ...<br />
              Profession : {{ props.contrat?.operation?.personne?.fonctions }}.<br />
              Tel. Domicile :{{ props.contrat?.operation?.personne?.telephone }}, Tel. Bureau
              .....<br />
              Courriel : {{ props.contrat?.operation?.personne?.email }}
              Personne à contacter en cas d’urgence: ……………………………… Contact : …………………………….
            </p>
            <span class="my-1"
              >Dénommé au titre du présent acte « LE PRENEUR » ou « LE LOCATAIRE »</span
            >
            <div class="d-flex flex-row-reverse"><b>D’autre part.</b></div>
            <p>Lesquels ont convenu et arrêté le contrat qui suit :</p>
            <div class="d-flex justify-content-center align-baseline my-3">
              <h4 class="rounded border border-primary p-2 text-uppercase text-warning">bail</h4>
            </div>
            <p class="text-justify my-1">
              <b>Le BAILLEUR</b> donne à bail à titre d’habitation, pour une durée, sous les
              conditions et moyennant le prix ci-après indiqués au PRENEUR qui accepte, les biens
              immobiliers dont la désignation suit :
            </p>
            <div class="d-flex justify-content-center align-baseline my-3">
              <h4 class="rounded border border-primary p-2 text-uppercase text-warning">
                désignation
              </h4>
            </div>
            <p class="text-justify my-1">
              {{ contrat.operation?.appartement?.nom }} à usage d’habitation sis au quartier
              {{ contrat.operation?.appartement?.quartier }} de la commune de
              {{ contrat.operation?.appartement?.ville }}. Le PRENEUR déclare connaître parfaitement
              le bien loué ou l’avoir vu et visité en vue du présent bail.
            </p>
            <div class="html2pdf__page-break"></div>
            <div class="d-flex justify-content-center align-baseline my-3">
              <h4 class="rounded border border-primary p-2 text-uppercase text-warning">
                état des lieux
              </h4>
            </div>
            <p class="mt-1 mb-4 text-justify">
              Le PRENEUR prend les lieux loués dans l’état où ils se trouvent lors de l’entrée en
              jouissance et les rendra en fin de bail tel qu’il les aura reçus suivant l’état des
              lieux dressé par les parties. Un état des lieux contradictoire intermédiaire pourra
              être réalisé en cours d’exécution du contrat, afin de permettre au BAILLEUR de
              s’assurer que le LOCATAIRE jouit des lieux en bon père de famille. Dans le cas
              contraire, le BAILLEUR pourra mettre le LOCATAIRE en demeure de procéder aux
              réparations que le dépôt de garantie ne pourrait couvrir. A l’expiration du bail, un
              état des lieux contradictoire, en présence des parties, est également fait par les
              parties ou leurs représentants dûment mandatés. Le PRENEUR veillera à la remise des
              lieux dans leur état primitif (agencement, enduit, peinture intérieure (mur, plafond,
              porte, fenêtre, etc…) et extérieure, etc).
            </p>
            <!-- <div class="hidden-print">
              <hr class="mb-0" />
              <div class="d-flex flex-row-reverse font-weight-bolder mb-3">Page 1</div>
            </div> -->
            <div class="d-flex justify-content-center align-baseline">
              <h4 class="rounded border border-primary p-2 text-uppercase text-warning">
                TITRE I: CONCLUSION DU BAIL ET FIXATION DU LOYER
              </h4>
            </div>
            <h6 class="font-weight-bold my-3">ARTICLE 1 – DUREE ET RENOUVELLEMENT DU BAIL</h6>
            <span class="text-justify">
              Le présent bail est conclu pour une durée de un ans à l’échéance, le présent bail est
              renouvelé par tacite reconduction dans les mêmes conditions contractuelle au bénéfice
              du PRENEUR de bonne foi ou de ses ayants droit, à moins que:
            </span>
            <ul>
              <li>
                Le BAILLEUR déclare avoir besoin des lieux loués pour les occuper lui-même ou pour
                les faire occuper de manière effective par un ascendant ou descendant ou allié
                jusqu’au (3ème) degré inclusivement.
              </li>
              <li>
                Le LOCATAIRE ne remplisse pas ses obligations contractuelles (paiement de loyer,
                etc…);
              </li>
              <li class="text-justify">
                Il existe d’autres motifs graves et légitimes (non-respect des délais de paiement,
                non-paiement de loyer, insolence, agression, ou infractions sérieuses quelconques,
                etc…) à établir par le BAILLEUR, à l’exclusion du transfert de propriété de
                l’immeuble ou du local qui ne vaut pas motif grave et légitime.
              </li>
            </ul>
            <p class="text-justify my-1">
              Le présent bail est fait aux clauses et conditions suivantes que les parties
              s’obligent à exécuter de bonne foi, sans pouvoir réclamer aucune diminution ou
              augmentation du loyer ci-après fixé et a peine de résiliation sur simple constatation
              des infractions s’il plait au bailleur ainsi que tous dommages et intérêts.
            </p>
            <h6 class="font-weight-bold my-3">ARTICLE 2 - LOYER</h6>
            <p class="text-justify">
              Le montant du loyer est fixé en tenant compte de la valeur du marché de l’immeuble ou
              du local. Le présent bail est consenti et accepté moyennant un loyer mensuel de (en
              lettre)
              {{
                numberToFrench(contrat.operation?.appartement?.montant_location!, " ").toUpperCase()
              }}
              (en chiffre) {{ contrat.operation?.appartement?.montant_location }} Francs CFA payable
              par mois et d’avance au plus tard le 05 du mois en cours, en espèces, par chèque à
              porteur ou par virement au compte de {{ societe.raison_sociale }}. Le BAILLEUR est
              tenu de délivrer une quittance au LOCATAIRE pour faire preuve du paiement du loyer.
            </p>
            <p class="text-justify mt-1">
              En cas de non-respect de l’obligation de délivrance de quittance de paiement de loyer
              par le BAILLEUR, le LOCATAIRE pourra faire preuve du paiement du loyer par tous
              moyens.
            </p>
            <div class="text-center">
              <u>Clause pénale</u> : 10% de pénalité de retard à partir du 6ème jour
            </div>
            <div class="html2pdf__page-break"></div>
            <h6 class="font-weight-bold my-3">ARTICLE 3 – REVISION DU LOYER</h6>
            <span
              >Le loyer peut être révisé à la hausse ou à la baisse tous les
              <b>trois (3) ans</b>.</span
            >
            <p class="my-2">
              Les litiges relatifs à la révision du loyer peuvent être portés devant la juridiction
              compétente. La partie qui sollicite une augmentation ou une réduction du loyer doit
              être préalablement notifier son intention à l’autre partie par tout moyen, au moins
              trois (3) mois avant la date d’effet de ladite révision et après la troisième année de
              la conclusion du bail ou de la précédente révision, sous peine de nullité de la clause
              contractuelle consacrant ladite révision.
            </p>
            <h6 class="font-weight-bold my-3">ARTICLE 4 : DEPOT DE GARANTIE (ou CAUTION)</h6>
            <p class="text-justify">
              Le PRENEUR verse entre les mains du BAILLEUR, la somme de (en lettres)
              {{
                numberToFrench(
                  props.contrat?.operation?.caution! *
                    props.contrat?.operation?.appartement?.montant_location!,
                  " "
                ).toUpperCase()
              }}
              (en chiffre)
              {{
                props.contrat?.operation?.caution! *
                props.contrat?.operation?.appartement?.montant_location!
              }}
              Francs CFA en guise de dépôt de garantie (caution). ET la somme de
              ………………………………………………………………………………………………. représentant une garantie pour les factures en
              cas d’impayées ou d’insuffisance.
            </p>
            <p class="text-justify">
              Il garantit l’exécution des obligations du PRENEUR en fin de contrat notamment les
              dégradations, les impayés ainsi que les divers manquements qui pourraient survenir de
              son fait.
            </p>
            <p class="text-justify">
              En cas de stipulation d’une garantie locative, un état des lieux écrit et
              contradictoire doit être signé entre les parties, au plus tard le jour de l’entrée en
              jouissance des lieux par le LOCATAIRE, et également le dernier jour de location, en
              fin de contrat.
            </p>
            <p>Le dépôt de garantie n’est pas productif d’intérêt.</p>

            <div class="text-danger text-center my-3">
              Le locataire ne peut se servir du dépôt de garantie au paiement des loyers, même en
              fin de contrat.
            </div>
            <p class="text-justify">
              Cette garantie locative est remboursée par le BAILLEUR dans un délai d’un (1) mois à
              compter de la restitution des clés, déduction faite, le cas échéant, des sommes
              restantes dues au BAILLEUR et des sommes dont celui-ci pourrait être tenu, sous
              réserve qu’elles soient dûment justifiées. La caution est remboursée à l’expiration de
              la présente location après :
            </p>
            <ul class="mb-0">
              <li class="text-justify">
                La remise des clés des locaux au Bailleur après qu’elle ait été remise en état et
                que cette remise en état ait été acceptée par le BAILLEUR conformément à l’état des
                lieux d’entrée.
              </li>
              <li>La présentation de la quittance de résiliation CIE et SODECI</li>
              <li>
                Dans un délai de 1 mois après réception des clefs des locaux remis en état selon
                l’état des lieux d’entrée
              </li>
              <li class="text-justify">
                Si le locataire a informé le BAILLEUR de son intention de déménager trois (3) mois
                avant, dans le cas contraire un (1) mois de loyer sera déduit de son loyer à titre
                de dédommagement
              </li>
            </ul>
            <span class="text-justify">
              En cas de transfert de propriété à titre gratuit ou onéreux des locaux loués, la
              restitution du dépôt de garantie incombe au nouveau BAILLEUR: En cas d'insuffisance de
              dépôt de garantie pour compenser les frais de réparations et les dépenses effectués
              par le BAILLEUR, celui-ci dispose d´une action en responsabilité contre le LOCATAIRE.
            </span>
            <h6 class="font-weight-bold my-3">ARTICLE 5 – LOYERS D'AVANCE</h6>
            <p class="text-justify">
              Le PRENEUR verse entre les mains du BAILLEUR, à titre de loyers d'avance la somme de
              {{
                numberToFrench(
                  props.contrat?.operation?.appartement?.montant_location! *
                    props.contrat?.operation?.avance!,
                  " "
                )
              }}
              ,
              {{
                props.contrat.operation?.appartement?.montant_location! *
                props.contrat?.operation?.avance!
              }}
              (en lettres et en chiffres) Francs CFA contre remise de quittance. Cette somme
              représente les loyers des mois de {{ $dayjs(dateStart).format("MMMM YYYY") }} à
              {{
                $dayjs(dateStart)
                  .add(props.contrat?.operation?.avance!, "months")
                  .format("MMMM YYYY")
              }}
            </p>
            <div class="html2pdf__page-break"></div>
            <div class="d-flex justify-content-center align-baseline mt-1">
              <h4 class="rounded border border-primary p-2 text-uppercase text-warning">
                TITRE II: OBLIGATION DES PARTIES
              </h4>
            </div>
            <h5 class="font-weight-bold my-2 text-center">SECTION 1: OBLIGATIONS DU BAILLEUR</h5>
            <h6 class="font-weight-bold my-3">
              ARTICLE 6 – ETAT DU BIEN LOUÉ – VICES OU DÉFAUTS APPARENTS OU CACHÉS
            </h6>
            <span>Le BAILLEUR est tenu:</span>
            <ul class="mb-0">
              <li>De délivrer au LOCATAIRE l’immeuble ou le local loué</li>
              <li>
                D’entretenir l’immeuble ou le local à usage d’habitation en état de servir à l’usage
                pour
              </li>
              <li>D’en faire jouir paisiblement le LOCATAIRE pendant la durée du bail</li>
            </ul>
            <p class="text-justify">
              Le BAILLEUR est tenu de remettre au LOCATAIRE un logement décent ne comportant aucun
              risque d’atteinte à la sécurité physique, à la santé ou aux biens du LOCATAIRE et de
              tout occupant de son chef.
            </p>
            <p class="text-justify">
              Le logement donné à bail doit comporter tous les éléments le rendant conforme à un
              usage sain, sécurisé et paisible.
            </p>
            <p class="text-justify">
              Le BAILLEUR doit garantir le LOCATAIRE contre tous les vices ou défauts de l’immeuble
              ou du local loué qui en empêche l’usage normal, quand bien même le BAILLEUR ne les
              aurait pas connus au moment de la conclusion du bail. S’il résulte de ces vices ou
              défauts quelque perte pour le LOCATAIRE, le BAILLEUR est tenu de l’indemniser.
            </p>
            <p class="text-justify">
              Le BAILLEUR est également tenu de délivrer au LOCATAIRE l’immeuble ou le local loué
              avec les équipements mentionnés au bail en bon état de fonctionnement et de le
              garantir de vices ou défauts affectant lesdits équipements.
            </p>
            <p class="text-justify">
              Le BAILLEUR ne peut de son seul gré pendant la durée du bail ni changer la forme ou la
              destination de l’immeuble ou du local loué, ni en restreindre l’usage.
            </p>
            <h6 class="font-weight-bold my-3">ARTICLE 7 – GROSSES RÉPARATIONS</h6>
            <p class="text-justify">
              Le BAILLEUR est tenu d’entretenir l’immeuble ou le local loué, conformément à l’usage
              prévu au contrat et d’y faire à ses frais, toutes les grosses réparations, notamment
              celles concernant les murs porteurs ou de soutènement, les voûtes, les toitures, les
              poutres, les murs de clôtures, les canalisations et fosses d’aisance, les puisards,
              les installations encastrées, les ascenseurs, les escaliers, les planchers, la vétusté
              de
            </p>
            <p class="text-justify">
              l’immeuble ou du local, le ravalement des façades de l’immeuble ou du local loué, et
              également tous travaux rendus nécessaires par un cas de force majeurs.<br />
              Lorsque le BAILLEUR n’effectue pas lesdites réparations, le LOCATAIRE peut, après une
              mise en demeure infructueuse, se faire autoriser par la juridiction compétente à
              exécuter les réparations aux frais du BAILLEUR.
            </p>
            <p class="text-justify">
              La juridiction compétente fixe le montant des réparations et les modalités de
              remboursement du LOCATAIRE.
            </p>
            <p class="text-justify">
              En cas d’urgence, le LOCATAIRE est fondé à faire les travaux incombant au BAILLEUR
              après l’avoir informé par tous moyens.
            </p>
            <div class="html2pdf__page-break"></div>
            <p class="text-justify">
              Le LOCATAIRE peut demander en justice la résiliation du bail pour défaut des travaux
              incombant au BAILLEUR. La juridiction compétente, qui prononce la résiliation du bail
              pour défaut de travaux incombant au BAILLEUR, peut allouer, le cas échéant des
              dommages et intérêts au LOCATAIRE ou à ses ayants droit.<br />
              En absence de travaux de réparation incombant au BAILLEUR, le LOCATAIRE peut
              solliciter devant la juridiction compétente la réduction du loyer proportionnellement
              à l’atteinte portée à la jouissance de l’immeuble ou du local loué.
            </p>
            <p class="text-justify">
              Au cas où le Bailleur se trouverait dans l'incapacité d’effectuer les réparations, il
              devra en informer le Preneur, qui pourrait y faire procéder au frais du Bailleur.
            </p>
            <p class="text-justify">
              Le Bailleur remboursera selon les modalités et délais convenus, les dépenses engagées
              par le Preneur pour lesdits travaux.
            </p>
            <p class="text-justify">
              Le PRENEUR souffrira les grosses réparations et toutes transformations nécessaires que
              le BAILLEUR serait tenu d’effectuer au cours du bail, quelles qu’en soient
              l’importance et la durée sans pouvoir demander aucune indemnité ni diminution ou
              non-paiement du loyer.
            </p>
            <h5 class="font-weight-bold my-2 text-center">SECTION 2: OBLIGATIONS DU PRENEUR</h5>
            <h6 class="font-weight-bold my-3">ARTICLE 8 – DESTINATION DES LIEUX</h6>
            <p class="text-justify">
              Sauf stipulation contraire, le LOCATAIRE ne doit pas changer la destination de
              l’immeuble ou du local ou du local ou le transformer et faire des travaux
              d’amélioration de l’immeuble ou du local, sans l’accord écrit du BAILLEUR.
            </p>
            <h6 class="font-weight-bold my-3">ARTICLE 9 – CESSION DE BAIL OU SOUS LOCATION</h6>
            <p class="text-justify">
              La présente location est consentie au PRENEUR intuitu personae.
            </p>
            <p class="text-justify">
              Sauf disposition légale l’y autorisant ou autorisation expresse du BAILLEUR, le
              LOCATAIRE ne peut céder son bail ni sous louer ou laisser à la disposition de tiers,
              même à titre gratuit, les lieux loués.
            </p>
            <p class="text-justify">
              Sont exemptés des dispositions de l’alinéa précédent, les ascendants et descendants
              directs du PRENEUR lorsqu’ils continuent d’honorer les obligations contractuelles à
              l’égard du BAILLEUR.
            </p>
            <h6 class="font-weight-bold my-3">ARTICLE 10 – ENTRETIEN ET RÉPARATIONS</h6>
            <p class="text-justify">
              Le PRENEUR entretiendra les lieux loués en bon état de réparation locative, en jouira
              en bon père de famille, suivant leur usage et ne pourra en aucun cas, rien faire ni
              rien laisser qui puisse détériorer. Il supportera toutes les réparations qui
              deviendraient nécessaires par la suite et toutes dégradations résultant de son fait ou
              de celui de sa famille ou de celui de ses visiteurs ou de son personnel de maison.
            </p>
            <h6 class="font-weight-bold my-3">
              ARTICLE 11 – AMÉNAGEMENTS-TRANSFORMATIONS-CONSTRUCTIONS
            </h6>
            <p class="text-justify">
              Lorsque le LOCATAIRE effectue des travaux dans l’immeuble ou le local à usage
              d’habitation, autres que les travaux de menu entretien, sans l’accord écrit du
              BAILLEUR, ce dernier peut demander :
            </p>
            <ul>
              <li>La résiliation du contra</li>
              <li>La remise en l’état de l’immeuble ou du local loué </li>
              <li>
                La conservation à son profit des transformations ou améliorations effectuées sans
                que le LOCATAIRE puisse réclamer une indemnisation
              </li>
            </ul>
            <div class="html2pdf__page-break"></div>
            <h6 class="font-weight-bold my-3">ARTICLE 12– DÉGRADATIONS ET VOLS</h6>
            <p class="text-justify">
              Le PRENEUR est responsable des dégradations ou vols quelconques qui pourraient être
              commis par son personnel ou par des tiers dans les locaux loués et il en supportera
              les frais.
            </p>
            <p class="text-justify">
              Notons que la sécurité du PRENEUR est de la responsabilité de la Police et la
              Gendarmerie. En cas de vol ou infraction, le PRENEUR devra se référer à la Police ou
              la gendarmerie, et tenir informer le BAILLEUR.
            </p>
            <h6 class="font-weight-bold my-3">ARTICLE 13 – REMISE DES CLÉS</h6>
            <p class="text-justify">
              Le PRENEUR use des locaux loués conformément à leur destination et à les rendre en fin
              de bail en bon état de réparations locatives et conformes à l’état des lieux qui sera
              dressé contradictoirement entre le Bailleur et le Preneur, aux frais de ce dernier au
              moment de son installation.<br />
              Le jour de l'expiration de la location, le PRENEUR devra remettre au BAILLEUR les clés
              des locaux. Dans le cas où, par le fait du PRENEUR, le BAILLEUR n’aurait pu mettre en
              location ou laisser visiter les lieux ou encore faire la livraison à un nouveau
              LOCATAIRE ou même en reprendre la libre disposition, il aura droit à une indemnité,
              sans préjudice de tous dommages et intérêts.
            </p>
            <h6 class="font-weight-bold my-3">ARTICLE 14 – IMPÔTS ET CHARGES LOCATIVES</h6>
            <p class="text-justify">
              Le PRENEUR s’acquittera, à partir du jour d’entrée en jouissance, en sus du loyer
              ci-dessus fixé, de toutes les charges, les impôts fonciers restant à la charge du
              BAILLEUR.
            </p>
            <div class="html2pdf__page-break"></div>
            <div class="d-flex justify-content-center align-baseline mt-1">
              <h4 class="rounded border border-primary p-2 text-uppercase text-warning">
                TITRE III: FIN DU BAIL
              </h4>
            </div>
            <h6 class="font-weight-bold my-3">ARTICLE 15 – PAIEMENT DES LOYERS</h6>
            <p class="text-justify">
              Le PRENEUR s’oblige à payer le loyer d’avance au plus tard le 5 du mois en cours.
              Passé la date du 5 du mois en cours, et sans information (justification) du locataire
              un préavis de 3 mois peut être lancé à compter de ce jour, si le PRENEUR est
              irrégulier dans les paiements de son loyer ou ne respecte pas les délais de paiement
              régulièrement.
            </p>
            <p class="text-justify">
              Le PRENEUR s’engage à ne déménager qu’après avoir informé le bailleur trois (3) mois
              avant sous peine de voir déduire de la caution un mois loyer. Et être en règle dans
              les loyers.
            </p>
            <ul>
              <li class="text-justify">
                Laisser pénétrer le Bailleur ou son Représentant pour vérifier l’état des lieux, à
                charge pour lui de prévenir le Preneur par lettre recommandée au moins 72 heures à
                l’avance.
              </li>
              <li class="text-justify">
                A supporter toutes réparations qui deviendraient nécessaires par la suite et toutes
                dégradations résultant de son fait ou de celui de sa famille ou de son personnel de
                maison.
              </li>
              <li>
                Il aura entièrement à sa charge, sans recours contre le BAILLEUR, l’entretien :
                <ul>
                  <li class="text-justify">
                    De la plomberie qui comprend la robinetterie, les colonnes de douche, les
                    chasses d’eau des WC à l’exclusion des canalisations encastrées pour l’adduction
                    en eau potable.
                  </li>
                  <li>
                    De l’électricité qui comprend tous les appareils notamment les interrupteurs,
                    prises dismatics et les luminaires.
                  </li>
                  <li class="text-justify">
                    Des aménagements intérieurs et réfection de la peinture qui comprennent les
                    enduits, la propreté des sols, leur revêtement et également la réfection des
                    peintures intérieures tous les 2 ans. Il est formellement interdit de changer
                    les couleurs de l’intérieur du bien loué sans l’autorisation préalable et par
                    écrit du BAILLEUR.
                  </li>
                </ul>
              </li>
              <li class="text-justify">
                A assurer contre l'incendie et le dégât des eaux auprès d’une compagnie d’Assurance,
                ses meubles et objets mobiliers ainsi que contre les risques locatifs et le recours
                des voisins et à justifier au propriétaire, à toute réquisition, du paiement exact
                des primes ; à prévenir le Bailleur de tous sinistres, sous peine de
                dommages-intérêts.
              </li>
              <li class="text-justify">
                A satisfaire en lieu et place du Bailleur à toutes les prescriptions de polices, de
                voirie et d’hygiène mise à sa charge par la loi de manière que le BAILLEUR ne soit
                pas inquiété à cet égard
              </li>
              <li class="text-justify">
                A installer les appareils de climatisation et autres conformément aux règles de
                l’art notamment les compresseurs des splits à l’extérieur sur des socles appropriés.
                Le preneur devra mettre des tuyaux pour l’écoulement de l’eau des moteurs de
                climatisation de sorte que l’eau ne s’écoule pas sur les balcons, les terrasses, les
                grilles métalliques, les volets roulants et les baies vitrées, pendant toute la
                durée du présent bail.
              </li>
              <li>A ne pas gêner ses voisins, et ne pas représenter pour ceux-ci un problème</li>
              <li>A ne pas se bagarrer ou injurier ses voisins ou faire scandale.</li>
              <li>A vider les fosses septiques à ses frais et sans avoir recours au Bailleur.</li>
            </ul>
            <div class="html2pdf__page-break"></div>
            <h6 class="font-weight-bold my-3">ARTICLE 16 – LES CAUSES DE RÉSILIATION DU BAIL</h6>
            <p class="text-justify mb-0">
              Le bail à usage d’habitation peut être légitimement résilier avant son terme ou
              lorsqu’il est à durée indéterminée:
            </p>
            <ul>
              <li>En cas de force majeure</li>
              <li>Par accord commun des parties</li>
              <li>En cas de manquement à ses obligations par l’une des parties</li>
              <li>
                Au terme d’un préavis de trois (3) mois notifié par écrit au BAILLEUR par le
                LOCATAIRE
              </li>
              <li class="text-justify">
                Au terme d’un congé de trois (3) mois notifié par écrit au LOCATAIRE par le
                LOCATAIRE qui veut exercer son droit de reprise du bien pour l’occuper lui-même ou
                pour le faire occuper de manière effective par un ascendant ou descendant ou allié
                jusqu’au troisième (3ème) degré inclusivement.
              </li>
              <li class="text-justify">
                A défaut de paiement à son échéance exacte d’un seul terme du loyer, des charges
                accessoires à ce loyer, ou en cas d’inexécution de l’une des clauses ou condition du
                présent bail, celui-ci sera résilié de plein droit, si bon semble au BAILLEUR, et
                avec ou sans commandement par acte d’huissier, selon le choix du bailleur. Le
                locataire accepte et est consentant qu’à cet effet le Bailleur déconnecte (si bon
                lui semble) les compteurs du Preneur, de ses branchements de SODECI et Cie pour ne
                pas avoir à supporter des impayés sur les dits compteurs. Car le propriétaire est
                également propriétaire de ses branchements.
              </li>
            </ul>
            <span>
              <b><u>NB</u></b
              >: Tous frais et honoraires d’huissier et autres seront à la charge du PRENEUR qui s’y
              oblige et s’y engage.
            </span>
            <h6 class="font-weight-bold my-3">ARTICLE 17 – ABANDON DU LOCAL PAR LE LOCATAIRE</h6>
            <p class="text-justify">
              Lorsque le LOCATAIRE abandonne l’immeuble ou le local loué sans payer les loyers
              échus, le BAILLEUR fait constater l’abandon par voie de Commissaire de Justice et peut
              demander l’autorisation d’ouverture des portes au juge des référés.
            </p>
            <p class="text-justify">
              En cas d’autorisation judiciaire d’ouverture des portes, le BAILLEUR établit par voie
              de Commissaire de Justice, l’inventaire des biens du LOCATAIRE trouvés dans l’immeuble
              ou le local loué, les remet à un commissaire-priseur, en vue de leur vente publique
              préalablement autorisée par le juge.
            </p>
            <p class="text-justify">
              Le BAILLEUR peut saisir la juridiction compétente du lieu de situation de l’immeuble
              ou du local pour obtenir la résiliation du bail à usage d’habitation, la condamnation
              du LOCATAIRE l’ayant abandonné au paiement des loyers échus et de dommages et
              intérêts, et aussi l’autorisation de vendre aux enchères publiques les biens du
              LOCATAIRE trouvés dans l’immeuble ou le local loué.
            </p>
            <div class="html2pdf__page-break"></div>
            <h6 class="font-weight-bold my-3">ARTICLE 18 – DÉCÈS DU LOCATAIRE</h6>
            <p class="text-justify mb-0">
              En cas de décès du LOCATAIRE, le bail à usage d’habitation continue jusqu’à son terme:
            </p>
            <ul class="mt-1 mb-0">
              <li>
                Au profit du conjoint ayant cohabité avec le LOCATAIRE, si celui-ci paie
                effectivement les loyers échus
              </li>
              <li>
                Au profit du concubin ayant vécu en couple avec le LOCATAIRE, si celui-ci paie
                effectivement les loyers échus
              </li>
              <li>
                Au profit des descendants ou des ascendants, si ceux-ci payent effectivement les
                loyers échus
              </li>
            </ul>
            <p class="text-justify">
              Au terme du bail à usage d’habitation précédemment conclu par le LOCATAIRE décédé, le
              BAILLEUR peut proposer un nouveau bail aux personnes ayant continué l’occupation de
              l’immeuble ou du local loué.
            </p>
            <p>
              A défaut de personnes remplissant les conditions prévues ci-dessus ou à défaut de
              personnes désirant continuer le bail, le bail est résilié de plein droit.
            </p>
            <h6 class="font-weight-bold my-3">
              ARTICLE 19 – DROIT DE PRÉEMPTION DU LOCATAIRE EN CAS DE VENTE
            </h6>
            <p class="text-justify">
              Le LOCATAIRE bénéficie d’un droit de préemption en cas de vente de l’immeuble ou du
              local loué, à moins que celui-ci ne fasse l’objet d’une vente par adjudication
              publique ou qu’il ne soit cédé à un membre de la famille du BAILLEUR, parent ou allié,
              jusqu’au troisième (3ème) degré inclusivement.
            </p>
            <p class="text-justify">
              Le BAILLEUR qui veut vendre l’immeuble ou le local loué est tenu d’adresser au
              LOCATAIRE par tout moyen, une offre de vente. Dans l’offre de vente, le BAILLEUR doit
              avertir le LOCATAIRE qu’il a le droit de faire une contre-proposition.
            </p>
            <p class="text-justify">
              Le LOCATAIRE dispose d’un délai de sept (07) jours calendaires pour faire
              éventuellement une contre-proposition et d’un délai d’un (1) mois calendaire pour
              effectuer le paiement du prix de vente, sauf stipulation contraire des parties. Le
              silence du LOCATAIRE à l’expiration du délai de sept (07) jours calendaires ci-dessus,
              vaut refus de l’offre.
            </p>
            <p class="text-justify">
              Le BAILLEUR peut vendre l’immeuble ou le local loué à un tiers si celui-ci offre un
              prix supérieur à celui proposé par le LOCATAIRE dûment informé.
            </p>
            <div class="html2pdf__page-break"></div>
            <div class="d-flex justify-content-center align-baseline mt-1">
              <h4 class="rounded border border-primary p-2 text-uppercase text-warning">
                TITRE IV : COPROPRIETE – ELECTION DE DOMICILE
              </h4>
            </div>
            <h6 class="font-weight-bold my-3">ARTICLE 20 – CO-PROPRIÉTÉ OU RÉGIME ASSIMILÉ</h6>
            <p class="text-justify">
              Dans le cas où le bien loué se trouverait en copropriété en raison de l’existence de
              parties communes ou l’usage d’espaces, de services ou d’équipements communs, le
              BAILLEUR et le preneur conviennent que les charges ou les cotisations afférentes à ces
              parties communes seront à la charge exclusive du PRENEUR.
            </p>
            <h6 class="font-weight-bold my-3">
              ARTICLE 21 : ELECTION DE DOMICILE ET ATTRIBUTION DE JURIDICTION
            </h6>
            <p class="text-justify">
              Pour l’exécution des présentes les parties font élection de domicile en leur domicile
              ou siège social indiqué au début du présent bail : le Bailleur en son agence et le
              Preneur dans les locaux loués.
            </p>
            <p class="text-justify">
              En outre, toutes contestations qui pourraient s’élever pendant la durée du bail
              pourront être soumises à l’arbitrage de tout organisme qualifié à cette fin et requis
              par les parties; à défaut, le litige sera soumis à la juridiction compétente de la
              situation de l’immeuble ou du local loué.
            </p>
            <span>DONT ACTE</span>
            <div class="d-flex justify-content-end my-5">
              <div class="d-flex flex-column">
                <span>Fait à .......</span>
                <span>En deux (2) exemplaires originaux</span>
                <span>Le ..........20...........</span>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="d-flex flex-column">
                <span
                  ><b><u>Pour le PRENEUR</u></b></span
                >
                <small>Avec la mention Lu et Approuvé</small>
              </div>
              <span
                ><b><u>Pour le BAILLEUR</u></b></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex flex-row-reverse mb-2">
    <el-button @click="imprimer" type="warning" plain :icon="Printer">imprimer</el-button>
  </div>
</template>

<style scoped></style>
