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
