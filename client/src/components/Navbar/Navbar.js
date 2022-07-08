import React, {useEffect, useState} from "react";
import NavbarCSS from "./Navbar.module.css" ;
import { NavLink } from "react-router-dom";
import LogoutModal from "../Modals/LogoutModal/LogoutModal";


const Navbar = props => {

  // const {studyLang, setStudyLang, user, setUser} = props;
  // const {user, setUser} = props;

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // useEffect(() => {
  //   !user && setIsLogoutModalOpen(false); 
  // },[user]);

  return (
    <nav>
     
      <NavLink to="/" className={NavbarCSS.navLink}>
            <h3>my词典</h3>
      </NavLink>

      {/* <button onClick={() => setStudyLang(studyLang === 'zh' ? 'ja' : 'zh')}>Switch Lang</button> */}
      
      <ul className={NavbarCSS.navLinks}>

        {/* Not logged in links */}
        {
          <NavLink to="/register" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
            <li>Register</li>
          </NavLink>
        }
        {
          <NavLink to="/login" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
            <li>Login</li>
          </NavLink>
        }

        {/* Logged in links */}
        {
          <NavLink to="/vocab" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
            <li>Vocab</li>
          </NavLink>
        }
        {
          <NavLink to="addvocab" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
            <li>Add Vocab</li>
          </NavLink>
        }
         {
          <button className={NavbarCSS.button} onClick={() => setIsLogoutModalOpen(true)} >Logout</button>
        }
      </ul>
      {isLogoutModalOpen && <LogoutModal setIsLogoutModalOpen={setIsLogoutModalOpen} />}
    </nav>
  );
}

export default Navbar;
