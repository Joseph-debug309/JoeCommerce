import "../css/Button.css";

// MyButton.jsx
const MyButton = ({ type = "button" }) => {
  return (
    <button type={type} className="uiverse-button">
      <span className="text">Submit</span>
    </button>
  );
};

export default MyButton;