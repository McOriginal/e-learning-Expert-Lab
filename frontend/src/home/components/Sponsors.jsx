import React from 'react';
import classes from './Sponsors.module.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import google from './../../images/google.png';
import W3Schools from './../../images/W3Schools.png';
import codeacademie from './../../images/codeacademie.png';
import coursera from './../../images/coursera.png';
import orange from './../../images/orange.png';
import openclassroom from './../../images/openclassroom.png';
import udemy from './../../images/udemy.png';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${classes.customArrow} ${classes.nextArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${classes.customArrow} ${classes.prevArrow}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

const listImage = [
  
  {name: udemy },
 { name: codeacademie },
 { name: openclassroom},
 { name: google },
{  name: orange },
 { name: coursera },
  {name: W3Schools },

]

export default function Sponsors(){

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return(
        <>
        <div className={classes.container}>

           <h1> Nos Partenaire</h1>

        <div className="slider-container">
      <Slider {...settings} className={classes.slider}>
           {listImage.map((item, index) => (
           <div className={classes.box_img} key={index }>
             <img src={item.name} alt="nos sponsort" />
           </div>
           ))}
        </Slider>
        </div>

        </div>
        </>
    )

    
}



