const API_URL = "http://localhost:3001/api/vgm";

export const shopApi = {
  getShop: async () => {
    const res = await fetch(`${API_URL}/shops`);
    if (!res.ok) {
      throw new Error("Failed to fetch shop data");
    }
    return await res.json();
  },
};
