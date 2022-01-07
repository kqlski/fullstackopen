import axios from 'axios'
const baseUrl = '/api/blogs'

let token =''

const setToken=(newtoken)=>{
  token=`bearer ${newtoken}`
}
const createBlog =(newBlog)=>{
  const config ={
    headers:{Authorization:token}
  }
  console.log(config)
  const request = axios.post(baseUrl,newBlog,config)
  return request.then(response=>response.data)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll ,setToken,createBlog}