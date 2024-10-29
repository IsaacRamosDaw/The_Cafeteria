import "./button.scss";
export default function Button({ submit, text }) {
  if (submit) {
    return (
      <button className="welcome-submit" type="submit">
        {text}
      </button>
    );
  }
  return <button className="welcome-submit">{text}</button>;
}
