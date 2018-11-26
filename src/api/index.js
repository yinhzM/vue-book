import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.response.use((res) => {
  return res.data; //拦截器
});
export let getSilders = () => {
  return axios.get("/getSilders");
};

export let getHotBook = () => {
  return axios.get("/hot");
};
