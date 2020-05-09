import axios from "axios";

const productsEndPoint = "http://localhost:3000/products";
let headers = {
  authorization: localStorage.getItem("jwtToken")
};

export async function GetAll() {
  const {
    data
  } = await axios.get(productsEndPoint);
  return data;
}

export async function GetCurrent(currentCategory, searchKeyword, page, currentSortValue) {
  const currentProductsEndPoint = `${productsEndPoint}?categoryKey=${currentCategory}&searchKey=${searchKeyword.toLowerCase()}&page=${page}&sortKey=${currentSortValue}`
  const {
    data
  } = await axios.get(currentProductsEndPoint);
  return data;
}


export async function GetById(id) {
  const productIdEndPoint = `${productsEndPoint}/${id}`;
  const {
    data
  } = await axios.get(productIdEndPoint);
  return data;
}

export async function Add(newProduct) {
  const {
    data
  } = await axios.post(productsEndPoint, newProduct, {
    headers: headers
  });
  return data;
}

export async function Update(id, updatedProduct) {
  const editedProductEndPoint = `${productsEndPoint}/${id}`;
  let {
    data
  } = await axios.patch(editedProductEndPoint, updatedProduct, {
    headers: headers
  });
  return data;
}
export async function Delete(id) {
  const deleteProductEndPoint = `${productsEndPoint}/${id}`;
  await axios.delete(deleteProductEndPoint, {
    headers: headers
  });
}