import "./index.css";

export default function Confirm() {
  const onClick = (e) => {
    e.preventDefault();
    window.location.href = "/confirm";
  };

  return (
    <div className="confirm-button__wrapper">
      <button className="confirm-button" onClick={onClick}></button>
    </div>
  );
}
