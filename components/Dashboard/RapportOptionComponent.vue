<script lang="ts" setup>
const date = defineModel<string | undefined>('modelValue', { default: undefined });
</script>

<template>
    <div class="ms-auto">
        <div class="dropdown ms-auto">
            <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                <i class="mdi mdi-dots-horizontal"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-end">
                <el-form>
                    <el-form-item label-position="top" label="Date">
                        <el-date-picker v-model="date" type="month" format="DD-MM-YYYY" value-format="YYYY-MM-DD" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
