import MetaData from "../../MetaData";
import AllCheckButton from "../../buttons/all-check-button";
import ConfirmButton from "../../buttons/confirm-button";
import Header from "../../header";
import PDCA from "../../pdca";
import Tomorrow from "../../tomorrow";

const Home = () => {
  return (
    <>
      <Header />
      <MetaData />
      <PDCA />
      <AllCheckButton />
      <Tomorrow />
      <ConfirmButton />
    </>
  );
};

export default Home;
