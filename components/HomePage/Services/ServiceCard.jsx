import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ServiceCard(props) {
  const router = useRouter();
  const [role, setRole] = useState("");
  useEffect(() => {
    if (typeof window !== 'undefined' && document.cookie) {
      if(document.cookie.includes('role')){
        setRole(document.cookie.split(';').find(c=>c.includes('role')).split('=')[1]);
      }
    }
  }, []);

  const dynamicStyles = {
    backgroundImage: `url(${props.urlImage})`,
  };

  let hrefLink="";

  let title = props.title;
  if(title==="Digital Twinning"){
    if(role==="customer"){
      hrefLink="/book-a-demo"
    }
    else{
      hrefLink="/demo";
    }
    
  }
  else if(title==="Buy/Rent"){
    hrefLink="/properties"
  }
  else if(title==="Services"){
    hrefLink="/services"
  }
  else if(title==="Investment"){
    hrefLink="/properties"
  }
  else{
    hrefLink="/services"
  }

  return (
    <Card
      shadow={false}
      className="relative  h-[208px]  w-full max-w-[100%] items-center justify-center overflow-hidden text-center rounded-[16px] Satoshi font-normal"
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="absolute inset-0 m-0 h-full w-full rounded-[16px] bg-cover bg-center bg-blend-overlay bg-black/20 Satoshi"
        style={dynamicStyles}
      ></CardHeader>
      <div className="absolute inset-x-1 bottom-1 rounded-[16px] w-auto bg-[#17000B] h-[86px] opacity-80 Satoshi"></div>
      <Typography
        variant="h1"
        className="absolute inset-x-1 bottom-11 font-normal text-[20px] Satoshi leading-[32.4px] text-white mb-1 z-[1] Satoshi"
      >
        {props.title}
      </Typography>
      <div className="absolute inset-x-1 bottom-2 z-[1]">
        <Link href={hrefLink}>
          <Button className="w-10/12 bg-white text-[#FB3C98] border-1 border-[#FB3C98] rounded-full py-2">
            Take a Look
          </Button>
        </Link>
      </div>
    </Card>
  );
}
