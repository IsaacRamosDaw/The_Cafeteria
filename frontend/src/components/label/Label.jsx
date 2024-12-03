import "./label.scss";

export default function Label({
  title,
  placeHolder,
  type = "text",
  id,
  select,
}) {
  if (select) {
    return (
      <div className="label-option">
        <label className="label-text" htmlFor={id}>
          {title}
        </label>
      </div>
    );
  }
  return (
    <div className="label-input">
      <label className="label-text" htmlFor={id}>
        {title}
      </label>
      <input type={type} placeholder={placeHolder} id={id} name={id} />
    </div>
  );
}
