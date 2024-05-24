import "./index.css";
import Single from "./single";

export default function PDCA() {
  return (
    <section className="single__wrapper">
      <Single title="Plan" placeholder="Planの内容" />
      <Single title="Do" placeholder="Doの内容" />
      <Single title="Check" placeholder="Checkの内容" />
      <Single title="Action" placeholder="Actionの内容" />
    </section>
  );
}
