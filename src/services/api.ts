export const API = {
    post: async <T>(url: string, body?: unknown, headers: Record<string, string> = {}) => {
      try {
        const response = await fetch(url, {
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
  };