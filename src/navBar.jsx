import React from "react";
import { NavLink, Link } from "react-router-dom";
const NavBar = () => {
  const isValid = localStorage.getItem("jwtToken") !== null ? true : false;

  return (
    <div className="header__lower container">
      {/* <!-- navigation --> */}
      <nav className="nav">
        <ul className="nav__items list list--hr">
          {/* <!-- items --> */}
          <li className="nav__item">
            <NavLink className="nav__link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav__item dropdown ">
            {/* <!-- title --> */}
            <Link className="nav__link dropdown__header" to="/">
              Products
            </Link>
            {/* <!-- items --> */}
            <div className="dropdown__body">
              <ul className=" list">
                <li className="list__item">
                  <Link className="nav__inner-link" to="/">
                    Product Listing
                  </Link>
                </li>

                {isValid && (
                  <li className="list__item">
                    <Link className="nav__inner-link" to="/addItem">
                      Add Product
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to="contactus">
              Contact Us
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to="aboutus">
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
