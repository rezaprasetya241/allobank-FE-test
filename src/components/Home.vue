<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height mx-auto pt-5" max-width="900">
      <div class="d-flex align-center gap-4 justify-space-between">
        <SearchField
          :value="searchQuery"
          placeholder="Search Rockets..."
          :debounceTime="300"
          width="500"
        />
        <div>
          <CreateRocket />
        </div>
      </div>
      <v-row no-gutters>
        <v-col
          v-for="(item, index) in rocketStore.isLoading
            ? Array(6).fill({})
            : filteredRockets"
          :key="rocketStore.isLoading ? index : item.id"
          cols="4"
          class="pa-2"
        >
          <CardRocket :item="item" :isLoading="rocketStore.isLoading" />
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { useRocketsStore } from "../store/rockets";
import { onMounted, ref, computed, watch } from "vue";
import type { Rocket } from "../api/users/userApiType";
import CreateRocket from "./form/CreateRocket.vue";

const rocketStore = useRocketsStore();
const searchQuery = ref("");

onMounted(async () => {
  await rocketStore.fetchRockets();
});
watch(searchQuery, async (newValue) => {
  if (newValue) {
    await rocketStore.fetchSearchRockets(newValue);
  } else {
    await rocketStore.fetchRockets();
  }
});

const filteredRockets = computed(() => {
  return rocketStore.isLoading
    ? Array(6).fill({})
    : (rocketStore.rockets as Rocket[]);
});
</script>
../api/rockets/userApiType
