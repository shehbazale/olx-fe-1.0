interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

export const productAdd = async (product: Product) => {
  const { title, description, price, imageUrl } = product;

  const response = await fetch("http://localhost:3001/products/addProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, price, imageUrl }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    console.error("Product insert message", errorData);
    throw new Error(errorData.message || "Failed to add product");
  }
  const data = response.json();
  return data;
};
