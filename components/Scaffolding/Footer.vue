<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">{{ year }}© Riya Immobilier</div>
        <div class="col-sm-6">
          <div class="text-sm-end d-none d-sm-block">Design & Develop by ...</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<style scoped></style>
