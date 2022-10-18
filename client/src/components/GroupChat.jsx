import React from 'react'

const GroupChat = () => {
  return (
    <div style={{
      marginTop: '23px',
      position: 'absolute',
      left: '0',
      width: '100%',
      zIndex: -1,
    }}>
      <picture>
        <source srcSet="/group-chat-desktop.png" media="(min-width: 720px)" />
        <img src="/grou-chat-mobile.png" alt="example" style={{
          width: '100%',
          display: 'block',
          height: 'calc(100vh - 77px)'
        }}/>
      </picture>
    </div>
  )
}

export default GroupChat