import "./index.css";

export default function Copy() {
  const onClick = (e) => {
    e.preventDefault();
    // dispatch(changeConfirm({}));
  };

  return (
    <div className="confirm-button__wrapper">
      <button className="copy-button" onClick={onClick}></button>
    </div>
  );
}
