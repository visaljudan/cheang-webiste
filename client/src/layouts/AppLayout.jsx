import MainNavbar from "./navbar/MainNavbar";
import Footer from "./footer/Footer";

const AppLayout = ({ children, page }) => {
  return (
    <>
      <MainNavbar page={page} />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
