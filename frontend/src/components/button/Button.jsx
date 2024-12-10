import "./button.scss";

export default function Button({ icon, className = "welcome-submit", submit = true, text, onClick}) {
  return (
    <button
      onClick={onClick}
      className={className}
      type={submit ? "submit" : "button"}
    >
      {icon} {text}
    </button>
  );
}
