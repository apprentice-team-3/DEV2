import { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../../MetaData";
import AllCheckButton from "../../buttons/all-check-button";
import ConfirmButton from "../../buttons/confirm-button";
import DigressionAndHelp from "../../digression-and-help";
import Header from "../../header";
import PDCA from "../../pdca";
import Tomorrow from "../../tomorrow";

const Home = () => {
  const doneName = useSelector((state) => state.doneNamer.doneName);

  const pdcaList = useSelector((state) => state.pdcaLister.pdcaList);

  return (
    <>
      <Header />
      <MetaData />
      {pdcaList.map((item, key) => (
        <Fragment key={key}>{item.doneName === doneName && <PDCA />}</Fragment>
      ))}
      <AllCheckButton />
      <Tomorrow />
      <DigressionAndHelp />
      <ConfirmButton />
    </>
  );
};

export default Home;
