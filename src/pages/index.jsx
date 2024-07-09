import Layout from "@/layout/layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "@/components/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BASE_URL = "http://localhost:4000";

// Import Swiper styles
import "swiper/css";
import { useRouter } from "next/router";
import { useFetchAllProducts, useFetchTrendingProducts } from "@/hooks/query";
import Link from "next/link";

export default function Home() {
  // QUERY TO FETCH ALL PRODUCTS
  const { data, isLoading } = useFetchAllProducts();

  const { data: trending } = useFetchTrendingProducts();
  console.log(trending);

  // SHIRTS ARRAY
  const shirtsToRender =
    data &&
    data
      .filter((product) => product.category === "662b80e5dda8c7cc70acd30c")
      .slice(0, 3);

  const shoesToRender =
    data &&
    data
      .filter((product) => product.category === "662b8120dda8c7cc70acd30e")
      .slice(0, 3);

  useEffect(() => {
    AOS.init({});
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: false,
    prevArrow: false,
  };

  const swiper1 = useRef(null);
  const swiper2 = useRef(null);
  const swiper3 = useRef(null);

  const handlePrev = (swiper) => {
    if (swiper && swiper.swiper) {
      swiper.swiper.slidePrev();
    }
  };
  const handleNext = (swiper) => {
    if (swiper && swiper.swiper) {
      swiper.swiper.slideNext();
    }
  };

  const router = useRouter();

  return (
    <Layout>
      <div
        className={
          eval(router.query.open)
            ? "opacity-40 duration-200"
            : "opacity-100 duration-200"
        }
      >
        {/* AD DIV */}
        <div
          data-aos="fade-down"
          data-aos-duration="1100"
          className="h-screen w-full grid grid-cols-2 gap-2 mob_display:flex mob_display:flex-col mob_display:justify-center"
        >
          <div className="flex items-center flex-col w-full">
            <div className="font-semibold text-black text-5xl p-4 mt-40 mob_display:text-3xl mob_display:text-center mob_display:mt-16">
              <p>Shop with</p>
              <p>excellent discounts...</p>
            </div>
            <div onClick={() => router.push("/products")}>
              <button className="text-lg mt-8 rounded-2xl font-semibold text-black border border-black hover:cursor-pointer hover:bg-black hover:text-white duration-200 p-1 pl-4 pr-4">
                Shop now
              </button>
            </div>
          </div>
          {/* CAROUSEL DIV */}
          <div className="flex justify-center items-center border-none outline-none">
            <Slider
              className="flex justify-center items-center text-white p-6 w-3/5 h-[500px] mob_display:h-[400px] mob_display:mt-10 border-none outline-none"
              {...settings}
            >
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                data?.slice(0, 4).map((product) => (
                  <div key={product._id} className="">
                    <img
                      className="h-[450px] w-[400px] mob_display:h-[300px] mob_display:w-[300px] border-none outline-none"
                      src={`${BASE_URL}/images/${product.imageUrl}`}
                      alt=""
                    />
                  </div>
                ))
              )}
            </Slider>
          </div>
        </div>
        {/* TRENDING DIV */}
        <div
          data-aos="fade-down"
          className="flex justify-center mt-20 relative"
        >
          <div>
            {/* CARD MAIN DIV */}
            <div className="flex justify-between items-center">
              <div className="text-3xl font-semibold">Trending</div>
            </div>
            {/* CARDS */}
            <div className="flex justify-center w-[1200px] slider1:w-[800px] slider2:w-[600px] slider3:w-[300px] p-4 mt-8">
              <Swiper
              className="w-full h-[400px]"
                ref={swiper1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                  1300: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1000: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  700: {
                    slidesPerView: 2,
                  },
                }}
              >
                {trending?.map((product) => (
                  <SwiperSlide>
                    <Card
                      key={product._id}
                      name={product.name}
                      price={product.price}
                      imgUrl={product.imageUrl}
                      id={product._id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="flex justify-between w-[1300px] slider1:w-[1000px] slider2:w-[700px] slider3:w-4/5 items-center absolute top-1/2 z-10">
                <div>
                  <button onClick={() => handlePrev(swiper1.current)}>
                    <img
                      className="rotate-180"
                      src="/images/right-arrow.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
                <div>
                  <button onClick={() => handleNext(swiper1.current)}>
                    <img
                      src="/images/right-arrow.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SHIRTS DIV */}
        <div
          data-aos="fade-down"
          className="flex justify-center mt-20 relative"
        >
          <div>
            {/* CARD MAIN DIV */}
            <div className="flex justify-between items-center">
              <div className="text-3xl font-semibold">Clothing</div>
              <div className="text-sm text-blue-500 hover:underline hover:cursor-pointer">
                <Link href="/products?category=662b80e5dda8c7cc70acd30c">
                  View all
                </Link>
              </div>
            </div>
            {/* CARDS */}
            <div className="flex justify-between w-[1200px] slider1:w-[800px] slider2:w-[600px] slider3:w-[300px] p-4 mt-8 slider1:hidden">
              <div className="flex flex-wrap gap-10 w-full">
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  shirtsToRender.map((shirt) => (
                    <Card
                      key={shirt._id}
                      name={shirt.name}
                      price={shirt.price}
                      imgUrl={shirt.imageUrl}
                      id={shirt._id}
                    />
                  ))
                )}
              </div>
              <div className="flex justify-center items-center">
                <Slider
                  className="flex justify-center items-center text-white p-6 w-[300px] h-[350px] mob_display:h-[400px]"
                  {...settings}
                >
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    data?.map((product) => {
                      if (product.category === "662b80e5dda8c7cc70acd30c") {
                        return (
                          <div key={product._id} className="">
                            <img
                              className="h-max w-max mob_display:h-[300px] mob_display:w-[300px] border-none outline-none"
                              src={`${BASE_URL}/images/${product.imageUrl}`}
                              alt=""
                            />
                          </div>
                        );
                      }
                    })
                  )}
                </Slider>
              </div>
            </div>
            {/* CARDS */}
            <div className="flex justify-center w-[1200px] slider1:w-[800px] slider2:w-[600px] slider3:w-[300px] p-4 mt-8 slider1_full:hidden">
              <Swiper
                ref={swiper2}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                  1300: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1000: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  700: {
                    slidesPerView: 2,
                  },
                }}
              >
                {data?.map((product) => {
                  if (product.category === "662b80e5dda8c7cc70acd30c") {
                    return (
                      <SwiperSlide>
                        <Card
                          key={product._id}
                          name={product.name}
                          price={product.price}
                          imgUrl={product.imageUrl}
                        />
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
              <div className="flex justify-between w-[1300px] slider1:w-[1000px] slider2:w-[700px] slider3:w-4/5 items-center absolute top-1/2 z-10">
                <div>
                  <button onClick={() => handlePrev(swiper2.current)}>
                    <img
                      className="rotate-180"
                      src="/images/right-arrow.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
                <div>
                  <button onClick={() => handleNext(swiper2.current)}>
                    <img
                      src="/images/right-arrow.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* SHOES DIV */}
        <div
          data-aos="fade-down"
          className="flex justify-center mt-20 relative"
        >
          <div>
            {/* CARD MAIN DIV */}
            <div className="flex justify-between items-center">
              <div className="text-3xl font-semibold">Shoes</div>
              <div className="text-sm text-blue-500 hover:underline hover:cursor-pointer">
                <Link href={"/products?category=662b8120dda8c7cc70acd30e"}>
                  View all
                </Link>
              </div>
            </div>
            {/* CARDS */}
            <div className="flex justify-between w-[1200px] slider1:w-[800px] slider2:w-[600px] slider3:w-[300px] p-4 mt-8 slider1:hidden">
              <div className="flex flex-wrap gap-10 w-full">
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  shoesToRender.map((shoe) => (
                    <Card
                      key={shoe._id}
                      name={shoe.name}
                      price={shoe.price}
                      imgUrl={shoe.imageUrl}
                      id={shoe._id}
                    />
                  ))
                )}
              </div>
              <div className="flex justify-center items-center">
                <Slider
                  className="flex justify-center items-center text-white p-6 w-[300px] h-[400px] mob_display:h-[400px]"
                  {...settings}
                >
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    data?.map((product) => {
                      if (product.category === "662b8120dda8c7cc70acd30e") {
                        return (
                          <div key={product._id} className="">
                            <img
                              className="h-max w-max mob_display:h-[300px] mob_display:w-[300px] border-none outline-none"
                              src={`${BASE_URL}/images/${product.imageUrl}`}
                              alt=""
                            />
                          </div>
                        );
                      }
                    })
                  )}
                </Slider>
              </div>
            </div>
            {/* CARDS */}
            <div className="flex justify-center w-[1200px] slider1:w-[800px] slider2:w-[600px] slider3:w-[300px] p-4 mt-8 slider1_full:hidden">
              <Swiper
                ref={swiper3}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                  1300: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1000: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  700: {
                    slidesPerView: 2,
                  },
                }}
              >
                {data?.map((product) => {
                  if (product.category === "662b8120dda8c7cc70acd30e") {
                    return (
                      <SwiperSlide>
                        <Card
                          key={product._id}
                          name={product.name}
                          price={product.price}
                          imgUrl={product.imageUrl}
                        />
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>
              <div className="flex justify-between w-[1300px] slider1:w-[1000px] slider2:w-[700px] slider3:w-4/5 items-center absolute top-1/2 z-10">
                <div>
                  <button onClick={() => handlePrev(swiper3.current)}>
                    <img
                      className="rotate-180"
                      src="/images/right-arrow.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
                <div>
                  <button onClick={() => handleNext(swiper3.current)}>
                    <img
                      src="/images/right-arrow.png"
                      alt=""
                      height={30}
                      width={30}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
