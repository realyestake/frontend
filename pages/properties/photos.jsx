import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

const Photos = ({ data }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
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

  const handleScrollToGallery = (photoIndex) => {
    setCurrentPhotoIndex(photoIndex)
    const gallery = document.getElementById("galleryPhotos");
    if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth" });
    }
};

  const getNoOfSlides = () => {
    return windowWidth >= 840
      ? 5
      : windowWidth < 840 && windowWidth >= 640
      ? 3
      : 2;
  };



  return (
    <>
      <div id="galleryPhotos" className="container mx-auto">
        <div className="grid md:grid-cols-1 w-full">
          <div className="">
            {data && (
              <Image
                src={
                  `${data[currentPhotoIndex]}` ||
                  "https://res.cloudinary.com/dw5nspymf/image/upload/v1717419047/rent-collection_xfvopj.jpg"
                }
                alt={`current Image ${currentPhotoIndex + 1}`}
                width={2299}
                height={2000}
                className={`object-cover items-center justify-center rounded-[16px] transition-all duration-300 `}
                
              />
            )}
          </div>
        </div>
        <div className="container mx-auto">
          {data && (
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
                  data.length > 0 &&
                  data.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="mt-4" onClick={() => handleScrollToGallery(index)}>
                        <Image
                          src={
                            `${item}` ||
                            "https://res.cloudinary.com/dw5nspymf/image/upload/v1717419033/maid_xcr0m9.png"
                          }
                          alt="card-image"
                          className="rounded-[8px] border border-gray-500 cursor-pointer object-cover object-center w-full h-40 max-w-full "
                          width={250}
                          height={200}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
