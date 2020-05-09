import React, { Component } from "react";
class UpperHeader extends Component {
  state = {};
  render() {
    return (
      <div className="header__upper">
        {/* <!-- container --> */}
        <div className="container">
          {/* <!-- contact info --> */}
          <ul className="list list--hr list--hr-separator">
            <li className="list__item">
              <span className="info">
                {/* <!-- icon --> */}
                <i className="info__icon far fa-dot-circle"></i>
                {/* <!-- info --> */}
                <span className="info__data">1234 Street Name, City Name</span>
              </span>
            </li>
            <li className="list__item">
              <a href="#" className="info">
                {/* <!-- icon --> */}
                <i className="info__icon fab fa-whatsapp"></i>
                {/* <!-- info --> */}
                <span className="info__data">123-456-7890</span>
              </a>
            </li>
            <li className="list__item">
              <a href="#" className="info">
                {/* <!-- icon --> */}
                <i className="info__icon far fa-envelope"></i>
                {/* <!-- info --> */}
                <span className="info__data">mail@domain.com</span>
              </a>
            </li>
          </ul>
          {/* <!-- side menu --> */}
          <ul className="list list--hr">
            <li className="list__item">
              <a href="#" className="link">
                {/* <!-- icon --> */}
                <i className="link__icon fas fa-angle-right"></i>
                {/* <!-- info --> */}
                About Us
              </a>
            </li>
            <li className="list__item">
              <a href="#" className="link">
                {/* <!-- icon --> */}
                <i className="link__icon fas fa-angle-right"></i>
                {/* <!-- info --> */}
                Contact Us
              </a>
            </li>
            {/* <!-- languges --> */}
            <li className="list__item">
              {/* <!-- drop down --> */}
              {/* <!-- to oppen dropdown dropdown--opened --> */}
              <div className="dropdown ">
                {/* <!-- header --> */}
                <div className="dropdown__header">
                  <a href="#" className="link">
                    <img className="flag flag-us" src="" alt="" />
                    English
                  </a>
                  <i className="fas fa-angle-down"></i>
                </div>

                {/* <!-- items --> */}
                <div className="dropdown__body">
                  <ul className="dropdown__items list">
                    <li className="dropdown__item list__item">
                      <a href="#" className="link">
                        <img className="flag flag-us" src="" alt="" />
                        English
                      </a>
                    </li>
                    <li className="dropdown__item list__item">
                      <a href="#" className="link">
                        <img className="flag flag-es" src="" alt="" />
                        Español
                      </a>
                    </li>
                    <li className="dropdown__item list__item">
                      <a href="#" className="link">
                        <img className="flag flag-fr" src="" alt="" />
                        Française
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default UpperHeader;
