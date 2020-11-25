import styled from 'styled-components'

export const TopMangasRatings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const TextLeft = styled.div`
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 95%;
  text-align: left;
`
export const HorizontalCards = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 95%;
  background-color: #d3d3d3;
  margin: 10px;
  min-height: 200px
`

export const Image = styled.img`
  width: 100px;
  height: 160px;
  border-radius: 10px;
`

export const ImageTitle = styled.p`
  height: 15px;
  max-width: 100px;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0;
  transition: all .2s linear;
  &:hover {
    overflow: visible;
    white-space: normal;
    height:auto;
  }
  &:focus {
    overflow: visible;
    white-space: normal;
    height:auto;
  }
`
export const CardHolder = styled.div`
  margin-left: 15px;
`
