const API_URL = "http://localhost:3001/products";
export const productDelete = async (id: string) => {
  const response = await fetch(`${API_URL}/deleteProduct/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  const data = response.json();
  return data;
};
