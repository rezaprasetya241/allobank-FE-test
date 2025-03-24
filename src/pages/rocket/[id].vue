<template>
  <v-container fluid>
    <v-responsive class="align-center fill-height mx-auto pt-5" max-width="900">
      <h1>Details Rocket</h1>
      <router-link to="/" class="text-h6 text-decoration-none mb-4 d-block">
        <v-icon>mdi-arrow-left</v-icon>
        Back to home
      </router-link>
      <template v-if="!rocketStore.isLoading && rocketStore.error">
        <v-alert type="error" dismissible>
          <div class="d-flex justify-space-between">
            <p>Failed get data</p>
            <v-btn
              size="x-small"
              icon
              @click="
                rocketStore.fetchDetailsRockets(route.params.id as string)
              "
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>
        </v-alert>
      </template>
      <template v-else-if="rocketStore.isLoading && rocketStore.error">
        <v-card class="pa-4 rounded-lg">
          <v-card-title>
            <v-skeleton-loader type="text" width="200"></v-skeleton-loader>
          </v-card-title>
          <v-row>
            <v-col v-for="n in 3" :key="n">
              <v-skeleton-loader
                type="image"
                height="200"
                class="rounded-lg"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-card-text>
            <v-skeleton-loader
              type="text"
              class="mb-2"
              v-for="n in 4"
              :key="n"
            ></v-skeleton-loader>
          </v-card-text>
        </v-card>
      </template>

      <v-card v-else class="pa-4 rounded-lg">
        <v-card-title>
          <h2>{{ rocket.name }}</h2>
        </v-card-title>
        <v-row>
          <v-col v-for="image in rocket.flickr_images" :key="image">
            <v-img
              :src="image"
              height="200"
              aspect-ratio="16/9"
              cover
              width="100%"
              class="rounded-lg"
              error-src="./lazy-loader.svg"
            >
            </v-img>
          </v-col>
        </v-row>

        <v-card-text>
          <p>Cost: {{ formatIDR(rocket.cost_per_launch) }}</p>
          <p>Country: {{ rocket.country }}</p>
          <p>First flight: {{ rocket.first_flight }}</p>
          <p>{{ rocket.description }}</p>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import { useRocketsStore } from "../../store/rockets";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { formatIDR } from "../../utils/currency";

const rocketStore = useRocketsStore();
const route = useRoute();
//
onMounted(async () => {
  await rocketStore.fetchDetailsRockets(route.params.id as string);
});

const rocket = computed(() => rocketStore.getDetailsRocket);
</script>
