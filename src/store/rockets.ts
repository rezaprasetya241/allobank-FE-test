import { api } from "@/api/rockets/rocketApi";
import type { Rocket } from "@/api/rockets/rocketApiType";
import { defineStore } from "pinia";

export const useRocketsStore = defineStore("rockets", {
  state: () => ({
    rockets: [] as Rocket[],
    rocketDetails: {} as Rocket,
    isLoading: false,
    error: null as unknown | null,
  }),
  getters: {
    getRockets: (state) => state.rockets,
    getDetailsRocket: (state) => state.rocketDetails,
  },

  actions: {
    async fetchRockets() {
      try {
        this.isLoading = true;
        const { data } = await api.rockets.getAll();
        this.rockets = data;
        this.error = null;
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchSearchRockets(name: string) {
      try {
        this.isLoading = true;
        const { data } = await api.rockets.search(name);
        this.rockets = data?.docs ?? [];
        this.error = null;
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchDetailsRockets(id: string) {
      try {
        this.isLoading = true;
        const { data } = await api.rockets.getById(id);
        this.rocketDetails = data;
        this.error = null;
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async postCreateRocket(rocket: any) {
      try {
        this.isLoading = true;
        this.fetchRockets();
        await api.rockets.createRocket(rocket);
        this.error = null;
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
