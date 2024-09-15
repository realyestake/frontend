import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import Slider from 'react-slick';

const Viewer = ({ link, list, setList }) => {
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
        return windowWidth >= 840 ? 2 : windowWidth < 840 && windowWidth >= 640 ? 2 : 1;
    };

    const PrevArrow = ({ onClick }) => (
        <div className="custom-arrow custom-prev rounded-full p-2 bg-white/40 cursor-pointer hover:bg-white/80" onClick={onClick}>
            <FaChevronLeft className="h-6 w-6 text-black" />
        </div>
    );

    const NextArrow = ({ onClick }) => (
        <div className="custom-arrow custom-next rounded-full p-2 bg-white/40 cursor-pointer hover:bg-white/80" onClick={onClick}>
            <FaChevronRight className="h-6 w-6 text-black" />
        </div>
    );

    const deleteHandler = (index) => {
        const newlist = [...list.slice(0, index), ...list.slice(index + 1)];
        setList(newlist);
    };

    const renderCloseButton = (index) => (
        <div onClick={() => deleteHandler(index)} className="absolute rounded-full bg-black z-10 top-0 right-0 h-5 w-5 justify-center flex items-center cursor-pointer">
            <FaXmark className="text-white" size={12} />
        </div>
    );

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
        <div className="w-full flex justify-center">
            <Slider {...settings} className="w-full max-w-screen-lg">
                {list != undefined && list.map((lk, index) => (
                    <section key={index} className="container mx-auto bg-black w-full aspect-video relative">
                        <iframe
                            src={lk}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full rounded-16"
                        ></iframe>
                        {renderCloseButton(index)}
                    </section>
                ))}
            </Slider>
        </div>
    );
};

export default Viewer;
