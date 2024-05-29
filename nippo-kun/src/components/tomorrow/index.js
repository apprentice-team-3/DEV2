import "./index.css";
import Single from "./single";

export default function Tomorrow() {
  return (
    <section className="single__wrapper">
      <Single title="明日やること" placeholder="明日やることの内容" />
    </section>
  );
}
