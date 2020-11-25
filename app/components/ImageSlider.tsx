import React, { useState } from "react";
import {
  Button,
  ImageHolder
} from './ImageSliderStyle'


const ImageSlider = ({ images, chapterId, mangaId }: {images: string[], chapterId:number, mangaId:number}): null | any => { // takes in images as props

  const [index, setIndex] = useState(0); // create state to keep track of images index, set the default index to 0
  const [currentPage, setCurrentPage] = useState(localStorage.getItem(`${mangaId}-${chapterId}`))

  const slideRight = () => {
    if(currentPage != null) {
      setIndex((parseInt(currentPage) + 1) % images.length); // increases index by 1
      localStorage.setItem(`${mangaId}-${chapterId}`, `${((parseInt(currentPage) + 1) % images.length)}`);
      setCurrentPage(`${((parseInt(currentPage) + 1) % images.length)}`)
    } else {
      setIndex((index + 1) % images.length); // increases index by 1
      localStorage.setItem(`${mangaId}-${chapterId}`, `${((index + 1) % images.length)}`);
      setCurrentPage(`${((index + 1) % images.length)}`)
    }
  };

  const slideLeft = () => {
    if(currentPage != null) {

      const nextIndex = parseInt(currentPage) - 1
      console.log(nextIndex);

      if (nextIndex < 0) {
        localStorage.setItem(`${mangaId}-${chapterId}`, `${(images.length - 1)}`);
        setCurrentPage(`${(images.length - 1)}`)
        setIndex(images.length - 1); // returns last index of images array if index is less than 0
      } else {
        setCurrentPage(`${nextIndex}`)
        setIndex(nextIndex);
      }
    } else {
      const nextIndex = index - 1;
      if (nextIndex < 0) {
        localStorage.setItem(`${mangaId}-${chapterId}`, `${(images.length - 1)}`);
        setCurrentPage(`${(images.length - 1)}`)
        setIndex(images.length - 1); // returns last index of images array if index is less than 0
      } else {
        setIndex(nextIndex);
      }
    }

  };

  return (
    images.length > 0 && (
      <>
        <Button onClick={slideLeft}>{"<"}</Button>
        <ImageHolder>
          <img
            src={images[(currentPage != null ? parseInt(currentPage) : index)]}
            alt={`${index}`}
            style={{
              minHeight: '100px',
              minWidth: '100px',
              // height: '600px'
              width:'700px'
            }}
          />
        </ImageHolder>
        <Button onClick={slideRight} disabled={index==(images.length-1)}>{">"}</Button>
      </>
    )
  );
};

export default ImageSlider;
