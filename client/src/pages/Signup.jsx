import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import styled from 'styled-components'
import { vars } from '../styles/Global'
import { IoMail } from 'react-icons/io5'
import { IoMdLock } from 'react-icons/io'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const submitHandler = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)

    const res = await fetch(`/api/signup`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'api-key': process.env.REACT_APP_API_KEY
      },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()

    if (!res.ok) {
      setIsLoading(false)
      setError(data.error)
    }
    else {
      // save user to local storage
      localStorage.setItem('user', JSON.stringify(data))
      // update auth context
      dispatch({ type: 'LOGIN', payload: data })

      setIsLoading(false)
    }
  }

  return (
    <SignupContainer>
      <a href="#" aria-label="devchallenges"><img src="/devchallenges.svg" alt="" /></a>

      <h1>Join thousands of learners from around the world</h1>
      <h2>Master web development by making real-life projects. These are multiple paths ofr you to cohose</h2>

      <form onSubmit={submitHandler}>

        <div className='input-holder'>
          <IoMail className='mail-icon' size={26} />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            aria-label="email" />
        </div>

        <div className='input-holder'>
          <IoMdLock className='mail-icon' size={27} />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Pasword"
            aria-label="password" />
        </div>

        {isLoading ?
          <Loading /> :
          <button disabled={isLoading} className='submit-btn' type="submit">Start coding now</button>}
        {error && <div className='error'>{error}</div>}
      </form>

      <p>or continue with these social profile</p>

      <div className='socials-container'>
        <a href="https://devc-authentication-app-api.onrender.com/api/auth/google/redirect" aria-label="google"><img src="/Google.svg" alt="" /></a>
        <a href="https://devc-authentication-app-api.onrender.com/api/auth/github/redirect" aria-label="google"><img src="/Gihub.svg" alt="" /></a>
      </div>

      <p>Don't have an account yet?<Link to="/login" className='link' >Login</Link></p>
    </SignupContainer>
  )
}

const SignupContainer = styled.main`
width: 90%;
max-width: 474px;
margin: 18px 0 30px 0;

h1 {
  margin-top: 27px;
  font-size: 18px;
  font-weight: 600;
  color: ${vars.darkGrey};
}

h2{
  font-size: 16px;
  font-weight: 400;
  color: ${vars.darkGrey};
  margin-top: 14px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 14.5px;
  width: 100%;
  margin-top: 34px;
  position: relative;
}

.input-holder {
  display: flex;
  align-items: center;
  border: 1px solid ${vars.borderGrey};
  border-radius: 8px;
  padding: 13.6px 14px; 

  .mail-icon {
    color: ${vars.lightGrey};
    margin: -15px 0;
  }

  input {
    border: none;
    outline: none;
    color: ${vars.darkGrey};
    margin-left: 13px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
  }
}

.submit-btn {
  margin-top: 8px;
  border: none;
  background-color: ${vars.blue};
  border-radius: 8px;
  color: White;
  font-weight: 600;
  font-size: 16px;
  font-family: 'Noto Sans';
  padding: 8px;
}

.error {
  position: absolute;
  top: Calc(100% + 5px);
  color: #c73522;
}

p {
  margin-top: 32px;
  text-align: center;
  color: ${vars.lightGrey};
  font-size: 14px;
  font-weight: 400;
}

.socials-container {
  display: flex;
  justify-content: center;
  margin-top: 23px;
  gap: 20px;

  button {
    border: none;
    background: none;
  }
}

.link {
  color: ${vars.lightBlue};
  margin-left: 2px;
  text-decoration: none;
}

//DEKSTOP
@media screen and (min-width: 720px) {
  border: 1px solid #BDBDBD;
  border-radius: 24px;
  padding: 50px 58px 58px 58px;
  margin: 0;
  align-self: center;
}
`

export default Signup