import React from "react";
import { FiSettings } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { VscQuestion } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";

import "./Header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <div>
        <GiHamburgerMenu></GiHamburgerMenu>
        <VscQuestion />
      </div>
      <div>Wordle</div>
      <div>
        <ImStatsBars></ImStatsBars>
        <FiSettings></FiSettings>
      </div>
    </div>
  );
};

export default Header;
