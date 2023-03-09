import React from 'react'
import { SessionContext } from '../Contexts/SessionContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'


export default function LoginButton() {

  const { token, setToken, isAuthenticated} = useContext(SessionContext)

  const logOutUser = () => {
    setToken(null)
    console.log('User logged out, token was deleted/ Token: ', token)
  }

  if (token) {
    return (
      <Link to={token ? '/' : '/login'}>
      <button  style={{float: 'right'}} onClick={logOutUser} type=" button">{token === null ? 'Log In' : 'Log Out'}</button>
      </Link>
      

    )
  } else {


  return (

    <Link to='/signUp'>
    <button style={{float: 'right'}} type=" button">Sign Up</button>
    </Link>
   
  )
  }
}




      