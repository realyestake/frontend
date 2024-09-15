import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export const SITEMAP = [
    {
        title: "Services",
        links: [{
            title: "Digital Twining",
            link: '/'
        }, {
            title: "Rent",
            link: "/"
        }, {
            title: "3d Camera Services",
            link: "/"
        }, {
            title: "Virtual Users",
            link: "/"
        }, {
            title: "Investments",
            link: "/"
        }
        ],
    },
    {
        title: "Explore",
        links: [{
            title: "Trending",
            link: '/properties/trending'
        }, {
            title: "Commercial",
            link: "/properties/commercial-investment"
        }, {
            title: "Residential",
            link: "/properties/residential"
        }],
    },
    {
        title: "Company",
        links: [{
            title: 'About Us',
            link: '/'
        }, {
            title: 'Partners',
            link: "/"
        }, {
            title: 'Contact Us',
            link: "/contact-us"
        }],
    },
];


export const SOCIALS = [
    {
        icon:<FaLinkedin color="white"/>,
        link: "https://www.linkedin.com/company/realyestake/",
    },
    {
        icon: <FaInstagram color="white"/>,
        link: "https://www.instagram.com/realyestake?igsh=MWV3M3Zmand0NGNhaA==",
    },
    {
        icon: <FaYoutube color="white"/>,
        link: "https://youtube.com/@RealYesTake?feature=shared",
    },
]


export const POLICIES = [
    {
        title: "Terms",
        link: "/"
    },
    {
        title: "Privacy",
        link: "/"
    },
    {
        title: "Cookies",
        link: "/"
    }
]