import { useSelector } from "react-redux";
import "./index.css";

export default function Copy() {
  const confirmReport = useSelector(
    (state) => state.confirmReporter.confirmReport
  );

  const tomorrowTodo = useSelector((state) => state.todo.tomorrow);

  const onClick = async (e) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(confirmReport);
      if (tomorrowTodo.length === 0) return;
      localStorage.setItem("yesterday", JSON.stringify(tomorrowTodo));
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
