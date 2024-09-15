import React from "react";

 
export function TabsDefault() {
  const [activeTab, setActiveTab] = React.useState("html");
  const data = [
    {
      label: "PROPERTIES",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "REMINDERS",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "NOTIFICATIONS",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    
  ];
  return (
    <>
   
    </>
  );
}