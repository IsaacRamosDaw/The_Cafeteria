import "./label.scss";
import { forwardRef } from "react";

const Label = forwardRef(function Label(
  { title, placeHolder, type = "text", id, name, onChange },
  ref
) {
  if (type === "select") {
    return (
      <div className="label-option">
        <label className="label-text" htmlFor={id}>
          {title}
        </label>
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className="label-input">
        <label className="label-text" htmlFor={id}>
          {title}
        </label>
        <input
          type="file"
          accept="image/*"
          placeholder={placeHolder}
          id={id}
          name={name}
          onChange={onChange}
          ref={ref}
        />
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
        ref={ref}
      />
    </div>
  );
});

export default Label;
