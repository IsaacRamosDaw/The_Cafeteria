import "./button.scss";
export default function Button({ submit, text, onClick }) {
  if (submit) {
    return (
      <button onClick={onClick} className="welcome-submit" type="submit">
        {text}
      </button>
    );
  }
  return (
    <button onClick={onClick} className="welcome-submit">
      {text}
    </button>
  );
}
