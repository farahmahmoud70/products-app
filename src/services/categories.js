import axios from "axios";


const categoriesEndPoint = "http://localhost:3000/category";

export async function GetAllCategories() {
  const {
    data
  } = await axios.get(categoriesEndPoint);
  return data;
}