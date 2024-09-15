import YouTube from "react-youtube";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";

const Videos = ({ data }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const opts = {
    width: "100%",
    height: "499",
    borderRadius: "16px",
    playerVars: {
      // autoplay: 1,
      controls: 1,
    },
  };

  const _onReady = (event) => {
    event.target.pauseVideo();
  };

  const handleScrollToGallery = (videoIndex) => {
    setCurrentPhotoIndex(videoIndex);
    const gallery = document.getElementById("galleryPhotos");
    if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth" });
    }
};

  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const getNoOfSlides = () => {
    return windowWidth >= 840
      ? 5
      : windowWidth < 840 && windowWidth >= 640
      ? 3
      : 2;
  };

  const getYoutubeVideoId = (youtubeVideoLink) => {
    console.log(youtubeVideoLink)
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = youtubeVideoLink.match(regex);
    return match ? match[1] : null;
  };


  return (
    <>
      {data && data.length>0 && (
        <section id="galleryPhotos" className="container mx-auto mt-30">
          <div className="grid md:grid-cols-1 w-full">
            <div className="w-full rounded-[16px]">
              <YouTube
                videoId={getYoutubeVideoId(data[currentPhotoIndex])}
                opts={opts}
                onReady={_onReady}
                // onPlay={}
                className="rounded-[16px]"
              />
            </div>
          </div>
          <div className="container mx-auto  ">
            <div className="">
              <Swiper
                className=""
                spaceBetween={5}
                slidesPerView={getNoOfSlides()}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={true}
                modules={[Navigation]}
              >
                {data &&
                  data.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className=" mt-4" onClick={() => handleScrollToGallery(index)}>
                        <Image
                          src={ `https://img.youtube.com/vi/${getYoutubeVideoId(item)}/maxresdefault.jpg` || "https://img.youtube.com/vi/sTnm5jvjgjM/maxresdefault.jpg"}
                          width={250}
                          height={159}
                          className="rounded-[8px] border border-gray-500"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </section>
      )}
      {data && data.length==0 && (
        <div className="text-center text-gray-700">
          <Typography variant="paragraph">
          No Videos Available
          </Typography>
        </div>
      )}
    </>
  );
};

export default Videos;
