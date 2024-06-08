import MetaData from "../../MetaData";
import AllCheckButton from "../../buttons/all-check-button";
import ConfirmButton from "../../buttons/confirm-button";
import Header from "../../header";
import PDCAList from "../../pdca-list";
import Tomorrow from "../../tomorrow";

const Home = () => {
  return (
    <>
      <Header />
      <MetaData />
      <PDCAList />
      <AllCheckButton />
      <Tomorrow />
      <ConfirmButton />
    </>
  );
};

export default Home;
