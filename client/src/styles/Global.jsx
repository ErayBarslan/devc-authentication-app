import { createGlobalStyle } from "styled-components"

export const vars = {
  'borderGrey': '#BDBDBD',
  'darkGrey': '#333333',
  'lightGrey': '#828282',
  'blue': '#2F80ED',
  'lightBlue': '#2D9CDB',
}

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
  font-family: 'Noto Sans';
  font-weight: 500;
  overflow-x: hidden;
  background: #fefefe;
}

button {
  cursor: pointer;
}

button:active {
  opacity: .8;
}
`