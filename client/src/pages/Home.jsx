import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import styled from 'styled-components'
import DisplayHome from '../components/DisplayHome'
import EditHome from '../components/EditHome'
import GroupChat from '../components/GroupChat'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { MdGroup } from 'react-icons/md'
import { MdExitToApp } from 'react-icons/md'
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'

const Home = () => {
  const { user: userinfo, dispatch } = useAuthContext()
  const user = userinfo.user
  const [displayedScreen, setDisplayedScreen] = useState("display")
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(user?.avatar)
  const [showMenu, setShowMenu] = useState(false)

  const fetchLogout = () => {
    try {
      fetch(`/api/auth/logout`, {
        headers: {
          'api-key': process.env.REACT_APP_API_KEY
        },
      });
      console.log("logout")
      // console.clear()
    } catch (error) {
      // console.clear()
    }
  }

  useEffect(() => {
    setShowMenu(false)
  }, [displayedScreen])

  return (
    <HomeContainer>
      <header>
        <a href="#" aria-label="devchallenges"><img src="/devchallenges.svg" alt="" /></a>
        <button className='menu-btn' onClick={() => setShowMenu(!showMenu)}>
          <img src={user?.avatar || "/mock-avatar.png"} alt="" className="avatar" />
          <p className='menu-p'>{user.name}</p>
          {showMenu ?
            <IoMdArrowDropup className='menu-icon' size={18} /> :
            <IoMdArrowDropdown className='menu-icon' size={18}/>
          }
        </button>
        {showMenu && (
          <div className='menu-container'>

            <nav className='pages-container'>
              <ul>
                <li><button aria-labelledby='profile' className={displayedScreen !== 'group' ? 'page-btn btn-bg' : 'page-btn'} onClick={() => displayedScreen === 'group' ?
                  setDisplayedScreen('display') : null
                }>
                  <IoPersonCircleSharp className='person-icon' size={22} />
                  <p id='profile'>My Profile</p>
                </button></li>

                <li><button aria-labelledby='group' className={displayedScreen === 'group' ? 'page-btn btn-bg' : 'page-btn'} onClick={() => displayedScreen !== 'group' ?
                  setDisplayedScreen('group') : null
                }>
                  <MdGroup className='group-icon' size={22} />
                  <p id='group'>Group Chat</p>
                </button></li>
              </ul>
            </nav>

            <div className='logout'>
              <button className='logout-btn' aria-labelledby='logout' onClick={() => {
                fetchLogout()
                dispatch({ type: 'LOGOUT' })
              }} >
                <MdExitToApp className='exit-icon' size={22} />
                <p id='logout'>Logout</p>
              </button>
            </div>

          </div>
        )}
      </header>

      {!loading ? displayedScreen === "display"
        ? <DisplayHome setDisplayedScreen={setDisplayedScreen} /> :
        displayedScreen === "edit"
          ? <EditHome setDisplayedScreen={setDisplayedScreen} setLoading={setLoading} setImageUrl={setImageUrl} imageUrl={imageUrl} /> :
          displayedScreen === "group"
            ? <GroupChat setDisplayedScreen={setDisplayedScreen} /> :
            <DisplayHome imageUrl={imageUrl} /> : <div>loading...</div>}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
width: 90%;
max-width: 1280px;

header{
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .menu-btn{
    border: none;
    border-radius: 8px;
    background: none;
    overflow: hidden;

    .menu-p {
      display: none;
    }

    .menu-icon {
      display: none;
    }

  }

  .avatar{
    display: block;
    width: 36px;
    height: 36px;
  }
}

.menu-container {
  position: absolute;
  right: 0;
  top: calc(100% + 23px);
  border: 1px solid #E0E0E0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  background: white;
  padding: 15px 12px;
  z-index: 2;

  li {
    list-style: none;
  }

  button {
    background: none;
    border: none;
    min-width: 164px;
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    font-family: 'Noto Sans';
    font-weight: 500;
    font-size: 12px;

    p {
      margin-left: 12px;
    }
  }

  .btn-bg {
    background-color:#F2F2F2;
  }
}

.pages-container {
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 10px;

  .page-btn {
    color: #4F4F4F;
  }
}

.logout-btn {
  color: #EB5757;
  margin-top: 10px;
}

@media screen and (min-width: 720px){
  header {
    .menu-btn {
    display: flex;
    align-items: center;

    img {
      border-radius: 8px;
    }

    .menu-p {
    display: block;
    margin-left: 11px;
    color: #333333;
    font-weight: 700;
    font-size: 12px;
    font-family: 'Noto Sans';
  }

  .menu-icon {
    display: block;
    margin-left: 12px;
  }
  }
  }
}
`

export default Home