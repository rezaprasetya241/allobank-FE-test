import apiClient from "@/plugins/axios";
import type { Rocket, SearchResponse } from "./rocketApiType";

export const api = {
  rockets: {
    getAll: () => apiClient.get<Rocket[]>("/rockets"),
    search: (name: string) =>
      apiClient.post<SearchResponse>("/rockets/query", {
        data: {
          query: {
            $text: {
              $search: name,
            },
          },
        },
      }),
    getById: (id: string) => apiClient.get<Rocket>(`/rockets/${id}`),
    // i set any because i dont know the type of the payload create rocket
    // cause i dont find the type on the docs, also i dont get the key of the api
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createRocket: (rocket: any) => apiClient.post("/payloads", rocket),
  },
};
