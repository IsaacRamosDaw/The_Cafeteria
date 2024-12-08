import "./label.scss";

export default function Label({
  title,
  placeHolder,
  type = "text",
  id,
  name,
  onChange,
}) {
  if (type === "select") {
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
      <input
        type={type}
        placeholder={placeHolder}
        id={id}
        name={name}
        onChange={onChange}
      />
    </div>
  );
}