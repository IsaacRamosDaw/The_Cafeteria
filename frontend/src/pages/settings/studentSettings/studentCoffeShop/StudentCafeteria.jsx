import "./StudentCafeteria.scss"
import SearchBar from "../../../../components/searchBar/SearchBar"
import Separator from "../../../../components/separator/Separator"
import TabsBar from "../../../../components/tabsBar/TabsBar"
function MyCafeteria() {
  return (
    <>
    <SearchBar/>
    <Separator/>
    <div id="myCafeteria">
      <main id="user-content">
        <h1>The Muggins</h1>
        <div>
          <img
            src="../../../../../public/images/settings/coffeImage.jpg" // Reemplaza con tu imagen
            alt="The Muggins"
            
          />
        </div>

        <section>
          <h2>Manejada por</h2>
          <div>
            <div className="handler-item">
              <span>Erika</span>
                <img
                  src="https://via.placeholder.com/24" 
                  alt="Profile Icon"
                />
            </div>
            <div className="handler-item">
              <span>Tiburcio</span>
                <img
                  src="https://via.placeholder.com/24"
                  alt="Profile Icon"
                />
            </div>
            <div className="handler-item">
              <span>Ayoze</span>
                <img
                  src="https://via.placeholder.com/24" 
                  alt="Profile Icon"
                />
            </div>
          </div>
        </section>
      </main>
    </div>
    <TabsBar/>
    </>
  )
}

export default MyCafeteria;