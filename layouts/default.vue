<template>
  <div id="layout-wrapper">
    <ScaffoldingHead />
    <ScaffoldingMenu />
    <div class="main-content">
      <slot />
      <ScaffoldingFooter />
    </div>
  </div>
  <!-- Right bar overlay-->
  <div class="rightbar-overlay"></div>
</template>

<style scoped></style>
