import PDCA from "../pdca";

export default function PDCAList() {
  const pdcaList = ["aaa", "bbb"];
  return (
    <>
      {pdcaList.map((item, index) => (
        <PDCA key={index} />
      ))}
    </>
  );
}
