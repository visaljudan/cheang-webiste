import AppLayout from "../layouts/AppLayout";
import UsersSelector from "../selector/userSelector/UsersSelector";

const HomePage = () => {
  return (
    <AppLayout page="home">
      <UsersSelector />
    </AppLayout>
  );
};

export default HomePage;
