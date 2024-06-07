import Digression from "./digression";
import Help from "./help";
import "./index.css";

export default function DigressionAndHelp() {
  return (
    <>
      <div className="digression__wrapper">
        <Digression />
        <Help />
      </div>
    </>
  );
}
