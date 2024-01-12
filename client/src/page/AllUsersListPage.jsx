import AppLayout from "../layouts/AppLayout";
import UsersList from "../selector/usersList/UsersList";

const AllUsersListPage = () => {
  return (
    <AppLayout page="service">
      <UsersList />
    </AppLayout>
  );
};

export default AllUsersListPage;
