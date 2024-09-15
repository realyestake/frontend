import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import InputBox from "@/components/Input/InputBox";
import Stepper from "./Stepper";
import HeaderTitle from "../HeaderTitle";
import TextAreaBox from "@/components/Input/TextAreaBox";
import Counter from "./Counter";
import Selecter from "./Selecter";
import Search from "./Search";

export default function Detials({ incrementStep, decrementStep, activeStep, data, setData }) {

  const [itemData, setItemData] = useState({
    propName: '',
    ownerName: '',
    price: 0,
    address: '',
    pincode: '',
    details: '',
    premium: false,
    listingType: 'sale',
    propertyType: 'investment',
    businessType: 'individual',
    area: 0,
    facing: 'east',
    numberOfFloors: '',
    location: '',
    bhk: 0,
    bathrooms: 0,
    balconies: 0,
    carParking: 0,
  });

  React.useEffect(() => {
    console.log(localStorage.getItem('details'));
    setItemData({
      ...itemData,
      propName: localStorage.getItem('propName') || '',
      ownerName: localStorage.getItem('ownerName') || '',
      price: parseInt(localStorage.getItem('price')) || 0,
      address: localStorage.getItem('address') || '',
      pincode: parseInt(localStorage.getItem('pincode')) || 0,
      details: localStorage.getItem('details') || '',
      premium: localStorage.getItem('premium') === 'true' ? true : false,
      listingType: localStorage.getItem('listingType') || 'sale',
      propertyType: localStorage.getItem('propertyType') || 'investment',
      businessType: localStorage.getItem('businessType') || 'individual',
      area: parseInt(localStorage.getItem('area')) || 0,
      facing: localStorage.getItem('facing') || 'east',
      numberOfFloors: localStorage.getItem('numberOfFloors') || '',
      location: localStorage.getItem('location') || '',
      bhk: parseInt(localStorage.getItem('bhk')) || 0,
      bathrooms: parseInt(localStorage.getItem('bathrooms')) || 0,
      balconies: parseInt(localStorage.getItem('balconies')) || 0,
      carParking: parseInt(localStorage.getItem('carParking')) || 0,
    })
  }, []);

  const [errors, setErrors] = useState({});

  const ItemInput = [
    {
      label: 'Property Name',
      value: itemData.propName,
      setValue: (value) => setItemData({ ...itemData, propName: value }),
      placeholder: 'Property Name',
      type: 'text',
      errLabel: 'Property Name is required',
      error: errors.propName,
      id: 'propName'
    },
    {
      label: 'Owner Name',
      value: itemData.ownerName,
      setValue: (value) => setItemData({ ...itemData, ownerName: value }),
      placeholder: 'Owner Name',
      type: 'text',
      errLabel: 'Owner Name is required',
      error: errors.ownerName,
      id: 'ownerName'
    },
    {
      label: 'Price',
      value: itemData.price === 0 ? '' : itemData.price,
      setValue: (value) => setItemData({ ...itemData, price: value }),
      placeholder: 'Price',
      type: 'number',
      errLabel: 'Enter a valid price',
      error: errors.price,
      id: 'price'
    },
    {
      label: 'Pincode',
      value: itemData.pincode === 0 ? '' : itemData.pincode,
      setValue: (value) => setItemData({ ...itemData, pincode: value }),
      placeholder: 'Pincode',
      type: 'number',
      errLabel: 'Enter a valid pincode',
      error: errors.pincode,
      id: 'pincode'
    },
    {
      label: 'Area (sq.ft)',
      value: itemData.area === 0 ? '' : itemData.area,
      setValue: (value) => setItemData({ ...itemData, area: value }),
      placeholder: 'Area (sq.ft)',
      type: 'number',
      errLabel: 'Enter a valid area',
      error: errors.area,
      id: 'area'
    },
    {
      label: 'Number of Floors',
      value: itemData.numberOfFloors === 0 ? '' : itemData.numberOfFloors,
      setValue: (value) => setItemData({ ...itemData, numberOfFloors: value }),
      placeholder: 'Number of Floors',
      type: 'number',
      errLabel: 'Enter a valid number of floors',
      error: errors.numberOfFloors,
      id: 'numberOfFloors'
    },
    {
      label: 'Location',
      value: itemData.location,
      setValue: (value) => setItemData({ ...itemData, location: value }),
      placeholder: 'Location',
      type: 'text',
      errLabel: 'Location is required',
      error: errors.location,
      id: 'location'
    }
  ]

  const ItemTextArea = [
    {
      label: 'Details',
      value: itemData.details,
      setValue: (value) => setItemData({ ...itemData, details: value }),
      placeholder: 'Details',
      type: 'text',
      errLabel: 'Details are required',
      error: errors.details,
      id: 'details'
    },
    {
      label: 'Address',
      value: itemData.address,
      setValue: (value) => setItemData({ ...itemData, address: value }),
      placeholder: 'Address',
      type: 'text',
      errLabel: 'Address is required',
      error: errors.address,
      id: 'address'
    }
  ]

  const ItemSelect = [
    {
      label: 'Sale',
      value: itemData.listingType,
      setValue: (value) => setItemData({ ...itemData, listingType: value }),
      options: ['sale', 'rent', 'private', 'showcase', 'lease'],
      id: 'listingType'
    }, {
      label: 'Investment',
      value: itemData.propertyType,
      setValue: (value) => setItemData({ ...itemData, propertyType: value }),
      options: ['investment', 'residential'],
      id: 'propertyType'
    }, {
      label: 'Individual',
      value: itemData.businessType,
      setValue: (value) => setItemData({ ...itemData, businessType: value }),
      options: ['individual', 'business'],
      id: 'businessType'
    }, {
      label: 'Facing',
      value: itemData.facing,
      setValue: (value) => setItemData({ ...itemData, facing: value }), 
      options: ['east', 'west', 'north', 'south'],
      id: 'facing'
    },
  ]

  const Counters = [
    {
      title: 'BHK',
      value: itemData.bhk,
      setValue: (value) => setItemData({ ...itemData, bhk: value }),
      errLabel: 'BHK is required',
      error: errors.bhk,
      id: 'bhk'
    },
    {
      title: 'Bathrooms',
      value: itemData.bathrooms,
      setValue: (value) => setItemData({ ...itemData, bathrooms: value }),
      errLabel: 'Bathrooms are required',
      error: errors.bathrooms,
      id: 'bathrooms'
    },
    {
      title: 'Balconies',
      value: itemData.balconies,
      setValue: (value) => setItemData({ ...itemData, balconies: value }),
      errLabel: 'Balconies are required',
      error: errors.balconies,
      id: 'balconies'
    },
    {
      title: 'Car Parking',
      value: itemData.carParking,
      setValue: (value) => setItemData({ ...itemData, carParking: value }),
      errLabel: 'Car Parking is required',
      error: errors.carParking,
      id: 'carParking'
    }
  ]


  const handleNext = () => {
    const requiredFields = [
      "propName",
      "ownerName",
      "price",
      "address",
      "pincode",
      "details",
      "listingType",
      "propertyType",
      "businessType",
      "area",
      "facing",
      "numberOfFloors",
      "location",
    ];

    const newErrors = {};

    requiredFields.forEach(field => {
      if(field === 'price' && itemData[field] <= 0) {
        newErrors[field] = true;
      }
      else if(field === 'pincode' && itemData[field] <= 0) {
        newErrors[field] = true;
      }
      else if(field === 'area' && itemData[field] <= 0) {
        newErrors[field] = true;
      }
      else if(field === 'numberOfFloors' && itemData[field] <= 0) {
        newErrors[field] = true;
      }
      else if (!itemData[field]) {
        console.log("failed", field);
        newErrors[field] = true;
      } else {
        console.log("passed", field);
        newErrors[field] = false;
      }
    });


    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }
    else {

      setData({
        ...data,
        ...itemData
      })
      incrementStep();

    }
  }

  console.log("itemData", itemData);

  return (
    <div className="bg-[#160019] flex min-h-screen flex-col items-center justify-between p-24 sm:p-8 md:p-12 lg:p-16 gap-4 sm:gap-5 mt-[100px]">
      <div className="text-center items-center justify-center">
        <HeaderTitle />
      </div>
      <div className="my-5">
        <Stepper
          activeStep={activeStep}
          className={
            "md:w-[30rem] lg:w-[30rem] xl:w-[30rem] 2xl:w-[30rem] w-[15rem]"
          }
        />
      </div>

      {
        ItemInput.map((item, index) => (
          <>
            {
              item.id != 'ownerName' ? (<InputBox
                key={index}
                className="w-full max-w-[30rem] p-2 border rounded bg-white/20 text-white"
                label={item.label}
                placeholder={item.placeholder}
                setValue={item.setValue}
                type={item.type}
                value={item.value}
                id={item.id}
              />) : (
                <Search
                  key={index}
                  label={item.label}
                  setQuery={item.setValue}
                  query={item.value}
                  placeholder={item.placeholder}
                  type={item.type}
                  value={item.value}
                  id={item.id}
                />
              )
            }
            {

              item.error &&
              <div className="w-full max-w-[30rem]">
                <p className="text-red-500 text-sm">*{item.errLabel}</p>
              </div>
            }
          </>
        ))
      }

      {
        ItemTextArea.map((item, index) => (
          <>
            <TextAreaBox
              key={index}
              label={item.label}
              value={item.value}
              className="w-full max-w-[30rem] p-2 border rounded bg-white/20 text-white"
              placeholder={item.placeholder}
              setValue={item.setValue}
              id={item.id}
            />
            {

              item.error &&
              <div className="w-full max-w-[30rem]">
                <p className="text-red-500 text-sm">*{item.errLabel}</p>
              </div>
            }
          </>
        ))
      }

      {
        ItemSelect.map((item, index) => (
          <>
            <Selecter
              key={index}
              label={item.label}
              value={item.value}
              setValue={item.setValue}
              options={item.options}
              id={item.id}
            />
          </>
        ))
      }

      {
        Counters.map((item, index) => (
          <>
            <Counter
              key={index}
              title={item.title}
              value={item.value}
              setValue={item.setValue}
              id={item.id}
            />
            {
              item.error &&
              <div className="w-full max-w-[30rem]">
                <p className="text-red-500 text-sm">*{item.errLabel}</p>
              </div>
            }
          </>
        ))
      }

      <div className="flex items-center w-full max-w-[30rem]">
        <input
          type="checkbox"
          checked={itemData.premium}
          onChange={(e) => {
            localStorage.setItem('premium', e.target.checked);
            setItemData({ ...itemData, premium: e.target.checked })
          }
          }
          value={itemData.premium}
        />
        <p className="text-white text-sm ml-2">Mark Property as Premium</p>
      </div>
      <div className='justify-end flex flex-row gap-4 w-full max-w-[30rem] '>
        <Button onClick={handleNext} className={'normal-case text-[#FFFFFF] rounded-[47px] bg-gradient-to-r from-[#2934FE] to-[#BF32EC] px-12'}>
          Next
        </Button>
      </div>
    </div>
  );
}
