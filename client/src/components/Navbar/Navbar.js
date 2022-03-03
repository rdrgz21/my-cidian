import React from "react";
import { NavLink } from "react-router-dom";
import NavbarCSS from "./Navbar.module.css" 

const Navbar = props => {

  // const {studyLang, setStudyLang, user, setUser} = props;
  const {user, setUser} = props;

  return (
    <nav>
     
      <NavLink exact to="/" className={NavbarCSS.navLink}>
            <h3>my词典</h3>
      </NavLink>

      {/* <button onClick={() => setStudyLang(studyLang === 'zh' ? 'ja' : 'zh')}>Switch Lang</button> */}
      
      <ul className={NavbarCSS.navLinks}>
        {/* Not logged in links */}
        {!user && 
          <NavLink exact to="/register" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
            <li>Register</li>
          </NavLink>
        }
        {!user && 
          <NavLink exact to="/login" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
            <li>Login</li>
          </NavLink>
        }
        {/* Logged in links */}
        {user && 
          <NavLink exact to="/" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
            <li>Vocab</li>
          </NavLink>
        }
        {user && 
          <NavLink exact to="/addvocab" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
            <li>Add Vocab</li>
          </NavLink>
        }

      </ul>
    </nav>
  );
}

export default Navbar;
