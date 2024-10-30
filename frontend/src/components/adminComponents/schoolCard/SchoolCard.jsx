import { Link } from 'react-router-dom';
import './SchoolCard.scss'

export default function SchoolCard({name, image}){

    return (
      <div className="school-card">
        <img
          className="item-img"
          src="../../../../public/images/ImgMenus/sandwiches.jpg"
          alt="Image school"
        />
        
        <div className='info'>
          <p>{name}</p>
          <span>
            <Link className="link-to-register" to="/createAdmins">
              <img src="../../../../public/images/icons/edit.svg" alt="" />
            </Link>
            <Link className="link-to-register" to="/createAdmins">
              <img src="../../../../public/images/icons/trash.svg" alt="" />
            </Link>
          </span>
        </div>
      </div>
    );
}