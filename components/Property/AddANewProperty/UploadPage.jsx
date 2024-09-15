import React from 'react';
import TinyCarousel from './tinyCarousel';
import { Typography } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import DragAndDropArea from '@/components/Input/DragAndDrop';
import InputBox from '@/components/Input/InputBox';
import HeaderTitle from '../HeaderTitle';
import Stepper from './Stepper';
import { fetchThumbnail } from '@/lib/ThumbnailFetcher';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import BACKEND_URL from '@/apiUrl';
export default function UploadPage({ decrementStep, activeStep, data, setData }) {


  console.log("DATAAAA", data);

  const [youtubeLink, setYoutubeLink] = React.useState('');
  const [youtubeVideoLinks, setYoutubeVideoLinks] = React.useState([]);
  const [thumbnailUrls, setThumbnailUrls] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [value, setValue] = React.useState({});
  const [preview, setPreview] = React.useState([]);
  const [propertyId, setPropertyId] = React.useState();
  const [loading, setLoading] = React.useState(false);
  
  const [token, setToken] = React.useState("");
  // React.useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setToken(
  //       document.cookie
  //         .split(";")
  //         .find((c) => c.includes("token"))
  //         .split("=")[1]
  //     );
  //   }
  // }, []);

  React.useEffect(() => {
    setImages(JSON.parse(localStorage.getItem('images')) || []);
    console.log(JSON.parse(localStorage.getItem('images')));
    setPreview(JSON.parse(localStorage.getItem('images')) || []);
    setYoutubeVideoLinks(JSON.parse(localStorage.getItem('youtubeVideoLinks')) || []);
    setThumbnailUrls(JSON.parse(localStorage.getItem('thumbnailUrls')) || []);
    console.log(JSON.parse(localStorage.getItem('youtubeVideoLinks')));
  }, []);

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const uploadFileToCloud=(source)=>{
    const data = new FormData();
    data.append("file", source);
    data.append("upload_preset", "realyes");
    data.append("cloud_name", "dw5nspymf");
    fetch("https://api.cloudinary.com/v1_1/dw5nspymf/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        console.log("data.url", data.url);
        
      })
      .catch((err) => {
        console.log("err", err);
      }
    )
  }

  const handleImageUpload = async (e) => {


    console.log(e);
    let file;
    if (e.target && e.target.files) {
      file = e.target.files[0];
    }
    else {
      file = e.dataTransfer.files[0];
    }
    if (file) {
      const base64Img = await convertToBase64(file);
      setImages([...images, base64Img]);
      setPreview([...preview, base64Img]);
      uploadFileToCloud(file);
      localStorage.setItem('images', JSON.stringify([...images, base64Img]));
    }
  };

  React.useEffect(() => {
    setData({
      ...data,
      images,
      youtubeVideoLinks,
      thumbnailUrls,
    });
  }
    , [images, youtubeLink, thumbnailUrls]);




  const handleNext = async () => {
    console.log('data', data);
    const Data = {
      name: data.propName,
      owner: data.ownerName,
      price: data.price,
      location: data.location,
      pictures: data.images,
      videos: data.youtubeVideoLinks,
      threeDView: data.threeDLink.length > 0 ? data.threeDLink[0] : null,
      details: data.details,
      floorPlan: data.floorPlanLink,
      listingType: data.listingType,
      propertyType: data.propertyType,
      businessType: data.businessType,
      area: data.area,
      bhk: data.bhk,
      bathrooms: data.bathrooms,
      carParking: data.carParking,
      facing: data.facing,
      floors: data.numberOfFloors,
      pincode: data.pincode,
      address: data.address,
      carParking: data.carParking,
      mapview: data.streetVideoLink.length > 0 ? data.streetVideoLink[0] : null,
    };

    console.log('Premium...', Data.mapview);

    console.log('data', Data);

    setLoading(true);
    try {
      let token = "";
      
      if (window !== undefined && document.cookie) {
        token = document.cookie && document.cookie.split(";")
          .find((c) => c.includes("token"))
          .split("=")[1];
      }
      console.log(token);
      console.log("Data", Data);
      const response = await axios.post(BACKEND_URL + '/api/properties', Data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      

      console.log("RESPONSE-----",response);
      setPropertyId(response.data.property._id);
      if (response.status === 200) {
        if(data.premium){
          const premiumData = {
            propertyId: propertyId,
          }

          const response = await axios.post(BACKEND_URL + '/api/properties/premium', premiumData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Premium Response", response);
          
          console.log(response.status);
          if(response.status != 200){
            throw new Error("Couldn't create property!");
          }else{
            setLoading(false);
            toast.success("Property Created Successfully!", {
              position: "bottom-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // setTimeout(() => {
            //   localStorage.clear();
            //   decrementStep(0);
            // }, 6000);
          }
        }
        else{
          setLoading(false);
          toast.success("Property Created Successfully!", {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
  
          // setTimeout(() => {
          //   localStorage.clear();
          //   decrementStep(0);
          // }, 6000);
        }
        
      }
      else {
        setLoading(false);
        toast.error("Couldn't create property!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Couldn't create property!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleCancel = () => {
    localStorage.clear();
    decrementStep(0);
  }

  const handleImageDelete = (data) => {
    setImages(data);
    setPreview(data);
    localStorage.setItem('images', JSON.stringify(data));
  }

  const handleVideoDelete = (data) => {
    setYoutubeVideoLinks(data);
    localStorage.setItem('youtubeVideoLinks', JSON.stringify(data));
    setThumbnailUrls(data);
    localStorage.setItem('thumbnailUrls', JSON.stringify(data));
  }



  return (
    <div className='bg-[#160019] flex flex-col min-h-screen justify-between p-4 sm:p-8 md:p-12 lg:p-16 gap-4 sm:gap-8 lg:mt-[80px]'>

      <div className='text-center'>
        <HeaderTitle />
      </div>
      <div className='my-5 flex justify-center'>
        <Stepper activeStep={activeStep} className='w-full max-w-[30rem]' />
      </div>
      <Typography className='text-white text-center'>
        Upload Photos
      </Typography>
      <DragAndDropArea value={value} setValue={handleImageUpload} />
      <TinyCarousel data={preview} setData={handleImageDelete} />
      <div className='flex flex-col items-center justify-center mt-20'>
        <div className='flex flex-row w-full max-w-[30rem] mt-2 mb-2'>
          <Typography className='text-white text-start'>
            Add Youtube Video Links
          </Typography>
        </div>
        <div className='mb-5 w-full max-w-[30rem] mx-auto flex flex-col sm:flex-row gap-2'>
          <InputBox className='w-full sm:w-3/4 h-[2.5rem]' placeholder='Add Youtube Link' setValue={setYoutubeLink} />

          <Button className='px-8 sm:px-12  mt-2 sm:mt-0 border normal-case  text-[#FB3C98] border-1 border-[#FB3C98] rounded-[47px] bg-white'
            onClick={async () => {
              setYoutubeVideoLinks([...youtubeVideoLinks, youtubeLink]);
              localStorage.setItem('youtubeVideoLinks', JSON.stringify([...youtubeVideoLinks, youtubeLink]));
              const url = await fetchThumbnail(youtubeLink);
              setThumbnailUrls([...thumbnailUrls, url]);
              localStorage.setItem('thumbnailUrls', JSON.stringify([...thumbnailUrls, url]));
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <TinyCarousel data={thumbnailUrls} setData={handleVideoDelete} />
      <div className='justify-center flex flex-row gap-4 w-full container mx-auto' >
        <Button className='bg-transparent' onClick={() => {
          handleCancel();
        }}>
          Cancel
        </Button>
        <Button className={'normal-case  text-[#FB3C98] border-1 border-[#FB3C98] rounded-[47px] bg-white px-8'} onClick={() => decrementStep(1)}>
          Previous
        </Button>
        <Button onClick={() => {
          handleNext()
        }}
          className='normal-case text-[#FFFFFF] rounded-[47px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC] px-12'
        >
          {
            loading ? 'Creating...' : 'Create'
          }
        </Button>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
