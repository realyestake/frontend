import { Typography } from "@material-tailwind/react";
import React from "react";

const View = ({ threeDView }) => {
  return (
    <section className="">
      {threeDView && (
        <div className="grid md:grid-cols-1 w-full aspect-video ">
        <iframe
          title="YouTube Video"
          src={
            `${threeDView}` ||
            "https://my.matterport.com/show/?m=RsKKA9cRJnj&back=1"
          }
          allowFullScreen
          className="w-full h-full  rounded-[16px]"
          //   width={1224}
          // height={599}
        ></iframe>
      </div>
      )}
      {!threeDView && (
        <div className="text-center text-gray-700">
          <Typography variant="paragraph">
          No 3D Video Available
          </Typography>
        </div>
      )}
    </section>
  );
};

export default View;
