import SchoolCard from '../schoolCard/SchoolCard';
import './SchoolsContainers.scss'

function SchoolsContainers() {
    
    return (
        <section id='schools-container'>
            <SchoolCard name="School 1" image="School.png" />
            <SchoolCard name="School 2" image="School.png" />
            <SchoolCard name="School 3" image="School.png" />
        </section>
    )
}

export default SchoolsContainers