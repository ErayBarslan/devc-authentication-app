import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import styled from 'styled-components'
import { vars } from '../styles/Global'

const DisplayHome = ({ setDisplayedScreen }) => {
  const { user: userinfo } = useContext(AuthContext)
  const user = userinfo?.user

  return (
    <DisplayContainer>
      <h1>Personal info</h1>
      <p className="info-p">Basic info, like your name and photo</p>

      <div className="profile-container">

        <div className="profile-header">
          <div className="text-holder">
            <h2>Profile</h2>
            <p>Some info may be visible to other people</p>
          </div>
          <button className="edit-btn" onClick={() => setDisplayedScreen("edit")}>Edit</button>
        </div>

        <div className="info-holder with-img">
          <p className="left-p">photo</p>
          <img src={user?.avatar || "/mock-avatar.png"} alt="user avatar" />
        </div>

        <div className="info-holder">
          <p className="left-p">name</p>
          <p className="right-p">{user?.name}</p>
        </div>

        <div className="info-holder">
          <p className="left-p">bio</p>
          <p className="right-p">{user?.bio}</p>
        </div>

        <div className="info-holder">
          <p className="left-p">email</p>
          <p className="right-p email">{user?.email}</p>
        </div>

        {user.password && (
          <div className="info-holder with-password">
            <p className="left-p">password</p>
            <p className="right-p">************</p>
          </div>
        )}
      </div>
    </DisplayContainer>
  )
}

const DisplayContainer = styled.main`

h1 {
  margin-top: 28px;
  font-size: 24px;
  font-weight: 400;
  color: black;
  text-align: center;
}

.info-p {
  font-size: 14px;
  font-weight: 300;
  color: black;
  margin-top: 7px;
  text-align: center;
}

.profile-container{
  margin-top: 40px;
}

.profile-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  position: relative;

  .text-holder {
    width: 60%;

    h2 {
      font-weight: 400;
      font-size: 24px;
    }

    p{
      margin-top: 2px;
      font-weight: 500;
      font-size:13px;
      color: ${vars.lightGrey};
    }
  }

  .edit-btn {
    background: none;
    border: 1px solid ${vars.lightGrey};
    color: ${vars.lightGrey};
    font-family: 'Noto Sans';
    font-weight: 500;
    font-size: 16px;
    letter-spacing: -0.035em;
    padding: 8px 33px;
    border-radius: 12px;
  }
}

.info-holder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 31px 0;
  position: relative;

  .left-p {
    text-transform: uppercase;
    font-size: 13px;
    color: ${vars.borderGrey};
    margin-right: 50px;
  }

  img {
    width: 72px;
    height: 72px;
    border-radius: 8px;
  }
  
  .right-p {
    font-size: 16px;
    color: ${vars.darkGrey};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .email {
    font-size: 18px;
  }
}

.with-img {
  padding: 0 0 18px 0;
}

.info-holder::after {
  content: '';
  position: absolute;
  left: -25%;
  top: 100%;
  width: 125vw;
  height: 1px;
  background-color: #E0E0E0;
}

.with-password::after {
  content: '';
  display: none;
}

@media screen and (min-width: 720px){

  .profile-container {
    padding: 28px 49px 0 49px;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    max-width: 846px;
    margin: 40px auto 40px auto;
    overflow: hidden;
  }

  .profile-header::after {
    content: '';
    position: absolute;
    left: -25%;
    top: 100%;
    width: 125vw;
    height: 1px;
    background-color: #E0E0E0;
  }

  .with-img {
  padding: 12px 0;
}

.left-p {
  min-width: 195px;
}

.info-holder {
  justify-content: start;
}
}
`

export default DisplayHome