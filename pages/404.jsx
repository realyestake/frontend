import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

const Errorpage = () => {
  return (
    <>
      <section class="">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl dark:text-white">
              Something&apos;s missing.
            </p>
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the
              home page.{" "}
            </p>
            <Button class="inline-flex bg-white text-black bg-black-800 hover:bg-white focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-black my-4">
              <Link href="/ ">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Errorpage;
