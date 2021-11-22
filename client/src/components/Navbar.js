import React from "react";
import { NavLink } from "react-router-dom";
import NavbarCSS from "./Navbar.module.css" 

const Navbar = props => {

  const {studyLang, setStudyLang} = props;

  return (
    <nav>
      <h3>Logo</h3>
      <button onClick={() => setStudyLang(studyLang === 'zh' ? 'ja' : 'zh')}>Switch Lang</button>
      <ul className={NavbarCSS.navLinks}>
        <NavLink exact to="/" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
          <li>Vocab</li>
        </NavLink>
        <NavLink exact to="/addvocab" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
          <li>Add Vocab</li>
        </NavLink>

      </ul>
    </nav>
  );
}

export default Navbar;
