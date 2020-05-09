import React, { Component } from "react";
import { GetById } from "./services/products";
import { GetAllCategories } from "./services/categories";
import axios from "axios";
import Product from "./product";
class ProductDetails extends Component {
  state = {

    product: {
      id: "",
      userId: "",
      productName: "",
      description: "",
      categoryId: "",
      price: Number,
      discount: Number,
      tags: [String],
      category: [{ id: "", categoryName: "" }]
    }
   
  };
  componentDidMount = async () => {
    const productsEndPoint = `http://localhost:3000/products/${this.props.match.params.id}`;
    const { data } = await axios.get(productsEndPoint);
    

    this.setState({ product: data.product });
  };

  
  render() {
    

    let {
      productName,
      price,
      discount,
      category,
      description
    } = this.state.product;
    const decoration = this.state.product.discount ? "line-through" : "none";
    // let { categoryName } = this.state.categories;
    return (
      <div className="product-details container">
        <section className="product-details__main">
          {/* <!-- images slider --> */}
          <div className="slider">
            <div className="slider__items">
              <div
                className="slider__item active"
                style={{
                  backgroundImage: "url('/img/products/product-grey-7.jpg')"
                }}
              ></div>
              <div
                className="slider__item"
                style={{
                  backgroundImage: "url('/img/products/product-grey-7.jpg')"
                }}
              ></div>
              <div
                className="slider__item"
                style={{
                  backgroundImage: "url(/'img/products/product-grey-7.jpg')"
                }}
              ></div>
            </div>
            <div className="slider__indicators">
              <span className="slider__indicator active"></span>
              <span className="slider__indicator"></span>
              <span className="slider__indicator"></span>
            </div>
          </div>
          {/* <!-- product info --> */}
          <div className="product-details__info">
            <h1>{productName}</h1>
            <div className="rating">
              <div className="rating__stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <div className="rating__data">2 reviews</div>
            </div>
            <div className="product-details__amount">
              {/* ${price} */}
              {discount && <span>${discount} </span>}

              <span style={{ textDecoration: decoration }}>${price}</span>
            </div>
            <p className="product-details__desc">{description}</p>
            <div className="product-details__add">
              <div className="increment-control">
                <a href="#" className="increment-control__action">
                  -
                </a>
                <input
                  type="text"
                  className="form-control"
                  title="Qty"
                  // value="1"
                  // onChange={this.handle}
                />
                <a href="#" className="increment-control__action">
                  +
                </a>
              </div>
              <button href="#" className="btn btn--primary">
                Add to cart
              </button>
            </div>
            <div className="product-details__meta">
              Category :
              {category.map(cat => " " + cat.categoryName + " " + "," + " ")}
              {/* <a rel="tag" href="#">
                  {cat.categoryName}, 
                </a> */}
            </div>
          </div>
        </section>
        <section className="tabs">
          <div className="tabs__headers">
            <div className="tabs__header active">Description</div>
            <div className="tabs__header">Additional Information</div>
            <div className="tabs__header">Reviews (2)</div>
          </div>
          <div className="tabs__bodies">
            <div className="tabs__body active">
              <div className="product-details__desc">
                <p>{description}</p>
              </div>
            </div>
            <div className="tabs__body ">tab2</div>
            <div className="tabs__body">tab3</div>
          </div>
        </section>
        <div className="separator"></div>
        {/* <!-- related products --> */}
        <section className="realated-product">
          <h3>
            Related <strong>Products</strong>
          </h3>
          <div className="item-listing__items item-listing--4items">
            {/* <!-- medium item --> */}
            <div className="item-medium-1">
              <div
                className="item-medium-1__image image"
                style={{
                  backgroundImage: "url('./img/products/product-grey-7.jpg')"
                }}
              >
                <a href="#" className="item-medium-1__action">
                  Add to Cart
                </a>
              </div>
              <a href="#">
                <h4>Photo Camera</h4>
                <div>
                  <del>$325</del>
                  <span className="lable">$299</span>
                </div>
              </a>
              <div className="crud-actions">
                <a href="#">
                  <i className="far fa-eye"></i>
                </a>
                <a href="#">
                  <i className="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <div className="item-medium-1">
              <div
                className="item-medium-1__image image"
                style={{
                  backgroundImage: "url('./img/products/product-grey-7.jpg')"
                }}
              >
                <a href="#" className="item-medium-1__action">
                  Add to Cart
                </a>
              </div>
              <a href="#">
                <h4>Photo Camera</h4>
                <div>
                  <del>$325</del>
                  <span className="lable">$299</span>
                </div>
              </a>
              <div className="crud-actions">
                <a href="#">
                  <i className="far fa-eye"></i>
                </a>
                <a href="#">
                  <i className="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <div className="item-medium-1">
              <div className="item-medium-1__alert">Sale</div>
              <div
                className="item-medium-1__image image"
                style={{
                  backgroundImage: "url('./img/products/product-grey-7.jpg')"
                }}
              >
                <a href="#" className="item-medium-1__action">
                  Add to Cart
                </a>
              </div>
              <a href="#">
                <h4>Photo Camera</h4>
                <div>
                  <del>$325</del>
                  <span className="lable">$299</span>
                </div>
              </a>
              <div className="crud-actions">
                <a href="#">
                  <i className="far fa-eye"></i>
                </a>
                <a href="#">
                  <i className="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <div className="item-medium-1">
              <div className="item-medium-1__alert">Sale</div>
              <div
                className="item-medium-1__image image"
                style={{
                  backgroundImage: "url('./img/products/product-grey-7.jpg')"
                }}
              >
                <a href="#" className="item-medium-1__action">
                  Add to Cart
                </a>
              </div>
              <a href="#">
                <h4>Photo Camera</h4>
                <div>
                  <del>$325</del>
                  <span className="lable">$299</span>
                </div>
              </a>
              <div className="crud-actions">
                <a href="#">
                  <i className="far fa-eye"></i>
                </a>
                <a href="#">
                  <i className="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ProductDetails;
