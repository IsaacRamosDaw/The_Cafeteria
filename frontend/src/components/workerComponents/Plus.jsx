import { Link } from "react-router-dom";
import './Plus.scss'

function Plus({url}) {

  return (
    <Link to={url} id="plus-container">
        <span>&#43;</span> 
    </Link>
  );
}

export default Plus;
