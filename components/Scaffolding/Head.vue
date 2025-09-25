<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <nuxt-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="/images/logo-dark.jpg" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="/images/logo-dark.png" alt="" height="17" />
            </span>
          </nuxt-link>

          <nuxt-link to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="/images/logo-light.jpg" alt="" height="22" />
            </span>
            <span class="logo-lg">
              <img src="/images/logo-light.png" alt="" height="19" />
            </span>
          </nuxt-link>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item waves-effect"
          id="vertical-menu-btn"
          @click="toggleCollapse()"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item waves-effect"
            id="page-header-user-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img class="rounded-circle header-profile-user" :src="user.photo" alt="Header Avatar" />
            <span class="d-none d-xl-inline-block ms-1" key="t-henry">{{ user.name }}</span>
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#"
              ><i class="bx bx-user font-size-16 align-middle me-1"></i>
              <span key="t-profile">Profile</span></a
            >
            <div class="dropdown-divider"></div>
            <a @click="logout" class="dropdown-item text-danger btn btn-small" href="#"
              ><i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
              <span key="t-logout">Logout</span></a
            >
          </div>
        </div>

        <div class="dropdown d-inline-block">
          <button
            @click="drawer = !drawer"
            type="button"
            class="btn header-item noti-icon waves-effect"
          >
            <i class="bx bx-cog bx-spin"></i>
          </button>
        </div>

        <el-drawer v-model="drawer" size="18%">
          <template #header>
            <el-text>Paramètres d'éclairage</el-text>
          </template>
          <div class="d-flex flex-column justify-content-center">
            <el-switch v-model="isDark" class="mb-2" active-text="sombre" inactive-text="claire" />
            <el-image
              v-if="isDark"
              src="/images/layouts/layout-2.jpg"
              class="img-thumbnail"
              alt="layout images"
            />
            <el-image
              v-else
              src="/images/layouts/layout-1.jpg"
              class="img-thumbnail"
              alt="layout images"
            />
          </div>
        </el-drawer>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useConfigStore } from "~/store";
const { toggleCollapse } = useConfigStore();
const { $sanctumAuth } = useNuxtApp();
const { user } = useAuth();
const drawer = ref(false);
const color = useColorMode();
const isDark = ref(color.value === "dark");
watch(isDark, (darkMode) => {
  if (darkMode) {
    color.preference = "dark";
    useHead({
      bodyAttrs: { "data-layout-mode": color.preference, "data-sidebar": color.preference },
    });
  } else {
    color.preference = "light";
    useHead({
      bodyAttrs: { "data-layout-mode": color.preference, "data-sidebar": color.preference },
    });
  }
});
const logout = async () => {
  await $sanctumAuth.logout();
};
</script>

<style scoped></style>
