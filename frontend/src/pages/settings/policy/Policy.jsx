import './Policy.scss'

function Policy() {
	return (
		<div className="privacy-container">
			<div className="header">
				<a href="#" className="back-button">←</a>
				<h1>Privacidad</h1>
			</div>
			<div className="card-container">
				<div className="card">
					<h2>Icon</h2>
					<p>Comprobación de configuración de privacidad</p>
					<p>
						Algunas herramientas como la comprobación te permiten controlar tu
						privacidad fácilmente
					</p>
				</div>
				<div className="card">
					<h2>Icon</h2>
					<p>Comprobación de configuración de privacidad</p>
					<p>
						Algunas herramientas como la comprobación te permiten controlar tu
						privacidad fácilmente
					</p>
				</div>
			</div>
			<div className="description">
				<h2>Configuración para ayudarte a controlar tu privacidad</h2>
				<p>
					Hemos creado opciones de configuración fáciles de usar para que tomes
					las decisiones de privacidad que consideres adecuadas.
				</p>
				<div className="image-container">
					<img
						src="ruta-de-tu-imagen"
						alt="Icono de configuración"
					/>
				</div>
				<button className="privacy-button">
					Administración de privacidad
				</button>
			</div>
		</div>
	);
}

export default Policy;