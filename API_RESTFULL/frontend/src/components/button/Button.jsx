import "./button.scss";

export default function Button({ icon, className = "welcome-submit", submit = true, text, onClick, ariaLabel}) {
  return (
    <button
      onClick={onClick}
      className={className}
      type={submit ? "submit" : "button"}
      aria-label={ariaLabel}
    >
      {icon} {text}
    </button>
  );
}
