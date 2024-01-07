import React from "react";
import MainNavbar from "./navbar/MainNavbar";

const AppLayout = ({ chidern }) => {
  return (
    <>
      <MainNavbar />
      {chidern}
    </>
  );
};

export default AppLayout;
