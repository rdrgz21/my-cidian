import React from "react";
import { NavLink } from "react-router-dom";
import NavbarCSS from "./Navbar.module.css" 

export default function Navbar() {
  return (
    <nav>
      <h3>Logo</h3>
      <ul className={NavbarCSS.navLinks}>
        <NavLink exact to="/" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
          <li>Vocab</li>
        </NavLink>
        <NavLink exact to="/addvocab" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
          <li>Add Vocab</li>
        </NavLink>
        {/* <NavLink exact to="/sentences" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
          <li>Sentences</li>
        </NavLink>
        <NavLink exact to="/addsentence" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
          <li>Add Sentence</li>
        </NavLink> */}
        <NavLink exact to="/addchinese" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
          <li>Add Chinese</li>
        </NavLink>
      </ul>
    </nav>
  );
}
