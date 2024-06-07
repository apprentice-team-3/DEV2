import MetaData from "../../MetaData";
import AllCheckButton from "../../buttons/all-check-button";
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
    </>
  );
};

export default Home;
