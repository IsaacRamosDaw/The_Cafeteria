import "./label.scss";
import { forwardRef } from "react";

const Label = forwardRef(function Label(
  { title, placeHolder, type = "text", id, name, onChange, arialabelledby},
  ref
) {

  if (type === "file") {
    return (
      <div className="label-input">
        <label className="label-text" htmlFor={id} id={arialabelledby}>
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
          aria-labelledby={arialabelledby}
        />
      </div>
    );
  }

  return (
    <div className="label-input">
      <label className="label-text" htmlFor={id} id={arialabelledby}>
        {title}
      </label>
      <input
        type={type}
        placeholder={placeHolder}
        id={id}
        name={name}
        onChange={onChange}
        ref={ref}
        aria-labelledby={arialabelledby}
      />
    </div>
  );
});

export default Label;
