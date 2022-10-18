import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import styled from 'styled-components'
import { vars } from '../styles/Global'

const Redirect = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null)

  const fetchUser = async () => {
    setError(null)

    try {
      const res = await fetch(`/api/login`, {
        headers: {
          'api-key': process.env.REACT_APP_API_KEY
        },
      });
      const data = await res.json();

      console.log(data)
      // save user to local storage
      localStorage.setItem('user', JSON.stringify(data))
      // update auth context
      dispatch({ type: 'LOGIN', payload: data })

      // console.clear()
    } catch (error) {
      // console.clear()
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (!error) {
    return (
      <LoadingEffect />
    )
  }
  else {
    return <Navigate to="/login" />
  }
}

const LoadingEffect = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: auto;
  border: 20px solid #EAF0F6;
  border-radius: 50%;
  border-top: 20px solid ${vars.blue};
  border-left: 20px solid ${vars.blue};
  width: 100px;
  height: 100px;
  animation: spinner .75s linear infinite;
@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default Redirect