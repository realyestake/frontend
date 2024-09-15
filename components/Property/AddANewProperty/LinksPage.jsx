import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import InputBox from '@/components/Input/InputBox';
import HeaderTitle from '../HeaderTitle';
import Stepper from './Stepper';
import Viewer from './Viewer';
import LinkBar from './LinkBar';

export default function LinksPage({ incrementStep, decrementStep, activeStep, data, setData }) {


  

  const [threeDLinkList, setThreeDLinkList] = React.useState([]);
  const [floorPlanLinkList, setFloorPlanLinkList] = React.useState([]);
  const [streetVideoLinkList, setStreetVideoLinkList] = React.useState([]);


  const handleThreeDBtnClick = (link) => {
    if (checkLink(link)) {
      setThreeDLinkList([...threeDLinkList, link]);
    }
  }

  const handleFloorPlanBtn = (link) => {
    if (checkLink(link)) {
      setFloorPlanLinkList([...floorPlanLinkList, link]);
    }
  }

  const handleStreetVideoBtn = (link) => {
    if (checkLink(link)) {
      setStreetVideoLinkList([...streetVideoLinkList, link]);
    }
  }

  const checkLink = (link) => {
    if(link === '' || !link) return false;
    const regex = /^https:\/\//.test(link);
    return true;
  }

  const [errors, setErrors] = React.useState({});

  const handleNext = () => {
    const requiredFields = [
      "threeDLink",
      "floorPlanLink",
      "streetVideoLink"
    ];

    const newErrors = {};

    // requiredFields.forEach(field => {
    //   if (!Links[field]) {
    //     console.log("failed", field);
    //     newErrors[field] = true;
    //   } else {
    //     console.log("passed", field);
    //     newErrors[field] = false;
    //   }
    // });


    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }
    else {
      setData({
        ...data,
        threeDLink: threeDLinkList,
        floorPlanLink: floorPlanLinkList,
        streetVideoLink: streetVideoLinkList,
        // ...Links
      });
      incrementStep();
    }
  }

  // https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11141.058633269495!2d76.52363025994042!3d31.713105043352662!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1699980312632!5m2!1sen!2sin

  return (
    <div className='bg-[#160019] flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-12 lg:p-16 gap-4 sm:gap-5 lg:mt-[80px]'>
      <HeaderTitle />
      <div className='my-5'>
        <Stepper activeStep={activeStep} className={'md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] w-[15rem]'} />
      </div>
      <LinkBar title='Add 3D Link' onClick={handleThreeDBtnClick} list={threeDLinkList} setList={setThreeDLinkList} />
      {
        errors.threeDLink &&
        <div className='w-full max-w-[30rem] px-5'>
          <Typography color='red'>*This field is required</Typography>
        </div>
      }
      <LinkBar onClick={handleFloorPlanBtn} title='Add Floor Plan Image' list={floorPlanLinkList} setList={setFloorPlanLinkList} />
      {
        errors.floorPlanLink && <div className=' w-full max-w-[30rem] px-5'>
          <Typography color='red'>*This field is required</Typography>
        </div>
      }
      <LinkBar onClick={handleStreetVideoBtn} title='Add Street Video Link' list={streetVideoLinkList} setList={setStreetVideoLinkList} />
      {
        errors.streetVideoLink && <div className=' w-full max-w-[30rem] px-5'>
          <Typography color='red'>*This field is required</Typography>
        </div>
      }
      <div className='justify-center flex flex-row gap-4 w-full container mx-auto'>
        <Button className='bg-transparent' onClick={() => {
          localStorage.clear();
          decrementStep(0);
        }}>
          Cancel
        </Button>
        <Button className={'normal-case text-[#FB3C98] border-1 border-[#FB3C98] rounded-[47px] bg-white px-8'} onClick={() => decrementStep(0)}>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className='normal-case text-[#FFFFFF] rounded-[47px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC] px-12'>
          Next
        </Button>
      </div>
    </div>
  );
}
