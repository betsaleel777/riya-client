<script lang="ts" setup>
import { Field, useField } from "vee-validate";
import { Utilisateur } from "~/types/utilisateur";

const props = defineProps<{ errors: any; user?: Utilisateur }>();
let url = ref("");
const image = ref();
const edit = computed(() => Boolean(props.user));
const onInput = () => {
  const [file] = image.value.files;
  if (file) url.value = URL.createObjectURL(file);
};
let adminOptionDisabled = ref(!props.user?.roles.includes(rolesNames.admin));
const initialise = () => {
  if (props.user?.roles.length === 0) {
    adminOptionDisabled.value = false;
    return 0;
  } else {
    return props.user?.roles.includes(rolesNames.admin) ? 1 : 2;
  }
};
let limit = ref(initialise());
const { value: roles } = useField<string[]>("roles");
const onSelected = () => {
  if (roles.value.includes(rolesNames.admin)) {
    limit.value = 1;
    adminOptionDisabled.value = false;
  } else if (roles.value.length !== 0) {
    limit.value = 2;
    adminOptionDisabled.value = true;
  } else {
    adminOptionDisabled.value = false;
  }
};
</script>

<template>
  <Field name="id" hidden />
  <div class="block">
    <el-avatar shape="circle" :size="75" :src="url" />
  </div>
  <div class="mb-2">
    <Field name="image" v-slot="{ handleChange, handleBlur }">
      <label for="formFile1" class="form-label">Avatar d'utilisateur</label>
      <input
        ref="image"
        class="form-control"
        type="file"
        id="formFile1"
        @input="onInput"
        @change="handleChange($event, true)"
        @blur="handleBlur"
        :class="{ 'is-invalid': errors.image }"
      />
      <div class="invalid-feedback" v-if="errors.image">
        {{ errors.image }}
      </div>
    </Field>
  </div>
  <div class="mb-2">
    <label for="name" class="form-label">Nom</label>
    <Field name="name" v-slot="{ handleChange, value }">
      <el-input
        id="name"
        :model-value="value"
        @update:model-value="handleChange"
        :class="{ 'is-invalid': props.errors.name }"
      />
    </Field>
    <div class="invalid-feedback" v-if="errors.name">
      {{ props.errors.name }}
    </div>
  </div>
  <div class="mb-2">
    <label for="email" class="form-label">Email</label>
    <Field name="email" v-slot="{ handleChange, value }">
      <el-input
        id="email"
        :model-value="value"
        @update:model-value="handleChange"
        :class="{ 'is-invalid': props.errors.email }"
      />
    </Field>
    <div class="invalid-feedback" v-if="errors.email">{{ props.errors.email }}</div>
  </div>
  <div class="mb-2" v-show="edit">
    <label for="oldPassword" class="form-label">Ancien mot de passe</label>
    <Field name="oldPassword" v-slot="{ handleChange, value }">
      <el-input
        id="oldPassword"
        :model-value="value"
        @update:model-value="handleChange"
        :class="{ 'is-invalid': props.errors.oldPassword }"
        type="password"
        show-password
      />
    </Field>
    <div class="invalid-feedback" v-if="errors.oldPassword">{{ props.errors.oldPassword }}</div>
  </div>
  <div class="mb-2">
    <label for="password" class="form-label">
      <span v-if="edit">Nouveau mot de passe</span>
      <span v-else>Mot de passe</span>
    </label>
    <Field name="password" v-slot="{ handleChange, value }">
      <el-input
        id="password"
        :model-value="value"
        @update:model-value="handleChange"
        :class="{ 'is-invalid': props.errors.password }"
        type="password"
        show-password
      />
    </Field>
    <div class="invalid-feedback" v-if="errors.password">{{ props.errors.password }}</div>
  </div>
  <div class="mb-2">
    <label for="password_confirmation" class="form-label">Confirmation de mot de passe</label>
    <Field name="password_confirmation" v-slot="{ handleChange, value }">
      <el-input
        id="password_confirmation"
        :model-value="value"
        @update:model-value="handleChange"
        :class="{ 'is-invalid': props.errors.password_confirmation }"
        type="password_confirmation"
        show-password
      />
    </Field>
    <div class="invalid-feedback" v-if="errors.password_confirmation">
      {{ props.errors.password_confirmation }}
    </div>
  </div>
  <div class="mb-2">
    <label for="roles" class="form-label">Roles</label>
    <Field name="roles" v-slot="{ value, handleChange }">
      <el-select
        id="roles"
        :model-value="value"
        multiple
        :multiple-limit="limit"
        @update:model-value="handleChange"
        style="width: 100%"
        clearable
        :class="{ 'is-invalid': props.errors.roles }"
        @change="onSelected()"
      >
        <el-option
          v-for="(item, key) in Object.values(rolesNames)"
          :key="key"
          :label="item"
          :value="item"
          :disabled="item === rolesNames.admin && adminOptionDisabled"
        />
      </el-select>
      <div class="invalid-feedback" v-if="errors.roles">
        {{ props.errors.roles }}
      </div>
    </Field>
  </div>
</template>

<style scoped></style>
