import { Typography } from "@material-tailwind/react";
import Head from "next/head";
import { POLICIES, SITEMAP, SOCIALS } from "@/lib/FooterData";

export default function Footer() {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            </Head>
            <footer className="w-full flex-col flex items-center bg-[#160019]">
                <div className="flex flex-col lg:flex-row md:flex-col xl:flex-row 2xl:flex-row 3xl:flex-row 4xl:flex-row  w-full py-24 justify-between">
                    {SITEMAP.map(({ title, links }, key) => (
                        <div key={key} className="w-full items-center flex flex-col pb-12 lg:pb-0 xl:pb-0 md:pb-0 2xl:pb-0 3xl:pb-0">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-4 font-bold uppercase text-[#FFFFFF]"
                            >
                                {title}
                            </Typography>
                            <div className="space-y-1 items-center flex flex-col justify-center">
                                {links.map((link, key) => (
                                    <Typography key={key} as="li" color="blue-gray" className="font-normal ">
                                        <Typography
                                            as="a"
                                            href={link.link}
                                            className="inline-block py-1 transition-transform hover:scale-105 opacity-50 text-[#FFFFFF]"
                                        >
                                            {link.title}
                                        </Typography>
                                    </Typography>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex w-11/12 flex-col justify-center border-t border-blue-gray-50 pt-5 pb-4 md:flex-row md:justify-between">
                    <div>
                    <Typography
                        variant="small"
                        className="mb-4 cursor-pointer text-center font-normal text-xl font-anton text-white md:mb-0"
                        textGradient={true}
                    >
                        <span className="bg-gradient-to-r from-[#3341CE] to-[#AB36E3] text-transparent text-xl bg-clip-text">
                            RealYesTake
                        </span>
                    </Typography>
                    </div>
                    <div>
                        <div className="w-full flex justify-center items-center text-[20px] mb-5">
                            Developed by
                            <a href="https://pentadots.com" className="items-start flex justify-center">
                                <img src="/assets/PentadotsIcon.svg" width={150} alt="Pentadots" className="mx-3 items-start flex" />
                            </a>
                        </div>
                        <div className="flex text-blue-gray-900 sm:justify-center gap-4 flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                            {
                                POLICIES.map(({ title, link }, key) => (
                                    <Typography
                                        as={'a'}
                                        href={link}
                                        key={key}
                                        variant="small"
                                        className="mb-4 transition-transform hover:scale-105 text-center font-normal text-white md:mb-0"
                                        textGradient={true}
                                    >
                                        {title}
                                    </Typography>
                                ))
                            }

                        </div>
                    </div>
                    <div className="flex justify-center items-start flex-row flex gap-4 text-blue-gray-900 sm:justify-center">
                            {
                                SOCIALS.map(({ icon, link }, key) => (
                                    <div key={key} className="rounded-full w-10 h-10 border-white border-[1.3px] hover:border-white/40 cursor-pointer justify-center items-center flex">
                                        <a href={link} key={key}>
                                            {icon}
                                        </a>
                                    </div>
                                ))
                            }
                        
                    </div>
                </div>
            </footer>
        </>
    )
}
