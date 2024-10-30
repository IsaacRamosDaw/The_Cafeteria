import "./label.scss";

export default function Label({
  title,
  placeHolder,
  type = "text",
  id,
  select,
  schools
}) {
  let courses = ["1ºEso", "2ºEso", "3ºEso", "4ºEso", "1ºBachiller", "2ºBachiller"];
  
  let schoolsArray = ["Ies El Rincon","Ies Santa Isabel","Ies Siete Palmas","Ies Guanrteme","Ies Alonso quesada"];
  

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
