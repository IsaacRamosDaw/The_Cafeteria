# Mejoras accesibilidad Aria
## Componentes actualizados:

### ***Componente label***

```js
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

```
### ***Componente button***

#### Antes:

```js
export default function Button({ icon, className = "welcome-submit", submit = true, text, onClick}) {
  return (
    <button
      onClick={onClick}
      className={className}
      type={submit ? "submit" : "button"}
    >
      {icon} {text}
    </button>
  );
}
```
#### Ahora:

```js
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
```
#### Llamada a Button desde archivo "Order"
```js
<Button className="btn-card-order btn-done" text={"Terminado"} onClick={cancelOrder} ariaLabel={"Eliminar este pedido"}
```

### ***Componente Searchbar***
#### Antes:
```js
<nav id="header-container">
  <div>
    {input ? (
      <input placeholder="Qué quieres comer..." type="text" name="search-bar"   id="search-bar"/>
      ) : (
      <h2> {userTitle} </h2>
    )}
  </div>
</nav>
```
#### Ahora:
```js
<nav id="header-container">
  <div>
    {input ? (
      <input placeholder="Qué quieres comer..." type="text" name="search-bar"   id="search-bar"   aria-label="Barra de búsqueda"/>
      ) : (
      <h2> {userTitle} </h2>
    )}
  </div>
</nav>
```
### ***Componente Input***
```js
const InputFormSetting = forwardRef(
  function InputFormSetting({
    id,
    title,
    placeholder,
    option = 1,
    disable = false,
    type = "text",
    required = false,
    ariaLabeledBy
  }, ref) {
    return (
      <div className="container-inputform-setting">
        {option === 2 ? (
          <>
            <label className="text-inputform-setting-2" htmlFor={title} id={ariaLabeledBy}>
              {title}
            </label>
            <input
              ref={ref}
              className="input-inputform-setting-2"
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              disabled={disable}
              required={required}
              aria-labelledby={ariaLabeledBy}
            />
          </>
        ) : (
          <>
            <label className="text-inputform-setting-1" htmlFor={title} id={ariaLabeledBy}>
              {title}
            </label>
            <input
              ref={ref}
              className="input-inputform-setting-1"
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              disabled={disable}
              required={required}
              aria-labelledby={ariaLabeledBy}
            />
          </>
        )}
      </div>
    );
  }
);
```

## Páginas actualizadas:

### ***Página de registro de estudiante*** "schoolform.jsx"

```js
 <main className="form-container">
      <form id="school-form">
        <h2>Schools</h2>
        <Label
          id="name-school"
          placeHolder="Name of the school"
          title="Name"
          type="text"
          aria-labelledby="Ingrese nombre del colegio"
        />
        <Label
          id="password-school"
          placeHolder="Password of the school"
          title="Password"
          type="password"
          aria-labelledby="Ingrese contraseña del colegio"
        />
        <Label
          id="phone-school"
          placeHolder="Phone of the school"
          title="Phone"
          type="number"
          aria-labelledby="Ingrese el número del colegio"
        />
        <Label
          id="adress-school"
          placeHolder="Adress of the school"
          title="Adress"
          type="text"
          aria-labelledby="Ingrese la dirección del colegio"
        />
        <div id="buttons">
          <Button onClick={handleCreate} text="Crear" />
          <Button onClick={handleEdit} text="Editar" />
        </div>
      </form>
    </main>
```
##### Lighthouse

![0e91c10f-452f-4414-b772-42b23d327e86 (1)](https://github.com/user-attachments/assets/a79b3ccf-e298-45eb-b846-2ee0ed7c8506)

![image](https://github.com/user-attachments/assets/9c3e48ed-1b80-4332-ba54-39fb7be8883b)

### ***Página de producto*** "product.page.jsx"

#### Llamada al button

```js
<div className="button-container-product-page">
  <Button
    className={`btn-product-quantity-page ${ordered ? "ordered" : ""}`}
    onClick={() => handleQuantity("+")}
    text={"+"}
    ariaLabel={"Aumentar cantidad del producto elegido"}
  />
  <Button
    className={`btn-product-quantity-page ${ordered ? "ordered" : ""}`}
    onClick={() => handleQuantity("-")}
    text={"-"}
    ariaLabel={"disminuir cantidad del producto elegido"}
  />
</div>
```
##### Lughthouse
![20b54bdf-a9b3-4bba-9a25-cb021a54e5e8](https://github.com/user-attachments/assets/e6034344-7054-49c6-87ba-65ee77da4c33)

![image](https://github.com/user-attachments/assets/8394318a-4c9a-423c-8e9e-af6e17eb76c0)

### ***Página de actualización de worker*** "workerUpdate.page.jsx"

### inputs actualizados y llamada a componente input  actualizada

```js
<section className="container-info">
  <div className="container-img-profile">
    <Avatar
    className="avatar-img"
    onClick={() => document.getElementById("file-input").click()}
    alt={userData.username}
    src={imgProfile || "/static/images/avatar/1.jpg"}
    sx={{ width: 90, height: 90 }}
    />
    <BiSolidPencil className="edit-mode-icon" />
  </div>
    <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    style={{ display: "none" }}
    id="file-input"
    />
    <h1> {userData.username} </h1>
    <p> {""} </p>
</section>
  <form onSubmit={HandleEdit} className="container-inputs">
  <InputFormSetting
  title={"Nombre"}
  option={2}
  placeholder={userData.username}
  ref={usernameRef}
  ariaLabeledBy="name-update-label"
  />
  <InputFormSetting
  title={"Contraseña"}
  option={2}
  placeholder={userData.phone}
  type="password"
  ref={passwordRef}
  ariaLabeledBy="password-update-label"
  />
  <InputFormSetting
  title={"Telefono"}
  option={2}
  placeholder={"Numero de telefono"}
  ref={phoneRef}
  ariaLabeledBy="phone-update-label"
  />
  <div className="container-btn-account">
  <Button text={"Actualizar"} submit={true} />
  </div>
</form>

```
##### Ligthouse
![5f87ee31-829c-4473-87e8-9468b1f94441](https://github.com/user-attachments/assets/a085daa7-c622-42fd-9e37-80aea2dbc997)

![image](https://github.com/user-attachments/assets/6907cd1d-e3fd-4aa8-b330-57aba31f6cd7)
