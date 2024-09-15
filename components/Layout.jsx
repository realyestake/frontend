import React from 'react'
import { AdminNavigationBar } from "@/components/Admin/AdminNavigation";
import Footer from "@/components/Footer";
import { NavigationBar } from "@/components/Navbars/UserNavbar";
import { SideNavBar } from "@/components/User/SideNavbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout ({children}) {
    const [user, setUser] = useState({value: null});
  const [key, setKey] = useState(0);
  const router = useRouter();
  let urlPath = router.pathname;
  urlPath = urlPath.split("/")[1];
  const [role, setRole] = useState(null);

  useEffect(()=>{
    if(document.cookie && document.cookie.includes('token')){
      const token = document.cookie.split(';').find(c=>c.includes('token')).split('=')[1];
      // if role is in cookie then set role
      if(document.cookie.includes('role')){
        const role = document.cookie.split(';').find(c=>c.includes('role')).split('=')[1];
        setRole(role);
        console.log("_app",role);
      }
    if(token){
      setUser({value: token});
      setKey(Math.random());
    }
    }
  }, [router.query])

  const logout=()=>{
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // remove role from cookie
    document.cookie = `role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setUser({value: null});
    setKey(Math.random());
    if(urlPath==="admin"){
      router.push("/admin");
    } else {
      router.push("/login");
    }
  }


  return (
    <>
        {urlPath==="admin" ? 
      <AdminNavigationBar logout={logout} user={user} role={role} />
        : 
      <div className="pl-4">
      <div className="lg:block hidden">
        <NavigationBar logout={logout} user={user} key={key} role={role} />
      </div>
      <div className="lg:hidden block">
        <SideNavBar logout={logout} user={user} key={key} role={role}  />
      </div>
    </div>
    }
    {children}
    </>
  )
}

