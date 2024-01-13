import AppLayout from "../layouts/AppLayout";
import Label from "../components/label/Label";

const NotFoundPage = () => {
  return (
    <AppLayout>
      <div
        style={{
          width: "100%",
          height: "50vh",
          justifyItems: "center",
          alignContent: "center",
          marginTop: "10rem",
          textAlign: "center",
        }}
      >
        <Label label="Not Found Page" />
      </div>
    </AppLayout>
  );
};

export default NotFoundPage;
