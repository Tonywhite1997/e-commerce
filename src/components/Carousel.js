import React from "react";
import Shoes from "../images/shoes.jpg";
import Clothes from "../images/clothes.jpg";
import Headphone from "../images/headphone.jpg";
import Sofa from "../images/sofa.jpg";
import { useEffect, useState } from "react";

function Carousel() {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    { category: Shoes, text: "Get the trending shoes at your door step" },
    { category: Clothes, text: "Get your clothes delivered at your door step" },
    {
      category: Headphone,
      text: "Are you a music or game lover? Shop for headphones.",
    },
    {
      category: Sofa,
      text: "Designing your new home? check out some of our best Sofa",
    },
  ];

  function changeImageIndex() {
    setImageIndex((prevIndex) => {
      return prevIndex + 1;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeImageIndex();
    }, 30000);
    if (imageIndex === images.length) {
      setImageIndex(0);
    }
    return () => {
      clearInterval(interval);
    };
  }, [imageIndex, images.length]);

  const style = {
    backgroundImage: `linear-gradient(
    rgba(0,0,0, .5),
    rgba(0,0,0, .5),
    rgba(0,0,0, .5)),
    url(${images[imageIndex] && images[imageIndex].category})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% auto",
  };

  function nextImage() {
    setImageIndex((prevIndex) => {
      return prevIndex + 1;
    });
  }
  function previousImage() {
    setImageIndex((prevIndex) => {
      if (prevIndex !== 0) {
        return prevIndex - 1;
      }
      return (prevIndex = 3);
    });
  }

  return (
    <div className="main--carousel" style={style}>
      <h1>{images[imageIndex] && images[imageIndex].text}</h1>
      <i className="fa-solid fa-angle-left" onClick={previousImage}></i>
      <i className="fa-solid fa-angle-right" onClick={nextImage}></i>
    </div>
  );
}

export default Carousel;
