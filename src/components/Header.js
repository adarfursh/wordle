import { React, useContext } from "react";
import { Context } from "../App";
import { FiSettings } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { VscQuestion } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";

import "./Header.css";

const Header = () => {
  const appState = useContext(Context);
  const statsClickHandler = () => {appState.setStatsClicked(!appState.statsClicked)};

  return (
    <div className="headerContainer">
      <div>
        <GiHamburgerMenu></GiHamburgerMenu>
        <VscQuestion />
      </div>
      <div>Wordle</div>
      <div>
        <ImStatsBars onClick={() => statsClickHandler()}></ImStatsBars>
        <FiSettings></FiSettings>
      </div>
    </div>
  );
};

export default Header;
