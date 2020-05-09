import React from "react";
import { Link } from "react-router-dom";
const Product = props => {
  const {
    id,
    productName,
    price,
    discount,
    handleDelete,
    token,
    userId,
    currentUser
  } = props;
  // console.log(currentUser);

  // let validUser = function parseJwt(token) {
  //   if (!token) {
  //     return;
  //   }
  //   const tokenParts = token.split(".");
  //   const encodedPayload = tokenParts[1];
  //   const rawPayload = atob(encodedPayload);
  //   const user = JSON.parse(rawPayload);
  //   return user.userId;
  // };

  function decoration() {
    return discount !== 0 ? "line-through" : "none";
  }
  function isValid() {
    return token != null && currentUser.id == userId ? "display" : "none";
    //return currentUser.id == userId ? "display" : "none";
  }
  function discountFunc() {
    return discount != 0 ? true : false;
  }

  return (
    <React.Fragment>
      <div className="item-medium-1">
        {discountFunc() && <div className="item-medium-1__alert">Sale</div>}
        <div
          className="item-medium-1__image image"
          style={{
            backgroundImage: "url('img/products/product-grey-1.jpg')"
          }}
        >
          <a href="#" className="item-medium-1__action">
            Add to Cart
          </a>
        </div>
        <a href="#">
          <h4>{productName}</h4>
          <div className="flex-row">
            <div>
              <span style={{ textDecoration: decoration() }}>${price}</span>
              {discount && <span className="lable">${discount}</span>}
            </div>
          </div>
        </a>
        <div className="crud-actions">
          <Link to={`/productDetails/${id}`}>
            <i className="far fa-eye"></i>
          </Link>
          <Link to={`/editItem/${id}`} style={{ display: isValid() }}>
            <i className="fas fa-edit"></i>
          </Link>
          {/* <a href="#"> */}
          <i
            onClick={() => handleDelete(id)}
            style={{ display: isValid() }}
            className="fas fa-trash-alt"
          ></i>
          {/* </a> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
