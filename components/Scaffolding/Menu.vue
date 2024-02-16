<template>
  <div class="vertical-menu">
    <div data-simplebar class="h-100">
      <!--- Sidemenu -->
      <div id="sidebar-menu">
        <!-- Left Menu Start -->
        <ul class="metismenu list-unstyled" id="side-menu" ref="side">
          <li class="">
            <nuxt-link to="/proprietaire" class="waves-effect">
              <i class="bx bx-user-circle"></i>
              <span key="t-starter-page">Proprietaires</span>
            </nuxt-link>
          </li>
          <li class="">
            <nuxt-link to="/personne" class="waves-effect">
              <i class="bx bx-id-card"></i>
              <span key="t-starter-page">Clients</span>
            </nuxt-link>
          </li>
          <li class="">
            <nuxt-link to="/approval" class="waves-effect">
              <i class="bx bx-id-card"></i>
              <span key="t-starter-page "> Validations </span>
              <span
                v-if="!loading.pendings && Number(pendings) !== 0"
                class="float-end"
                :class="pendingsColor(Number(pendings))"
                >{{ pendings }}</span
              >
            </nuxt-link>
          </li>
          <li>
            <a
              href="javascript: void(0);"
              class="has-arrow waves-effect"
              @click="menu.biens = true"
            >
              <i class="bx bx-home"></i>
              <span key="t-Biens">Biens</span>
            </a>
            <ul class="sub-menu" :aria-expanded="menu.biens">
              <li>
                <nuxt-link to="/bien/appartement" key="t-appatement">Appartements</nuxt-link>
              </li>
              <li><nuxt-link to="/bien/terrain" key="t-terrain">Terrains</nuxt-link></li>
            </ul>
          </li>
          <li>
            <a
              href="javascript: void(0);"
              class="has-arrow waves-effect"
              @click="menu.operations = true"
            >
              <i class="bx bx-pulse"></i>
              <span key="t-Opération">Opérations</span>
            </a>
            <ul class="sub-menu" :aria-expanded="menu.operations">
              <li>
                <nuxt-link to="/operation/visite" key="t-visite">Locations</nuxt-link>
              </li>
              <li><nuxt-link to="/operation/purchase" key="t-purchase">Achats</nuxt-link></li>
              <li><nuxt-link to="/operation/contrat" key="t-contrat">Contrats</nuxt-link></li>
              <li><nuxt-link to="/loyer" key="t-loyer">Loyers</nuxt-link></li>
            </ul>
          </li>
          <li>
            <a
              href="javascript: void(0);"
              class="has-arrow waves-effect"
              @click="menu.caisse = true"
            >
              <i class="bx bx-dollar"></i>
              <span key="t-caisse">Caisses</span>
            </a>
            <ul class="sub-menu" :aria-expanded="menu.caisse">
              <li>
                <nuxt-link to="/paiement" key="t-paiements">Paiements</nuxt-link>
              </li>
              <li><nuxt-link to="/dette" key="t-dettes">Dettes</nuxt-link></li>
              <li><nuxt-link to="/depense" key="t-depense">Dépenses</nuxt-link></li>
            </ul>
          </li>
          <li>
            <a
              href="javascript: void(0);"
              class="has-arrow waves-effect"
              @click="menu.parametres = true"
            >
              <i class="bx bx-cog"></i>
              <span key="t-parametres">Parametres</span>
            </a>
            <ul class="sub-menu" :aria-expanded="menu.parametres">
              <li>
                <nuxt-link to="/parametre/utilisateur" key="t-type-terrain">Utilisateur</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/parametre/type/terrain" key="t-type-terrain"
                  >Types de terrains</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/parametre/type/appartement" key="t-type-appartement"
                  >Types d'appartements</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/parametre/type/depense" key="t-type-depense"
                  >Types de dépenses</nuxt-link
                >
              </li>
              <li>
                <nuxt-link to="/parametre/type/personne" key="t-client">Types de clients</nuxt-link>
              </li>
              <li><nuxt-link to="/parametre/societe" key="t-societe">Société</nuxt-link></li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- Sidebar -->
    </div>
  </div>
</template>

<script setup lang="ts">
import MetisMenu from "metismenujs";
import { storeToRefs } from "pinia";
import { ButtonType, buttonTypes } from "element-plus";
import { useDashboardStore } from "~/store/dashboard";
const menu = ref({
  parametres: false,
  biens: false,
  operations: false,
  caisse: false,
});
const side = ref<unknown>(null);
onMounted(() => {
  new MetisMenu(side.value as HTMLElement);
});
const { getPendings } = useDashboardStore();
const { pendings, loading } = storeToRefs(useDashboardStore());
getPendings();
const pendingsColor = (value: number): string => {
  if (value <= 3) {
    return "badge badge-soft-" + buttonTypes[2];
  } else if (value <= 10) {
    return "badge badge-soft-" + buttonTypes[1];
  } else if (value <= 25) {
    return "badge badge-soft-" + buttonTypes[3];
  } else {
    return "badge badge-soft-" + buttonTypes[5];
  }
};
console.log(pendings.value);
</script>

<style scoped></style>
