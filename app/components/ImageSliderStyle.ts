import styled from 'styled-components'

export const ImageHolder = styled.div`
  height: 600px;
  overflow: scroll;
`
export const Button = styled.button`
  margin: 12px;
  padding: 5px;
  border-radius: 100%;
  height: 42px;
  width: 42px;
  font-size: 20px

  cursor: pointer;
  opacity: 0.5;
  -webkit-transition: opacity 0.4s ease-in-out;
  -moz-transition: opacity 0.4s ease-in-out;
  -ms-transition: opacity 0.4s ease-in-out;
  -o-transition: opacity 0.4s ease-in-out;
  transition: opacity 0.4s ease-in-out;

  &:hover{
    opacity: 1;
  }
`
