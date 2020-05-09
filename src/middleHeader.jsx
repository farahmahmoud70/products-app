import React from "react";
import { Link, NavLink } from "react-router-dom";
// import productImage from "../public/img/products/product-1.jpg";
const MiddleHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isValid =
    user !== null ? user.firstName + " " + user.lastName : "Login";
 
  return (
    <div className="header__middle container">
      {/* <!-- logo --> */}
      <a href="#" className="header__logo-box">
        <img className="header__logo" src="./img/logo.png" alt="" />
      </a>
      {/* <!-- user options --> */}
      <div className="header__user-options">
        {/* <!-- login control --> */}

          <Link to="/login" className="link">
            {isValid}
          </Link>

        <div className="dropdown">
          <div className="dropdown__header">
            <div
              className="image image--small image--circle"
              style={{ backgroundImage: " url('img/PersonalImage.png')" }}
            ></div>
          </div>
          <div className="dropdown__body"></div>
        </div>
        {/* <!-- shopping card dropdown --> */}
        {/* <!-- dropdown--opened to open --> */}
        <div className="dropdown dropdown--left  ">
          {/* <!-- header --> */}
          <div className="dropdown__header">
            <div
              className="image image--small"
              style={{
                backgroundImage: "url('img/icons/icon-cart-big.svg')"
              }}
            >
              <div className="notification notification--danger">1</div>
            </div>
          </div>
          {/* <!-- body --> */}
          <div className="dropdown__body">
            {/* <!-- items --> */}
            <ul className="dropdown__items list list--vr-separator">
              <li className="dropdown__item list__item">
                {/* <!-- item small 2 --> */}
                <div className="item-small-1">
                  {/* <!-- item data --> */}
                  <div className="item-small-1__data">
                    {/* <!-- title --> */}
                    <a href="" className="item-small-1__title">
                      Camera X1000
                    </a>
                    {/* <!-- price --> */}
                    <span className="item-small-1__description">1 X $890</span>
                  </div>
                  {/* <!-- item image --> */}
                  <div className="item-small-1__image-box">
                    <a
                      href="#"
                      className="item-small-1__image image"
                      style={{
                        backgroundImage: "url('img/products/product-1.jpg')"
                      }}
                    ></a>
                    <a href="#" className="item-small-1__action">
                      <i className="fas fa-times"></i>
                    </a>
                  </div>
                </div>
              </li>
              <li className="dropdown__item list__item">
                <div className="item-small-1">
                  {/* <!-- item data --> */}
                  <div className="item-small-1__data">
                    {/* <!-- title --> */}
                    <a href="" className="item-small-1__title">
                      Camera X2000
                    </a>
                    {/* <!-- price --> */}
                    <span className="item-small-1__description">2 X $990</span>
                  </div>
                  {/* <!-- item image --> */}
                  <div className="item-small-1__image-box">
                    <a
                      href="#"
                      className="item-small-1__image image"
                      style={{
                        backgroundImage: "url('img/products/product-1.jpg')"
                      }}
                    ></a>
                    <a href="" className="item-small-1__action">
                      <i className="fas fa-times"></i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            {/* <!-- totals --> */}
            <div className="separator"></div>
            <div className="block">
              <span className="lable">Total:</span>
              <span className="lable">$2870</span>
            </div>
            {/* <!-- actions --> */}
            <div className="block list list--hr">
              <a className="list-item btn btn--gray" href="">
                View Cart
              </a>
              <a className="list-item btn btn--primary" href="">
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiddleHeader;
