import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.response.use((res) => {
  return res.data; //拦截器
});
//轮播图
export let getSilders = () => {
  return axios.get("/getSilders");
};
//热门图书
export let getHotBook = () => {
  return axios.get("/hot");
};
//所有图书
export let getBooks = () => {
  return axios.get('/book');
}
//删除
export let removeBook = id => {
  return axios.delete(`/book?id=${id}`);
}
//详情
export let findBook = id => {
  return axios.get(`/book?id=${id}`);
}
//修改
export let updateBook = (id,data) =>{
  return axios.put(`/book?id=${id}`,data);
}
//添加
export let addBook = (data) => {
  return axios.post('/book',data);
}

