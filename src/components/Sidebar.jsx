import React from "react";
import Cookies from 'js-cookie';
import Accounting from "./sidebars/Accounting";
import GeneralManager from "./sidebars/GeneralManager";
import Procurement from "./sidebars/Procurement";
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
    </>
  );
}

export default Sidebar;
