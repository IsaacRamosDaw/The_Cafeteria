import './Category.scss'

function Category({title, img}){
  return (
      <div id="category">
      <a href="">
            <img src={img} alt="" />
            <p>{title}</p>      
      </a>
      </div>
    );
}

export default Category