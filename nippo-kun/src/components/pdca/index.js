import Add from "../buttons/add";
import Minus from "../buttons/minus";
import "./index.css";
import Single from "./single";
import TotalReview from "./total-review";

export default function PDCA({ item }) {
  const { planBlock, doBlock, checkBlock, actionBlock } = item;

  return (
    <>
      <section className="single__wrapper">
        <Single title="Plan" order={"Plan"} value={planBlock} />
        <Single title="Do" order={"Do"} value={doBlock} />
        <Single title="Check" order={"Check"} value={checkBlock} />
        <Single title="Action" order={"Action"} value={actionBlock} />
      </section>
      <div className="button__wrapper">
        <Add />
        <Minus />
      </div>
      <TotalReview />
    </>
  );
}
