import { Link } from 'react-router-dom';
import './SchoolCard.scss'

export default function SchoolCard({name, image}){

    return (
      <div className="school-card">
        <img
          className="item-img"
          src={image}
          alt="Image school"
        />

        <hr className='separator-school-card' />
        
        <div className='info'>
          <h2>{name}</h2>
          <span>
            <Link className="link-to-register" to="/createSchools">
              <img src="/images/icons/edit.svg" alt="Img edit" />
            </Link>
            <Link className="link-to-register" to="#">
              <img src="/images/icons/trash.svg" alt="Img trash Can" />
            </Link>
          </span>
        </div>
      </div>
    );
}