import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  width: 100%;
  color: #000;
`
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
  padding: 20px 0;
  background-color: #f3f3f3;
  margin: 10px;
`

export const Card = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 160px;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`
export const BackButton = styled.div`
  position: fixed;
  z-index: 100;
  top: 12px;
  left: 12px;
`
export const InfoCard = styled.div`
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 90%;
  margin: 20px auto;
  min-height: 300px;
`
export const ImgHolder = styled.div`
  width: 35%;
  height: 100%;
`
export const Graphic = styled.img`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
`
export const Info = styled.div`
  width: 65%;
  padding: 12px;
`
export const InfoCardChapters = styled.div`
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  width: 87%;
  margin: 20px auto;
  min-height: 300px;
  padding: 20px;
`
export const SelectHolder = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
`




