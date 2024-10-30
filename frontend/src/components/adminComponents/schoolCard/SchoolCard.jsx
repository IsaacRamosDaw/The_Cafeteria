import { Link } from 'react-router-dom';
import './SchoolCard.scss'

export default function SchoolCard({name, image}){

    return (
      <div id="card-container">
        <img src={image} alt="Image school" />
        <p>{name}</p>
        <Link className="link-to-register" to="/createAdmins">
          CLIKAME
        </Link>
      </div>
    );
}