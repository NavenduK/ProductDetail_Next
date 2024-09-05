import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import utils from "../components/utils.module.css";
import ProductGallery from '../components/productGallery';
import AddToCart from '../components/addToCart';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {

  const [productData, setProductData] = useState<any>(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch('/api/data');
      const data = await response.json();
      setProductData(data);
    }

    fetchProduct();
  }, []);

  console.log(productData)

  if (!productData) return <p className={styles.loader}>Loading...</p>;
  return (
    <main className={`${styles.main} ${utils.flex}`}>

      <ProductGallery images={productData.images} />

      <div className={styles.productDetail}>
        <span
          className={`${styles.companyName} ${utils.upperCase} ${utils.textOrange400} ${utils.fs300} ${utils.fw700}`}
        >
          {productData.company}
        </span>
        <h1 className={`${utils.textNeutral700} ${utils.fs800}`}>
          {productData.title}
        </h1>
        <p>{productData.description}</p>
        <div className={`${styles.productPrice} ${utils.flex}`}>
          <div className={`${styles.newPrice} ${utils.flex} ${utils.fw700}`}>
            <span className={`${utils.textNeutral700} ${utils.fs500}`}>
              ${productData.currentPrice.toFixed(2)}
            </span>
            <span className={`${styles.discount} ${utils.textOrange400}`}>
              {productData.discount}%
            </span>
          </div>
          <span
            className={`${utils.textNeutral300} ${utils.lineThrough} ${utils.fw700}`}
          >
            ${productData.oldPrice.toFixed(2)}
          </span>
        </div>
        <AddToCart
          name={productData.title}
          price={productData.currentPrice}
          thumbnail={productData.images.thumbnails[0]}
        />
      </div>
    </main>
  );
}

export default Home
