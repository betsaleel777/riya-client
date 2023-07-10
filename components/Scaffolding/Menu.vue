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
          <!-- <li :class="{ 'mm-active': menu.layouts.root }">
            <a
              href="javascript: void(0);"
              class="has-arrow waves-effect"
              @click="menu.layouts.root = !menu.layouts.root"
              :aria-expanded="menu.layouts.root"
            >
              <i class="bx bx-layout"></i>
              <span key="t-layouts">Layouts</span>
            </a>
            <ul
              class="sub-menu mm-collapse"
              :class="{ 'mm-show': menu.layouts.root }"
              :aria-expanded="menu.layouts.root"
            >
              <li :class="{ 'mm-active': menu.layouts.horizontal }">
                <a
                  href="javascript: void(0);"
                  class="has-arrow mm-collapse"
                  key="t-horizontal"
                  @click="menu.layouts.horizontal = !menu.layouts.horizontal"
                  >Horizontal</a
                >
                <ul class="sub-menu mm-collapse" :aria-expanded="menu.layouts.root">
                  <li>
                    <a href="layouts-horizontal.html" key="t-horizontal">Horizontal</a>
                  </li>
                  <li>
                    <a href="layouts-hori-topbar-light.html" key="t-topbar-light">Topbar light</a>
                  </li>
                  <li>
                    <a href="layouts-hori-boxed-width.html" key="t-boxed-width">Boxed width</a>
                  </li>
                  <li>
                    <a href="layouts-hori-preloader.html" key="t-preloader">Preloader</a>
                  </li>
                  <li>
                    <a href="layouts-hori-colored-header.html" key="t-colored-topbar"
                      >Colored Header</a
                    >
                  </li>
                  <li>
                    <a href="layouts-hori-scrollable.html" key="t-scrollable">Scrollable</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li> -->
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
                <nuxt-link to="/operation/visite" key="t-visite">Visites</nuxt-link>
              </li>
              <li><nuxt-link to="/operation/purchase" key="t-purchase">Achats</nuxt-link></li>
              <li><nuxt-link to="/operation/contrat" key="t-contrat">Contrats</nuxt-link></li>
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
const menu = ref({
  // layouts: { root: false, horizontal: false },
  parametres: false,
  biens: false,
  operations: false,
});
const side = ref<unknown>(null);
onMounted(() => {
  new MetisMenu(side.value as HTMLElement);
});
</script>

<style scoped></style>
