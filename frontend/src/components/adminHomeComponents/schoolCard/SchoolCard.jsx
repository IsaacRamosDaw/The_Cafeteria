import './SchoolCard.scss'

export default function SchoolCard({name, image}){

    return (
        <div className="school-card-container">
            <img src={image} alt="Image school" />
            <p>{name}</p>
        </div>
    )
}