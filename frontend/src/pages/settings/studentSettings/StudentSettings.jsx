import SearchBar from "../../../components/searchBar/SearchBar";
import TabsBar from "../../../components/tabsBar/tabsBar";
import Setting from "../../../components/setttingsComp/Setting";
import { Link } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import "./StudentSettings.scss";

import { FiUser } from "react-icons/fi";
import { MdOutlineLocalCafe } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { MdCreditCard } from "react-icons/md";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { GoGraph } from "react-icons/go";

import { RiMastercardFill } from "react-icons/ri";
import { RiVisaLine } from "react-icons/ri";

function StudentSettings() {
  const { theme, toggleTheme } = useTheme();

  const creditCard = `${4}`;
  const numberCard = `•••• •••• •••• ${7955}`;
  const typeCard = creditCard[0] == 4 ? <RiVisaLine /> : <RiMastercardFill />;

  const openModalAddMoney = () => {

  }

  const openModalDetails = () => {

  }

  return (
    <div id="page-settings-student">
      <SearchBar />

      <main id="student-setttings">
        <section id="container-balance">
          <p className="balance-title">Your balance</p>
          <h1 className="amount-balance"> €45.02 </h1>
        </section>

        <section id="container-card-credit">
          <div id="carusel-credit-card">
            <div id="credit-card">{typeCard}</div>
            <div id="credit-card-add">
              <IoIosAddCircle />
              <h3 className="text-add-card">Añade tu visa</h3>
            </div>
          </div>
          <h2>{numberCard}</h2>
        </section>

        <section id="card-options">
          <div className="option-card add" onClick={openModalAddMoney}>
            <IoMdAddCircleOutline className="card-icon-option" />
            <h2>Add Money</h2>
          </div>
          <div className="option-card details" onClick={openModalDetails}>
            <MdCreditCard className="card-icon-option" />
            <h2>Card Details</h2>
          </div>
          <div className="option-card">
            <MdOutlineRemoveCircleOutline className="card-icon-option trash" />
            <h2>Remove Card</h2>
          </div>
        </section>

        <div id="settings-container">
          <Setting icon={<FiUser />} text={"Cuenta"} />

          <Setting
            icon={
              theme == "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />
            }
            text={"Tema"}
            toggle={true}
          />
          <Setting icon={<MdFavoriteBorder />} text={"Favoritos"} />
          <Setting icon={<MdOutlineLocalCafe />} text={"Mi Cafeteria"} />
          <Setting icon={<GoGraph />} text={"Creditos"} />
        </div>

        <section id="section-log-out">
          <Link to="/">
            <div className="container-logout">
              <IoIosLogOut />
              <h1>Logout</h1>
            </div>
            <p>v0.03</p>
          </Link>
        </section>
      </main>

      <TabsBar />
    </div>
  );
}

export default StudentSettings;
