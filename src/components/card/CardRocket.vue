<template>
  <v-card class="pa-3 rounded-lg" v-if="isLoading">
    <v-skeleton-loader
      type="image"
      height="200"
      class="rounded-lg"
    ></v-skeleton-loader>
    <div class="mt-4">
      <v-skeleton-loader type="text" class="mb-2"></v-skeleton-loader>
      <v-skeleton-loader type="text" class="mb-2"></v-skeleton-loader>
      <v-skeleton-loader type="text"></v-skeleton-loader>
    </div>
  </v-card>
  <v-card
    class="pa-3 card-column-customer-card rounded-lg"
    v-else
    :to="'rocket/' + item.id"
  >
    <v-img
      :src="item.flickr_images[0]"
      height="200"
      aspect-ratio="16/9"
      cover
      width="100%"
      class="rounded-lg"
      error-src="./lazy-loader.svg"
    >
    </v-img>
    <div class="mt-4">
      <p>Name: {{ item.name }}</p>
      <p>Type: {{ item.type }}</p>
      <p class="description">Type: {{ item.description }}</p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { Rocket } from "../../api/users/userApiType";
import { PropType, defineProps } from "vue";
defineProps({
  item: {
    type: Object as PropType<Rocket>,
    required: true,
  },
  isLoading: {
    type: Boolean,
  },
});
</script>
<style scoped>
.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>
../../api/rockets/userApiType
