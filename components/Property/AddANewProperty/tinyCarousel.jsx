import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

export default function TinyCarousel({ data, setData }) {
    const [windowWidth, setWindowWidth] = React.useState(0);

    React.useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getNoOfSlides = () => {
        return windowWidth >= 840 ? 4 : windowWidth < 840 && windowWidth >= 640 ? 2 : 1;
    };

    const PrevArrow = ({ onClick }) => (
        <div className="custom-arrow custom-prev rounded-full p-2 bg-white/40 cursor-pointer hover:bg-white/80" onClick={onClick}>
            <FaChevronLeft className="h-6 w-6 text-white" />
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div className="custom-arrow custom-next rounded-full p-2 bg-white/40 cursor-pointer hover:bg-white/80" onClick={onClick}>
            <FaChevronRight className="h-6 w-6 text-white" />
        </div>
    );

    const deleteHandler = (index) => {
        const newData = [...data.slice(0, index), ...data.slice(index + 1)];
        console.log(newData)
        setData(newData);
        console.log('delete', index);
    };

    const renderCloseButton = (index) => {
        return (
            <div onClick={() => deleteHandler(index)} className='absolute rounded-full bg-white z-10 top-0 right-0 h-5 w-5 justify-center flex items-center cursor-pointer'>
                <FaXmark className='text-black' size={12} />
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: getNoOfSlides(),
        slidesToScroll: getNoOfSlides(),
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <Slider {...settings}>
            {data != undefined && data.map((item, index) => (
                <div className='relative' key={index}>
                    {renderCloseButton(index)}
                    <img
                        src={item}
                        className="w-full h-40 object-cover rounded-md border border-gray-500 backdrop-filter backdrop-blur-md z-0"
                        style={{ imageRendering: 'pixelated' }}
                    />
                </div>
            ))}
        </Slider>
    );
}
