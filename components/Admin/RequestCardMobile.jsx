import { Typography } from "@material-tailwind/react"

const RequestCardMobile = (props) => {
    return(
      <div className="flex flex-col my-3 bg-[#ffffff38] rounded-[10px] border-2 border-[#ffffff1a]">
        <div className="flex flex-row justify-start p-4 items-start cursor-pointer gap-2">
          <div class="flex items-center gap-4 ">
            <img
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              class="inline-block relative object-cover object-center !rounded-full w-10 h-10"
            />
          </div>
          <div className="flex flex-col gap-[5px] w-full ">
            <div className="flex flex-row justify-between w-full">
              <div>
              <h6 class="block Outfit md:text-[24px] text-[16px] antialiased md:font-bold  font-normal text-inherit">
                {props.name}
              </h6>
              <p class="md:block hidden text-[16px] Outfit font-bold leading-normal text-whiet">
                {props.title}:
                <span className="font-normal text-[#ffffff99] outfit">
                  {" "}
                  {props.property},To{" "}
                  <span className="font-bold">{props.to}</span>{" "}
                </span>
              </p>
              </div>
              <div className="Outfit md:text-[14px] text-[10px] md:font-medium font-normal leading-[12.6px]">
            <Typography variant="paragraph" color="white">
              {props.time}
            </Typography>
          </div>
            </div>
            <p class=" text-[10px] Outfit font-[300] leading-normal text-whiet">
                {props.title}:
                <span className="font-normal text-[#ffffff99] outfit">
                  {" "}
                  {props.property},To{" "}
                  <span className="font-bold">{props.to}</span>{" "}
                </span>
              </p>
            <div>
              
            </div>
          </div>
          
        </div>
      </div>
    )
  }

  export default RequestCardMobile