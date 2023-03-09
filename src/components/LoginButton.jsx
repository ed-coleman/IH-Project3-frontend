import React from 'react'
import { SessionContext } from '../Contexts/SessionContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'


export default function LoginButton() {

  const { token, setToken, isAuthenticated} = useContext(SessionContext)

  const logOutUser = () => {
    setToken = false
    console.log('User logged out, token was deleted/ Token: ', token)
  }

  if (token) {
    return (
      <Link to={token ? '/' : '/login'}>
      <button  onClick={logOutUser} type=" button">{token ? 'Log Out' : 'Login'}</button>
      </Link>
      

    )
  } else {


  return (

    <Link to='/signUp'>
    <button  type=" button">Sign Up</button>
    </Link>
   
  )
  }
}




      