<template>
  <div id="layout-wrapper">
    <ScaffoldingHead />
    <ScaffoldingMenu />
    <div class="main-content">
      <slot />
      <ScaffoldingFooter />
    </div>
  </div>
  <ScaffoldingRightbar />
  <!-- Right bar overlay-->
  <div class="rightbar-overlay"></div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfigStore } from "~/store";

const store = useConfigStore();
const { collapsed, enabledRightBar } = storeToRefs(store);
useHead({
  bodyAttrs: {
    class: { "sidebar-enable vertical-collpsed": collapsed, "right-bar-enabled": enabledRightBar },
  },
});
</script>

<style scoped></style>
