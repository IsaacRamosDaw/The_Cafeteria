import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import './WorkerCoffeShop.scss'
function WorkerCoffeShop() {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div id="worker-coffe-shop">
			<Link onClick={handleBack}>
				<FaArrowLeftLong />
			</Link>
			<main id="workers-container">
				<h2>Trabajadores</h2>
				<div className="worker-card">
					<p>Erika</p>
					<p>Foto</p>
				</div>
				<div className="worker-card">
					<p>Juanpedro</p>
					<div>Foto</div>
				</div>
			</main>
			<section id="resume">
				<h2>Resumen</h2>
				<div id='data'>
					<div className='data-field'>
						<p>Pedidos Totales</p>
						<p>40</p>
					</div>
					<div className='data-field'>
						<p>Pedidos Totales</p>
						<p>40</p>
					</div>
					<div className='data-field'>
						<p>Pedidos Totales</p>
						<p>40</p>
					</div>
					<div className='data-field'>
						<p>Pedidos Totales</p>
						<p>40</p>
					</div>
				</div>
			</section>
			<section id='graphics'>
				{/* HAZ LO QUE NECESITES MANSOUR */}
			</section>
		</div>
	)
}

export default WorkerCoffeShop 	