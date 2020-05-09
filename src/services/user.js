import axios from "axios";


const userEndPoint = "http://localhost:3000/user";

export async function UserRegister(newUser) {
    const registerEndPoint = `${userEndPoint}/register`;
    const {
        data
    } = await axios.post(registerEndPoint, newUser);
    return data;
}

export async function UserLogin(currentUser) {
    const loginEndPoint = `${userEndPoint}/login`;
    const {
        data
    } = await axios.post(loginEndPoint, currentUser)
    console.log("here it is", data)
    const {
        token,
        user
    } = data;
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = token;
    return data;
}