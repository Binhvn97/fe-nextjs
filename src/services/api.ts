import ENV from "@/config/env";

export const API = {
  // POST method
  post: async <T>(
    url: string,
    body?: unknown,
    headers: Record<string, string> = {}
  ) => {
    try {
      const response = await fetch(`${ENV.BASE_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  },

  // GET method
  get: async <T>(url: string, headers: Record<string, string> = {}) => {
    try {
      const response = await fetch(`${ENV.BASE_URL}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("API GET Error:", error);
      throw error;
    }
  },

  // PUT method
  put: async <T>(
    url: string,
    body?: unknown,
    headers: Record<string, string> = {}
  ) => {
    try {
      const response = await fetch(`${ENV.BASE_URL}${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("API PUT Error:", error);
      throw error;
    }
  },
};
