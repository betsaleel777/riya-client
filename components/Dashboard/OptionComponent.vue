<script lang="ts" setup>
const props = defineProps<{ type: string }>();
const openDateModal = reactive({ range: false, date: false });
</script>

<template>
  <div class="ms-auto">
    <div class="dropdown ms-auto">
      <a
        class="text-muted font-size-16"
        role="button"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
      >
        <i class="mdi mdi-dots-horizontal"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-end">
        <a class="dropdown-item" href="#">Rafraîchir</a>
        <a @click="openDateModal.date = true" class="dropdown-item" href="#"> Par date </a>
        <a @click="openDateModal.range = true" class="dropdown-item" href="#"
          >Par intervale de date</a
        >
      </div>
    </div>
    <DashboardDateRangeSelectorModal v-model="openDateModal.range" />
    <DashboardDateSelectorModal v-model="openDateModal.date" />
  </div>
</template>

<style scoped></style>
