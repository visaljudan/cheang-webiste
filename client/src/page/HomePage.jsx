import { useEffect, useState } from "react";
import AdsModal from "../components/adsModal/AdsModal";
import AppLayout from "../layouts/AppLayout";
import UsersSelector from "../selector/userSelector/UsersSelector";

const HomePage = () => {
  //AdsModal
  const [showAdModal, setShowAdModal] = useState(false);
  useEffect(() => {
    // const lastShownDate = localStorage.getItem("adModalLastShown");

    // If the modal has not been shown today or during the current session,
    // set the flag to display the modal
    // if (
    //   !lastShownDate ||
    //   new Date(lastShownDate).getDate() !== new Date().getDate() ||
    //   !sessionStorage.getItem("adModalShownDuringSession")
    // ) {
    //   setShowAdModal(true);
    //   localStorage.setItem("adModalLastShown", new Date().toISOString());
    //   sessionStorage.setItem("adModalShownDuringSession", "true");
    // }

    // Close the modal on page unload
    // const handleUnload = () => {
    setShowAdModal(true);
    // };

    // window.addEventListener("beforeunload", handleUnload);

    // return () => {
    //   window.removeEventListener("beforeunload", handleUnload);
    // };
  }, []);

  //Close Ad Modal
  const handleCloseAdModal = () => {
    setShowAdModal(false);
  };
  return (
    <AppLayout page="home">
      <UsersSelector />
      <div className="main-container">
        {showAdModal && <AdsModal onClose={handleCloseAdModal} />}
      </div>
    </AppLayout>
  );
};

export default HomePage;
