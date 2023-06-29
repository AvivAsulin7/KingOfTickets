import React from "react";
import { ImageListItem, ImageListItemBar } from "@mui/material";
import { categories_styles } from "../styles/home";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import festivals from "../images/festivals.png";
import sport from "../images/sport.png";
import concerts from "../images/concerts.png";
import entertaiment from "../images/entertaiment.png";
import "../pages/Home/Home.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = [
  {
    img: festivals,
    title: "Festivals",
  },
  {
    img: sport,
    title: "Sport",
  },
  {
    img: concerts,
    title: "Concerts",
  },
  {
    img: entertaiment,
    title: "Entertaiment",
  },
];

const Carousel = ({ handleEventsByCategory }) => {
  return (
    <Swiper
      style={{ padding: " 0 30px", marginTop: "20px" }}
      className="technologies"
      modules={[Pagination, Navigation]}
      navigation
      spaceBetween={1}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {categories.map((item, index) => {
        return (
          <SwiperSlide key={index} className="techno">
            <ImageListItem
              key={item.img}
              sx={{
                height: "80%",
                m: "20px",
              }}
            >
              <img src={item.img} alt={item.title} loading="lazy" />
              <ImageListItemBar
                onClick={() => handleEventsByCategory(item.title)}
                title={item.title}
                sx={categories_styles}
              />{" "}
            </ImageListItem>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
