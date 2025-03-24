<template>
  <v-container class="fill-height">
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Add Rocket"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default>
        <v-card title="Create Rocket Form">
          <v-sheet class="pa-4 w-100" width="300">
            <v-form @submit.prevent="handleSubmit" ref="form">
              <v-text-field
                v-model="formData.name"
                label="First name"
                :rules="[(v) => !!v || 'Name is required']"
              ></v-text-field>
              <v-text-field
                v-model="formData.cost"
                label="Cost"
                type="number"
                :rules="[(v) => !!v || 'Cost is required']"
              ></v-text-field>
              <v-text-field
                v-model="formData.country"
                label="Country"
                :rules="[(v) => !!v || 'Country is required']"
              ></v-text-field>
              <v-text-field
                v-model="formData.firstFlight"
                label="First Flight"
                type="date"
                :rules="[(v) => !!v || 'First flight date is required']"
              ></v-text-field>
              <v-text-field
                v-model="formData.description"
                label="Description"
                :rules="[(v) => !!v || 'Description is required']"
              ></v-text-field>
              <v-btn
                class="mt-2"
                type="submit"
                block
                :loading="rocketStore.isLoading"
                >Submit</v-btn
              >
            </v-form>
          </v-sheet>
        </v-card>
      </template>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRocketsStore } from "../../store/rockets";

const rocketStore = useRocketsStore();
const form = ref();
const formData = reactive({
  name: "",
  cost: "",
  country: "",
  firstFlight: "",
  description: "",
});
const loading = ref(false);

const handleSubmit = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    loading.value = true;
    try {
      await rocketStore.postCreateRocket({
        name: formData.name,
        cost_per_launch: Number(formData.cost),
        country: formData.country,
        first_flight: formData.firstFlight,
        description: formData.description,
      });
      form.value.reset();
    } catch (error) {
      console.error("Failed to create rocket:", error);
    } finally {
      loading.value = false;
    }
  }
};
</script>
