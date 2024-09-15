/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    // remotePatterns : ['youtube.com', 'img.youtube.com', 'foyr.com'] // <== Domain name
    remotePatterns : [
      {
        protocol : 'https',
        hostname : 'youtube.com',
      },
      {
        protocol : 'https',
        hostname : 'img.youtube.com',
      },
      {
        protocol : 'https',
        hostname : 'foyr.com',
      },
      {
        protocol : 'https',
        hostname : 'picsum.photos',
      },{
        protocol : 'https',
        hostname : 'loremflickr.com',
      },
      {
        protocol:'https',
        hostname: 'images.unsplash.com',
      },{
        protocol: 'https',
        hostname: 'youtu.be',
      }
      ,
      {
        protocol: 'https',
        hostname:'img.freepik.com'
      }
      ,{
        protocol: 'https',
        hostname:'encrypted-tbn0.gstatic.com'
      },
      {
        protocol: 'https',
        hostname:'images.squarespace-cdn.com'
      },
      {
        protocol: 'https',
        hostname:'letsenhance.io'
      },
      {
        protocol: 'https',
        hostname: 'ibb.co'
      },
    
      
      {
        protocol: 'https',
        hostname:'res.cloudinary.com'
      },
    ]
  },
}

module.exports = nextConfig
