import React from "react";
import Cookies from 'js-cookie';
import Accounting from "./sidebars/Accounting";
import GeneralManager from "./sidebars/GeneralManager";
import Procurement from "./sidebars/Procurement";
import Service from "./sidebars/Service";
function Sidebar() {
  const role = Cookies.get('data')
  return (
    <>
      {role === 'accounting' &&(
        <Accounting />
      )}
      {role === 'General Manager' &&(
        <GeneralManager />
      )}
      {role === 'Procurement Officer' &&(
        <Procurement />
      )}
      {role === 'Head of Service' &&(
        <Service />
      )}
      {role === 'Waitress' &&(
        <Service />
      )}
    </>
  );
}

export default Sidebar;
