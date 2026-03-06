<script setup lang="ts">
import { statusPayable } from "~/utils/constante";

const visible = ref(false);
const dateRange = defineModel<[string, string] | null>("dateRange", { default: null });
const status = defineModel<string | null>("status", { default: null });

defineProps<{ hasActiveFilters?: boolean }>();
const emit = defineEmits<{ (e: "search"): void }>();

const statusOptions = [
  { label: statusPayable.paid, value: statusPayable.paid },
  { label: statusPayable.unpaid, value: statusPayable.unpaid },
  { label: statusPayable.pending, value: statusPayable.pending },
];

const handleSearch = () => {
  emit("search");
  visible.value = false;
};
</script>

<template>
  <el-popover v-model:visible="visible" placement="bottom-start" :width="320" trigger="click">
    <template #reference>
      <el-button type="default" plain :class="{ 'loyer-filter-btn--active': hasActiveFilters }">
        <el-icon>
          <ElIconFilter />
        </el-icon>
        <span class="ms-1">Filtres</span>
        <el-badge v-if="hasActiveFilters" is-dot class="loyer-filter-badge" />
      </el-button>
    </template>
    <div class="loyer-filter-panel">
      <div class="loyer-filter-panel__title">Filtres multicritères</div>
      <div class="mb-2">
        <label class="loyer-filter-panel__label">Intervalle de dates</label>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="Début"
          end-placeholder="Fin"
          format="DD-MM-YYYY"
          value-format="YYYY-MM-DD"
          style="width: 100%"
          :teleported="false"
          clearable
        />
      </div>
      <div class="mb-3">
        <label class="loyer-filter-panel__label">Statut</label>
        <el-select
          v-model="status"
          placeholder="Tous les statuts"
          clearable
          style="width: 100%"
          :teleported="false"
        >
          <el-option
            v-for="opt in statusOptions"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
      </div>
      <div class="d-flex justify-content-end gap-1">
        <el-button size="small" type="primary" @click="handleSearch">Rechercher</el-button>
      </div>
    </div>
  </el-popover>
</template>

<style scoped>
.loyer-filter-btn--active {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}

.loyer-filter-badge {
  margin-left: 4px;
}

.loyer-filter-panel {
  padding: 4px 0;
}

.loyer-filter-panel__title {
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 14px;
}

.loyer-filter-panel__label {
  display: block;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 6px;
}
</style>
