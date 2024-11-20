import "./InputFormSetting.scss";

export default function InputFormSetting({
  title,
  subvalue,
  type = 1,
  disable = false,
}) {
  return (
    <div className="container-inputform-setting">
      {type === 2 ? (
        <>
          <label className="text-inputform-setting-2" htmlFor={title}>
            {title}
          </label>
          <input
            className="input-inputform-setting-2"
            type="text"
            placeholder={subvalue}
            name={title}
            id={title}
            font
          />
        </>
      ) : (
        <>
          <label className="text-inputform-setting-1" htmlFor={title}>
            {title}
          </label>
          <input
            className="input-inputform-setting-1"
            type="text"
            placeholder={subvalue}
            name={title}
            id={title}
            disabled={disable}
          />
        </>
      )}
    </div>
  );
}
