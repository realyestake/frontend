import React from "react";
import Iframe from "react-iframe";

const Reminders = () => {
  return (
    <>
      <div className="my-6 flex justify-between">
        <div className="w-10">
          <Iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&showNav=0&title=RealYesTake%20Demo&showTabs=0&showPrint=0&showTz=0&showCalendars=0&showTitle=0&showDate=1&mode=MONTH&src=ZWI1OTJhZTJlYjQ4ZmViYWE0YTM5YTYyMWJiYTQ2ZTBhODUyNDA2NTQyZjM5NmExNjMxZDM3OTY5MTBkZTZiYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23C0CA33"
            style="border-width:0;
            background-color:red; text-color:red;"
            width="300"
            height="300"
            frameborder="0"
            scrolling="no"
            className=""
          />
        </div>
        <div className="w-90">
          <Iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&showNav=0&title=RealYesTake%20Demo&showTabs=0&showPrint=0&showTz=0&showCalendars=0&showTitle=0&showDate=0&mode=WEEK&src=ZWI1OTJhZTJlYjQ4ZmViYWE0YTM5YTYyMWJiYTQ2ZTBhODUyNDA2NTQyZjM5NmExNjMxZDM3OTY5MTBkZTZiYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23C0CA33"
            style="border-width:0 bg-color:red;"
            width="900"
            height="500"
            frameborder="0"
          />
        </div>
      </div>
    </>
  );
};

export default Reminders;
