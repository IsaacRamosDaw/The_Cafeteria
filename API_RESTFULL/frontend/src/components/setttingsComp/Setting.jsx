import { useTheme } from "../../contexts/ThemeContext";

import { Link } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa";
import Switch from "@mui/material/Switch";

import "./Setting.scss";

function Setting({ icon, text, to, toggle }) {
  const { theme, toggleTheme } = useTheme();

  if (toggle) {
    return (
      <div className="settings-card">
        <div className="content-setting">
          <div className="menu-item-icon">{icon}</div>
          <span className="menu-item-text">{text} </span>
        </div>
        <span>
          <Switch checked={ theme == "dark" ? false : true } onClick={toggleTheme} color="default" />
        </span>
      </div>
    );
  }

  return (
    <Link to={to}>
      <div className="settings-card">
        <div className="content-setting">
          <div className="menu-item-icon">{icon}</div>
          <span className="menu-item-text">{text}</span>
        </div>
        <FaChevronRight className="arrow-right-icon" />
      </div>
    </Link>
  );
}

export default Setting;
