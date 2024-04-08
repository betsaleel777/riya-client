<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
import { useTerrainStore } from "~/store/terrain";

const props = defineProps<{ modelValue: boolean; id: number }>();
const emit = defineEmits<{ (event: "update:modelValue", payload: boolean): void }>();
const { dialog } = useDialogModelValue(props, emit);

const { update, getOne } = useTerrainStore();
const { terrain, loading } = storeToRefs(useTerrainStore());
getOne(props.id);
const { onSubmit } = useSubmitForm(update, dialog);
</script>

<template>
  <Form
    class="form-horizontal"
    @submit="onSubmit"
    :initial-values="terrain"
    v-slot="{ isSubmitting, errors }"
  >
    <el-dialog v-model="dialog" title="Modifier le terrain" width="50%" destroy-on-close center>
      <div v-loading="loading.edit || isSubmitting">
        <TerrainDialogForm :errors="errors" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="dialog = false" plain>Annuler</el-button>
          <el-button type="primary" :disabled="isSubmitting" native-type="submit">
            modifier
          </el-button>
        </span>
      </template>
    </el-dialog>
  </Form>
</template>

<style scoped></style>
