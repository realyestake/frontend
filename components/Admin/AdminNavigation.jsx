import React, { useEffect, useState } from "react";
import AdminLogin from "./Login";
import AdminNavbar from "./Navbar";

 
export function AdminNavigationBar({logout, user, role}) {
  console.log("navbar", role);
  
  
  return (
    <div>
      {user.value && (role==="admin") ? <AdminNavbar logout={logout} user={user} userAdmin={role}/> : <AdminLogin />}
    </div>
  );
}