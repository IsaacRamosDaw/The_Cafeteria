import CardMenuHome from '../cardMenuHome/CardMenuHome'
import './MenuContainer.scss'

export default function MenuContainer(){
    return (
        <section className='menu-section-container'>
            <p>Contenedor de menus</p>
            <CardMenuHome />
        </section>
    )
}