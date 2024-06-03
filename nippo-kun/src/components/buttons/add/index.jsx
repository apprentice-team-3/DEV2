import "./index.css";

const Add = ({ onClick }) => {
  return (
    <div className="multi__button__container">
      <button className="multi__button add" onClick={onClick}></button>
    </div>
  );
};

export default Add;
