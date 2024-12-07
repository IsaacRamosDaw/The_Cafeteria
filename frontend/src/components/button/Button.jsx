import "./button.scss";

export default function Button({ className = "welcome-submit", submit = true, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={className}
      type={submit ? "submit" : "button"}
    >
      {text}
    </button>
  );
}
