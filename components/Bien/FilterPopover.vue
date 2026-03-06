<script setup lang="ts">
import { statusBien } from "~/utils/constante";

const visible = ref(false);
const status = defineModel<string | null>("status", { default: null });

defineProps<{ hasActiveFilters?: boolean }>();
const emit = defineEmits<{ (e: "reset"): void }>();

const statusOptions = [
  { label: statusBien.busy, value: statusBien.busy },
  { label: statusBien.free, value: statusBien.free },
];

const handleReset = () => {
  emit("reset");
  visible.value = false;
};
</script>

<template>
  <el-popover v-model:visible="visible" placement="bottom-start" :width="260" trigger="click">
    <template #reference>
      <el-button type="default" plain :class="{ 'bien-filter-btn--active': hasActiveFilters }">
        <el-icon>
          <ElIconFilter />
        </el-icon>
        <span class="ms-1">Filtres</span>
        <el-badge v-if="hasActiveFilters" is-dot class="bien-filter-badge" />
      </el-button>
    </template>
    <div class="bien-filter-panel">
      <div class="bien-filter-panel__title">Filtres des biens</div>
      <div class="mb-2">
        <label class="bien-filter-panel__label">Statut</label>
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
        <el-button size="small" @click="handleReset">Réinitialiser</el-button>
      </div>
    </div>
  </el-popover>
</template>

<style scoped>
.bien-filter-btn--active {
  border-color: var(--el-color-primary);
  color: var(--el-color-primary);
}

.bien-filter-badge {
  margin-left: 4px;
}

.bien-filter-panel {
  padding: 4px 0;
}

.bien-filter-panel__title {
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 14px;
}

.bien-filter-panel__label {
  display: block;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 6px;
}
</style>

