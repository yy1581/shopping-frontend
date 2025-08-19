//.env 파일에 BACKEND_URL을 정의
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getProducts({
  order = "newest",
  offset = 0,
  limit = 6,
  search = "",
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}&search=${search}`;
  const response = await fetch(`${BACKEND_URL}/products?${query}`);
  if (!response.ok) {
    throw new Error("상품을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getProduct(id) {
  const response = await fetch(`${BACKEND_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("상품을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function createProduct(productData) {
  const response = await fetch(`${BACKEND_URL}/products`, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("상품을 생성하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function updateProduct(id, productData) {
  const { name, description, price, stock, category } = productData;
  const updatedData = { name, description, price, stock, category };
  const response = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("상품을 수정하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function deleteProduct(id) {
  const response = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("상품을 삭제하는데 실패했습니다.");
  }
}
