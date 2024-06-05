import "./index.css";

const AllCheckButton = ({ onClick }) => {
  return (
    <div className="all-check-button__wrapper">
      <button className="all-check-button" onClick={onClick}></button>
    </div>
  );
};

export default AllCheckButton;
