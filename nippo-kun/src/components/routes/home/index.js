import MetaData from "../../MetaData";
import Header from "../../header";
import PDCA from "../../pdca";

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
