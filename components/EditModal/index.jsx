import BACKEND_URL from '@/apiUrl';
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';

export default function Modal({showModal, setShowModal, profBio, setProfBio,  token}) {
    // console.log(data);

    // const [fname, setFName] = useState(data.firstName);
    // const [lname, setLName] = useState(data.lastName);
    // const [email, setEmail] = useState(data.email);
    const [shortBio, setShortBio] = useState();

    const saveChanges = async (e) => {
        console.log("prunashh" , shortBio);
        e.preventDefault();
        
        // console.log("data", bio)
        try {
            console.log("data", shortBio)
          const response = await axios.put(`${BACKEND_URL}/api/customers/editProfile`, {
            bio: shortBio
          }, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Profile updated:', response);
          if(response.status === 200){
            toast.success('Profile updated successfully');
            setProfBio(shortBio);
            setShowModal(false);
          }
          // Optionally, update the profile state or take any further action
        } catch (error) {
          console.log(error);
          toast.error('Error updating profile');
        }
      };


      const handleBioChange = (e) => {
        console.log("noo", e.target.value)
        setShortBio(e.target.value);
      }
    
    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80'>
            <div id="crud-modal" tabindex="-1" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden absolute top-50 z-50 ${showModal ? '' : 'hidden'}`}>
                <div className="relative p-4 w-full max-w-md max-h-full ">
                    <div className="relative bg-[#160019] rounded-lg shadow w-96 text-white ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-lg font-semibold">
                                Edit Profile
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal" onClick={setShowModal}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5 w-96  overflow-y-auto h-[25rem]" >
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                {/* <div className="col-span-2 w-full">
                                    <label for="fname" className="block mb-2 text-sm font-medium">First Name</label>
                                    <input type="text" name="fname" id="fname" className="border text-white border-white bg-[#160019] text-sm rounded-lg block w-full p-2.5" placeholder="Enter First Name" required="" value={fname} onChange={(e) => setFName(e.target.value)} />
                                </div> */}
                                {/* <div className="col-span-2 w-full">
                                    <label for="lname" className="block mb-2 text-sm font-medium">Last Name</label>
                                    <input type="text" name="lname" id="lname" className="border text-white border-white bg-[#160019] text-sm rounded-lg block w-full p-2.5" placeholder="Enter Last Name" required="" value={lname} onChange={(e) => setLName(e.target.value)} />
                                </div>                                 */}
                                {/* <div className="col-span-2 w-full">
                                    <label for="email" className="block mb-2 text-sm font-medium">Email Id</label>
                                    <input type="email" name="email" id="email" className="border text-white border-white bg-[#160019] text-sm rounded-lg block w-full p-2.5" placeholder="Enter Email Id" required="" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div> */}
                                <div className="col-span-2">
                                    <label htmlFor="bio" className="block mb-2 text-sm font-medium">Bio</label>
                                    <textarea id="bio" rows="4" className="border text-white border-white bg-[#160019] text-sm rounded-lg block w-full p-2.5" placeholder="Enter Bio" value={shortBio} onChange={handleBioChange}></textarea>
                                </div>
                            </div>
                            <button  onClick={saveChanges} className="normal-case text-[#FFFFFF] rounded-[47px]   bg-gradient-to-r from-[#2934FE] to-[#BF32EC] py-2 my-2 px-5">
                                Save Changes                                
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
