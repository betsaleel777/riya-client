<script lang="ts" setup>
const props = defineProps<{ montant: number; icon: string; titre: string }>();
const openDateModal = reactive({ range: false, date: false });
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex flex-wrap align-items-start">
        <h5 class="card-title mb-3 me-2">{{ props.titre }}</h5>
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
      </div>
      <div class="d-flex flex-wrap">
        <div>
          <p class="text-muted mb-1">montant</p>
          <h4 class="mb-3">{{ useCurrency(props.montant) }}</h4>
          <p class="text-success mb-0">
            <span>0.6 % <i class="mdi mdi-arrow-top-right ms-1"></i></span>
          </p>
        </div>
        <div class="ms-auto align-self-end">
          <i class="display-4 text-light" :class="props.icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
