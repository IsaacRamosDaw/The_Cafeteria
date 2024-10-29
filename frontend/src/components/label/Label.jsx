import "./label.scss";

export default function Label({
  title,
  placeHolder,
  type = "text",
  id,
  select,
}) {
  let courses = ["IES EL RINCON", "IES Santa Catalina", "CP La Feria"];

  if (select) {
    return (
      <div className="label-option">
        <label className="label-text" htmlFor={id}>
          {title}
        </label>
        <select name={id} id={id}>
          {courses.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
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
