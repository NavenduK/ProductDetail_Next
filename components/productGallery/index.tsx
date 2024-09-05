"use client";

import React, { useState } from "react";
import styles from "./index.module.css";
import utils from "../utils.module.css";
import Lightbox from "../lightBox";

interface Images {
  mainImgs: string[];
  thumbnails: string[];
  sliderImgs: { id: string; img: string }[];
}

// Define types for component props
interface ProductGalleryProps {
  images: Images;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  console.log(images.sliderImgs[0])
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const [imgIndex, setImgIndex] = useState<number>(0);

  // Handle slider buttons click
  const goToPrevSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === 0 ? images.sliderImgs.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setImgIndex((prevIndex) =>
      prevIndex === images.sliderImgs.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.productGallery}>
      <div
        className={styles.productGalleryCover}
        onClick={() => setShowLightbox(true)}
      >
        <img src={images.mainImgs[imgIndex]} alt="gallery-cover-image" />
      </div>
      <ul className={`${styles.productThumbnails} ${utils.flex}`}>
        {images.thumbnails.map((element, index) => (
          <li
            key={index}
            className={
              imgIndex === index
                ? `${styles.productThumbnail} ${styles.productThumbnailActive}`
                : styles.productThumbnail
            }
            onClick={() => setImgIndex(index)}
          >
            <img src={element} alt={`product thumbnail ${index}`} />
          </li>
        ))}
      </ul>

      <Lightbox
        showLightbox={showLightbox}
        imgIndex={imgIndex}
        images={images}
        setImgIndex={setImgIndex}
        onClose={() => setShowLightbox(false)}
      />

      <div
        className={styles.productGallerySlider}
        style={{ transform: `translateX(-${imgIndex * 100}%)` }}
      >
        {images.sliderImgs.map((element) => (
          <img
            key={element.id}
            src={element.img}
            alt={`Product Image ${element.id}`}
          />
        ))}
      </div>
      <button className={`${styles.btnSliderPrev}`} onClick={goToPrevSlide}>
        <svg viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <button className={`${styles.btnSliderNext}`} onClick={goToNextSlide}>
        <svg viewBox="0 0 13 18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductGallery;
