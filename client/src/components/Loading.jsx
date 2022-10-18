import React from 'react'
import styled from 'styled-components'
import { vars } from '../styles/Global'

const Loading = () => {
  return (
    <LoadingEffect />
  )
}

const LoadingEffect = styled.div`
  margin: auto;
  border: 10px solid #EAF0F6;
  border-radius: 50%;
  border-top: 10px solid ${vars.blue};
  border-left: 10px solid ${vars.blue};
  width: 45.5px;
  height: 45.5px;
  animation: spinner .75s linear infinite;
@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default Loading