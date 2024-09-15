import { AdminNavigationBar } from "@/components/Admin/AdminNavigation";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { NavigationBar } from "@/components/Navbars/UserNavbar";
import { SideNavBar } from "@/components/User/SideNavbar";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NextProgressBar from "nextjs-progressbar";

export default function App({ Component, pageProps }) {

  

  // console.log("role",role);

  return (
    <ThemeProvider>
      
      <Layout>
        <NextProgressBar 
        color="#bf32ec"
        height={3}
        />
      <Component {...pageProps} />
      </Layout>
      <Footer />
    </ThemeProvider>
  );
}
