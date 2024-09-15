import { Carousel, IconButton } from "@material-tailwind/react";

export function CarouselCustom() {
  return (
    <div className="flex justify-center mx-5 pt-5 items-center h-[15rem] lg:h-full md:h-full 2xl:h-full 3xl:h-full xl:h-full">
      <Carousel className="w-full h-full max-w-5xl relative rounded-3xl">
        <img
          src="/assets/image.png"
          alt="image 1"
          className="object-cover w-full h-[15rem] lg:h-[30rem] md:h-[30rem] 2xl:h-[30rem] 3xl:h-[30rem] xl:h-[30rem] rounded-t-3xl"
        />
        <img
          src="/assets/image2.png"
          alt="image 2"
          className="object-cover w-full h-[15rem] lg:h-[30rem] md:h-[30rem] 2xl:h-[30rem] 3xl:h-[30rem] xl:h-[30rem] rounded-t-3xl"
        />
        <img
          src="/assets/image3.png"
          alt="image 3"
          className="object-cover w-full h-[15rem] lg:h-[30rem] md:h-[30rem] 2xl:h-[30rem] 3xl:h-[30rem] xl:h-[30rem] rounded-t-3xl"
        />
      </Carousel>
    </div>
  );
}
