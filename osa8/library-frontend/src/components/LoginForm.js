import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN, USER } from "../queries"

const LoginForm = ({ show,setToken,setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, res] = useMutation(LOGIN, {
    refetchQueries:[{query:USER}]
  })

  useEffect(()=>{
    if(res.data){
      const token = res.data.login.value
      setToken(token)
      localStorage.setItem('bloglist-user-token',token)
      setUsername('')
      setPassword('')
      setPage('authors')
    }
  },[res.data]) //eslint-disable-line
  const submit = async (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  if(!show) return null
  return <div>
    <form onSubmit={submit}>
    <div>
      username <input type="text" value={username} onChange={({target})=>setUsername(target.value)} />
    </div>
    <div>
      password <input type="password" value={password} onChange={({target})=>setPassword(target.value)} />
    </div>
    <button type="submit">login</button>
    </form>
  </div>
}
export default LoginForm