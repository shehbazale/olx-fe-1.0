
const API_URL = "http://localhost:3001/products"; 
interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
}
export const UpdateProduct = async (_id: string, updatedProduct: Product) => {
  const response = await fetch(`${API_URL}/editProduct/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return await response.json();
};


