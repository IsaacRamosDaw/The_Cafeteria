import SchoolCard from '../schoolCard/SchoolCard'
import './SchoolContainer.scss'

export default function SchoolContainer(){
    return(
        <section className='section-school-container'>
            <SchoolCard name={"Colegio 1"} image={"/images/ImgMenus/sandwiches.jpg"} />
            <SchoolCard name={"Colegio 2"} image={"/images/ImgMenus/sandwiches.jpg"} />
            <SchoolCard name={"Colegio 3"} image={"/images/ImgMenus/sandwiches.jpg"} />
        </section>
    )
}