const API_URL = "http://localhost:3001/api/vgm";

export const menuApi = {
  getMenu: async () => {
    const res = await fetch(`${API_URL}/menu`);
    if (!res.ok) {
      throw new Error("Không thể tải menu");
    }
    return await res.json();
  },
};
