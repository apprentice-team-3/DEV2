import { useSelector } from "react-redux";
import PDCA from "../pdca";

export default function PDCAList() {
  const pdcaList = useSelector(
    (state) => state.pdcaLister && state.pdcaLister.pdcaList
  );

  return (
    <>
      {pdcaList.map((item, index) => (
        <PDCA item={item} key={index} />
      ))}
    </>
  );
}
