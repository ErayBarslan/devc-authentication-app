import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FiChevronLeft } from 'react-icons/fi'
import { AiFillCamera } from 'react-icons/ai'
import { vars } from '../styles/Global'
import { useAuthContext } from '../context/AuthContext'

const EditHome = ({ setDisplayedScreen, setLoading, setImageUrl, imageUrl }) => {
  const { user: userinfo, dispatch } = useAuthContext()
  const user = userinfo.user
  const userid = user?._id
  const token = userinfo.token

  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState(user.bio)
  const [phone, setPhone] = useState(user.phone)
  const [name, setName] = useState(user.name)
  const [error, setError] = useState(null)

  const [selectedFile, setSelectedFile] = useState("")
  const submitButton = useRef()

  const fileInputHandler = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setSelectedFile(reader.result)
    }
  }

  useEffect(() => {
    selectedFile && submitButton.current.click()
  }, [selectedFile])

  const uploadImage = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: selectedFile }),
        headers: {
          'content-type': 'application/json',
          'api-key': process.env.REACT_APP_API_KEY,
          'authorization': `Bearer ${token}`
        }
      })
      const data = await res.json()

      setImageUrl(data.url)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    let user;

    if (password) {
      user = { email, bio, phone, name, password, avatar: imageUrl }
    }
    else {
      user = { email, bio, phone, name, avatar: imageUrl }
    }

    if (!email) {
      setError("Email can't be empty")
      setLoading(false)
      return
    }

    const res = await fetch('/api/' + userid, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
    }
    else {
      setError(null)
      setEmail(data.email)
      setBio(data.bio)
      setPhone(data.phone)
      setName(data.name)
      setPassword('')
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({ type: 'LOGIN', payload: data })
      setLoading(false)
      setDisplayedScreen('display')
    }
  }

  return (
    <EditContainer>
      <button className='back-btn' onClick={() => setDisplayedScreen("display")}>
        <FiChevronLeft className='left-icon' size={25} />
        <span>Back</span>
      </button>

      <div className='container'>
        <h1>Change Info</h1>
        <p className='change-p'>Changes will be reflected to every services</p>

        <form onSubmit={uploadImage}>
          <div className='photo-container'>
            <label htmlFor="imgInput" className="change-btn">
              <img src={imageUrl || user.avatar || "mock-avatar.png"} alt="" />
              <AiFillCamera className='camera-icon' size={25} />
            </label>
            <input type="file" name="image" onChange={fileInputHandler} style={{ display: "none" }} id="imgInput" />
            <button type="submit" ref={node => submitButton.current = node} style={{ display: "none" }} />
            <p className='change-p'>change photo</p>
          </div>
        </form>

        <form onSubmit={submitHandler} className="submit-form">
          <label htmlFor="name" className='label'>Name</label>
          <input type="text" className='input' placeholder={user.name} id="name" onChange={(e) => setName(e.target.value)} value={name} />

          <label htmlFor="bio" className='label'>Bio</label>
          <textarea type="text" className='txt-area' placeholder={user.bio} id="bio" onChange={(e) => setBio(e.target.value)} value={bio} />

          <label htmlFor="phone" className='label'>Phone</label>
          <input type="text" className='input' placeholder={user.phone} id="phone" onChange={(e) => setPhone(e.target.value)} value={phone} />

          <label htmlFor="email" className='label'>Email</label>
          {user.password ?
            <input type="email" className='input' placeholder={user.email} id="email" onChange={(e) => setEmail(e.target.value)} value={email} /> :
            <input type="email" className='input' placeholder={user.email} id="email" onChange={(e) => setEmail(e.target.value)} value={email} disabled />}

          {user.password && <>
            <label htmlFor="password" className='label'>Password</label>
            <input type="password" className='input' placeholder="************" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </>}

          <button type='submit' className='save-btn'>Save</button>

          {error && <p className='error'>{error}</p>}
        </form>
      </div>
    </EditContainer>
  )
}

const EditContainer = styled.main`
margin-top: 25px;

.submit-form {
  position: relative;
}

.error {
  position: absolute;
  top: Calc(100% - 90px);
  color: #c73522;
}

.back-btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 18px;
  color: ${vars.lightBlue};

  .left-icon{
    margin: 0 -7px;
  }

  span{
    margin-left: 5px;
  }
}

.container {
  h1 {
    margin-top: 28px;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
  }

  .change-p {
    font-size: 14px;
    font-weight: 300;
    color: ${vars.lightGrey};
    margin-top: 4px;
    text-align: center;
  }
}

.photo-container {
  margin-top: 25px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .change-btn {
    position: relative;
    border: none;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;

    img {
      display: block;
      width: 72px;
      height: 72px;
    }

    .camera-icon{
      position: absolute;
      left: 50%;
      top: 50%;
      translate: -50% -50%;
      color: white;
    }
  }

  .change-p {
    text-transform: uppercase;
    font-size: 13px;
    color: ${vars.lightGrey};
    margin-left: 27px;
  }
}

.label {
  display: block;
  margin-top: 24px;
  font-size: 13px;
  color: #4f4f4f;
}

.input {
  width: 100%;
  padding: 17px;
  border: 1px solid ${vars.lightGrey};
  border-radius: 12px;
  color: ${vars.darkGrey};
  margin-top: 3px;
}

.txt-area {
  width: 100%;
  height: 92px;
  resize: none;
  padding: 17px;
  border: 1px solid ${vars.lightGrey};
  border-radius: 12px;
  font-family: 'Noto Sans';
  font-size: 13px;
  color: ${vars.darkGrey};
  margin-top: 3px;
}

.save-btn {
  border: none;
  background-color: ${vars.blue};
  padding: 8px 24px;
  font-size: 16px;
  font-family: 'Noto Sans';
  margin-top: 24px;
  margin-bottom: 30px;
  border-radius: 8px;
  color: white;
}

@media screen and (min-width: 720px){
  .container {
    padding: 28px 49px 0 49px;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    max-width: 846px;
    margin: 24px auto 40px auto;
    overflow: hidden;

    h1 {
      text-align: start;
    }

    .change-p {
      text-align: start;
    }
  }

  .input {
    max-width: 417px;
    display: block;
    margin-top: 4px;
  }

  .txt-area {
    max-width: 417px;
  }
}
`

export default EditHome