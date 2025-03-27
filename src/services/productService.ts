import { API } from "@/services/api";

export async function fetchProducts() {
  return API.get("/products");
}
