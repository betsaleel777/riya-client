<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Field } from "vee-validate";
import { useTypePersonneStore } from "~/store/personne";
import { Client } from "~/types/personne";
interface Countrie {
  name: string;
  code: string;
}
interface Result {
  COMMUNE: string;
  _score: null | number;
}
interface Villes {
  total: number;
  next: string;
  results: Result[];
}
const props = defineProps<{
  errors: any;
  client?: Client;
}>();
let loading = ref(true);
let villes = ref<Result[] | undefined>([]);
let pays = ref<Countrie[] | null>([]);
let dialog = ref(false);
let urlPiece = ref("");
let urlAvatar = ref("");
const { types } = storeToRefs(useTypePersonneStore());
onMounted(async () => {
  const { data: countries } = await useFetch<Countrie[]>("/json/countries.json");
  const { data: towns } = await useFetch<Villes>(
    "https://data.gouv.ci/data-fair/api/v1/datasets/liste-des-circonscriptions-administratives-et-des-communes/lines?select=COMMUNE&size=252"
  );
  pays = countries;
  villes.value = towns.value?.results.filter((town) => town.COMMUNE);
  const { getAll } = useTypePersonneStore();
  await getAll();
  urlPiece.value = props.client?.piece!;
  urlAvatar.value = props.client?.avatar!;
  loading.value = false;
});

const piece = ref();
const avatar = ref();
const onInput = (type: string) => {
  if (type === "piece") {
    const [file] = piece.value.files;
    if (file) urlPiece.value = URL.createObjectURL(file);
  } else {
    const [file] = avatar.value.files;
    if (file) urlAvatar.value = URL.createObjectURL(file);
  }
};
</script>

<template>
  <div class="row" v-loading="loading">
    <Field name="id" hidden />
    <div class="col-6">
      <div class="block">
        <el-avatar shape="square" :size="75" :src="urlPiece" />
      </div>
      <Field name="image_piece" v-slot="{ handleChange, handleBlur }">
        <label for="formFile1" class="form-label">Image de la pièce</label>
        <input
          ref="piece"
          class="form-control"
          type="file"
          id="formFile1"
          @input="onInput('piece')"
          @change="handleChange($event, true)"
          @blur="handleBlur"
          :class="{ 'is-invalid': errors.image_piece }"
        />
        <div class="invalid-feedback" v-if="errors.image_piece">
          {{ errors.image_piece }}
        </div>
      </Field>
    </div>
    <div class="col-6">
      <div class="block">
        <el-avatar shape="square" :size="75" :src="urlAvatar" />
      </div>
      <Field name="image_avatar" v-slot="{ handleChange, handleBlur }">
        <label for="formFile2" class="form-label">Avatar du client</label>
        <input
          ref="avatar"
          class="form-control"
          type="file"
          id="formFile2"
          @input="onInput('avatar')"
          @change="handleChange($event, true)"
          @blur="handleBlur"
          :class="{ 'is-invalid': errors.image_avatar }"
        />
        <div class="invalid-feedback" v-if="errors.image_avatar">
          {{ errors.image_avatar }}
        </div>
      </Field>
    </div>
    <div class="col-12 mt-4">
      <div class="mb-2">
        <label for="nom" class="form-label">Nom complet</label>
        <Field name="nom_complet" v-slot="{ handleChange, value }">
          <el-input
            id="nom"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.nom_complet }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.nom_complet">
          {{ props.errors.nom_complet }}
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="mb-2">
        <label for="telephone" class="form-label">Téléphone</label>
        <Field name="telephone" v-slot="{ handleChange, value }">
          <el-input
            id="telephone"
            :model-value="value"
            @update:model-value="handleChange"
            v-maska
            data-maska="+225 ##########"
            :class="{ 'is-invalid': props.errors.telephone }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.telephone">{{ props.errors.telephone }}</div>
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
      <div class="mb-2">
        <label for="cni" class="form-label">Numéro de CNI</label>
        <Field name="cni" v-slot="{ handleChange, value }">
          <el-input
            id="cni"
            :model-value="value"
            @update:model-value="handleChange"
            v-maska
            data-maska="CI#########"
            :class="{ 'is-invalid': props.errors.cni }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.cni">{{ props.errors.cni }}</div>
      </div>
      <div class="mb-2">
        <label for="nationalite" class="form-label">Nationalité</label>
        <Field name="nationalite" v-slot="{ handleChange, value }">
          <el-input
            id="nationalite"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.nationalite }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.nationalite">
          {{ props.errors.nationalite }}
        </div>
      </div>
      <div class="mb-2">
        <label for="lieu_naissance" class="form-label">Lieu de Naissance</label>
        <Field name="lieu_naissance" v-slot="{ handleChange, value }">
          <el-input
            id="lieu_naissance"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.lieu_naissance }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.lieu_naissance">
          {{ props.errors.lieu_naissance }}
        </div>
      </div>
      <div class="mb-2">
        <label for="type_client" class="form-label">Type de client</label>
        <Field name="type_client_id" v-slot="{ value, handleChange }">
          <el-row :gutter="5">
            <el-col :span="20">
              <el-select
                id="type_client"
                filterable
                :model-value="value"
                @update:model-value="handleChange"
              >
                <template #append><i class="bx bx-plus" /></template>
                <el-option
                  v-for="(item, key) in types"
                  :key="key"
                  :label="item.nom"
                  :value="item.id!"
                />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-tooltip content="Créer un type" placement="bottom">
                <el-button @click="dialog = true" plain><i class="bx bx-plus" /></el-button>
              </el-tooltip>
              <PersonneTypeCreateModal v-model="dialog" />
            </el-col>
          </el-row>
        </Field>
      </div>
      <div class="mb-2">
        <Field name="civilite" v-slot="{ handleChange, value }">
          <el-radio-group
            id="civilite"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.civilite }"
            class="ml-4"
          >
            <el-radio label="Msr" size="large">Homme</el-radio>
            <el-radio label="Mme" size="large">Femme</el-radio>
          </el-radio-group>
        </Field>
        <div class="invalid-feedback" v-if="errors.civilite">
          {{ props.errors.civilite }}
        </div>
      </div>
    </div>
    <div class="col-6">
      <div class="mb-2">
        <label for="pays" class="form-label">Pays de résidence</label>
        <Field name="pays" v-slot="{ value, handleChange }">
          <el-select
            id="pays"
            filterable
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.pays }"
          >
            <el-option
              v-for="(item, key) in pays"
              :key="key"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </Field>
        <div class="invalid-feedback" v-if="errors.pays">{{ props.errors.pays }}</div>
      </div>
      <div class="mb-2">
        <label for="ville" class="form-label">Commune</label>
        <Field name="ville" v-slot="{ value, handleChange }">
          <el-select
            id="ville"
            filterable
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.fonctions }"
          >
            <el-option
              v-for="(item, key) in villes"
              :key="key"
              :label="item.COMMUNE"
              :value="item.COMMUNE"
            />
          </el-select>
        </Field>
        <div class="invalid-feedback" v-if="errors.ville">{{ props.errors.ville }}</div>
      </div>
      <div class="mb-2">
        <label for="quartier" class="form-label">Quartier</label>
        <Field name="quartier" v-slot="{ value, handleChange }">
          <el-input
            id="quartier"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.quartier }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.quartier">{{ props.errors.quartier }}</div>
      </div>
      <div class="mb-2">
        <label for="fonctions" class="form-label">Métier</label>
        <Field name="fonctions" v-slot="{ value, handleChange }">
          <el-input
            id="fonctions"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.fonctions }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.fonctions">
          {{ props.errors.fonctions }}
        </div>
      </div>
      <div class="mb-2">
        <label for="date_naissance" class="form-label">Date de Naissance</label>
        <Field name="date_naissance" v-slot="{ value, handleChange }">
          <el-date-picker
            :model-value="value"
            @update:modelValue="handleChange"
            id="date_naissance"
            type="date"
            format="DD-MM-YYYY"
            value-format="YYYY-MM-DD"
            :class="{ 'is-invalid': props.errors.date_naissance }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.date_naissance">
          {{ props.errors.date_naissance }}
        </div>
      </div>
      <div class="mb-2">
        <label for="animal" class="form-label">Animal de compagnie</label>
        <Field name="animal" v-slot="{ value, handleChange }">
          <el-input
            id="animal"
            :model-value="value"
            @update:model-value="handleChange"
            :class="{ 'is-invalid': props.errors.animal }"
          />
        </Field>
        <div class="invalid-feedback" v-if="errors.animal">{{ props.errors.animal }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
