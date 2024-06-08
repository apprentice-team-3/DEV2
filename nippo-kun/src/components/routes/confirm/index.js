import { useSelector } from "react-redux";
import Header from "../../header";
import Textarea from "../../textarea";

const Confirm = () => {
  const pdcaList = useSelector((state) => state.pdcaLister.pdcaList);

  return (
    <>
      <Header />
      <Textarea />
    </>
  );
};

export default Confirm;
