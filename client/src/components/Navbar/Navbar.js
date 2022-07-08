import React, {useState} from "react";
import NavbarCSS from "./Navbar.module.css" ;
import { NavLink } from "react-router-dom";
import LogoutModal from "../Modals/LogoutModal/LogoutModal";
import useAuth from "../../hooks/useAuth";


const Navbar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const {user} = useAuth();

  return (
    <nav>
      <NavLink to="/" className={NavbarCSS.navLink}>
            <h3>my词典</h3>
      </NavLink>
      
      <ul className={NavbarCSS.navLinks}>
        {user ? 
          <>
            {/* Logged in links */}
            <NavLink to="/vocab" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
              <li>Vocab</li>
            </NavLink>
            <NavLink to="addvocab" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
              <li>Add Vocab</li>
            </NavLink>
            <button className={NavbarCSS.button} onClick={() => setIsLogoutModalOpen(true)} >Logout</button>
          </>
        : <>
            {/* Not logged in links */}
            <NavLink to="/register" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
              <li>Register</li>
            </NavLink>
            <NavLink to="/login" className={NavbarCSS.navLink} activeClassName={NavbarCSS.navLinkActive}>
              <li>Login</li>
            </NavLink>
          </>
        }
      </ul>
      {isLogoutModalOpen && <LogoutModal setIsLogoutModalOpen={setIsLogoutModalOpen} />}
    </nav>
  );
}

export default Navbar;
