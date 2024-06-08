import { useSelector } from "react-redux";
import "./index.css";

export default function Copy() {
  const confirmReport = useSelector(
    (state) => state.confirmReporter.confirmReport
  );
  const onClick = async (e) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(confirmReport);
      console.log("テキストがクリップボードにコピーされました");
    } catch (err) {
      console.error("テキストのコピーに失敗しました", err);
    }
  };

  return (
    <div className="confirm-button__wrapper">
      <button className="copy-button" onClick={onClick}></button>
    </div>
  );
}
