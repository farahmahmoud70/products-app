import React, { Component } from "react";
import { GetAllCategories } from "./services/categories";
import { Add, GetById, Update } from "./services/products";
import Joi from "joi-browser";

class AddItem extends Component {
  state = {
    product: {
      id: "",
      userId: "",
      productName: "",
      description: "",
      categoryId: "",
      price: Number,
      discount: 0,
      tags: [],
      //image: null,
      category: [{ id: "", categoryName: "" }]
    },
    categories: [{ id: "", categoryName: "" }],
    tag: "",
    isDiscountDisabled: false,
    errors: { err: "" },
    backEndErrors: []
  };

  // schema = {
  //   productName: Joi.string()
  //     .required()
  //     .label("Product Name : "),
  //   description: Joi.string()
  //     .required()
  //     .max(10)
  //     .label("Description : "),
  //   price: Joi.number()
  //     .required()
  //     .label("Price : ")
  //     .error(() => {
  //       return {
  //         message: "Price is required."
  //       };
  //     }),
  //   discount: Joi.number(),
  //   tag: Joi.string().label("Tag : ")
  // };

  componentDidMount = async () => {
    const productId = this.props.match.params.id;
    if (productId != null) {
      const { product } = await GetById(productId).catch(err =>
        console.log(err)
      );
      this.setState({ product });
    }
    let categories = [...this.state.categories];
    categories = await GetAllCategories();
    this.setState({ categories });
  };

  // validate = () => {
  //   //Joi ===> Validate
  //   const res = Joi.validate(this.state.product, this.schema, {
  //     abortEarly: false
  //   });

  //   const errors = {};

  //   //No Erorrs
  //   if (res.error === null) return;

  //   //exrtract error information from joi result
  //   for (const item of res.error.details) {
  //     errors[item.path] = item.message;
  //   }

  //   this.setState({ errors });

  //   return errors;
  // };

  // validateProperty = ({ name, value }) => {
  //   //Crete sub Object
  //   const obj = {
  //     [name]: value
  //   };
  //   //Crerte sub Schema
  //   const schema = {
  //     [name]: this.schema[name]
  //   };
  //   //Validate
  //   const res = Joi.validate(obj, schema, { abortEarly: false });

  //   const errors = { ...this.state.errors };

  //   if (res.error) {
  //     errors[name] = res.error.details[0].message;
  //   } else {
  //     delete errors[name];
  //   }

  //   this.setState({ errors });
  // };

  // handleDataChange = e => {
  //   // console.log(e.target.value);
  //   const product = { ...this.state.product };
  //   product[e.target.name] = e.target.value;
  //   this.setState({ product });
  // };
  setDiscountDisability = e => {
    e.preventDefault();
    let isDiscountDisabled = this.state.isDiscountDisabled;
    let product = this.state.product;
    console.log(e.target.value);
    if (e.target.value === "onsale") {
      isDiscountDisabled = false;
    } else {
      isDiscountDisabled = true;
      product.discount = 0;
    }
    this.setState({ isDiscountDisabled, product });
  };

  handleChange = e => {
    const product = { ...this.state.product };
    product[e.target.name] = e.target.value;
    console.log(product);
    product.productName = product.productName.toLowerCase();
    //this.validateProperty(e.target);
    this.setState({ product });
    console.log(this.state.product);
  };
  handleCateogoryChange = e => {
    // e.preventDefault();
    let product = { ...this.state.product };
    product.categoryId = e.target.value;
    console.log(product.categoryId);
    this.setState({ product });
    console.log(product);
  };

  onFileChange = e => {
    let product = { ...this.state.product };
    product.image = e.target.files[0];
    console.log(product.image);
    this.setState({ product });
  };

  handleTag = e => {
    e.preventDefault();
    let tag = this.state.tag;
    tag = e.target.value;
    //this.validateProperty(e.target);
    console.log(e.target.value);
    this.setState({ tag });
  };

  handleAddTag = e => {
    e.preventDefault();
    // const err = this.validate();
    // //Errors
    // if (err) {
    //   return;
    // }
    let tag = this.state.tag;
    let product = this.state.product;
    if (tag !== "") {
      product.tags.push(tag);
      tag = "";
    }
    this.setState({ product, tag });
  };

  deleteTag = tag => {
    // e.preventDefault();
    console.log(tag);
    let product = this.state.product;
    // let tags = product.tags;
    product.tags = product.tags.filter(t => t !== tag);
    // console.log(tags);
    this.setState({ product });
    console.log(this.state.product.tags);
  };
  deleteAllTags = () => {
    let product = this.state.product;
    product.tags = [];
    this.setState({ product });
  };
  handleSubmit = async e => {
    console.log("here");
    e.preventDefault();

    const productId = this.props.match.params.id;
    let product = { ...this.state.product };
    // const data = new FormData();
    // data.append("image", product.image);
    // console.log(data, product.image);
    // data.append("product", JSON.stringify(product));
    // console.log(data);
    let backEndErrors = [...this.state.backEndErrors];
    if (productId != null) {
      let editedproduct = await Update(product.id, product).catch(function(
        error
      ) {
        if (error.response) {
          backEndErrors = error.response.data.details;
          // console.log(error.response.data.message);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
      this.setState({ backEndErrors });
      if (editedproduct !== undefined) {
        this.props.history.push("/home");
      }
    } else {
      product.categoryId =
        product.categoryId === ""
          ? this.state.categories[0].id
          : product.categoryId;
      let newproduct = await Add(product).catch(function(error) {
        if (error.response) {
          backEndErrors = error.response.data.details;
          // console.log(error.response.data.message);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
      this.setState({ backEndErrors });
      console.log(newproduct, this.state.backEndErrors, this.state.errors);
      if (newproduct !== undefined) {
        this.props.history.push("/home");
      }
    }
  };

  handleCanel = e => {
    e.preventDefault();
    this.props.history.push("/home");
  };
  render() {
    // console.log(this.state.categories);
    let {
      productName,
      price,
      discount,
      tags,
      description,
      categoryId
    } = this.state.product;
    let { tag } = this.state.tag;
    let backEndErrors = this.state.backEndErrors;

    return (
      <div className=" container">
        {/* onSubmit={this.handleSubmit} */}
        <form className="add-product" onSubmit={this.handleSubmit}>
          <div className="add-product__images slider">
            <div className="add-product__image-actions">
              <div className="add-product__image-action">
                {/* <div> */}
                  {/* <input
                    type="file"
                    name="image"
                    onChange={this.onFileChange}
                  /> */}
                  <a href="#">
                  <i className="fas fa-plus-square"></i>
                  </a>
                {/* </div> */}
                <a href="#">
                  <i className="fas fa-edit"></i>
                </a>
                <a href="#">
                  <i className="fas fa-trash-alt"></i>
                </a>
              </div>
            </div>
            <div className="slider__items">
              <div
                className="slider__item active"
                style={{
                  backgroundImage: " url('img/products/product-grey-7.jpg')"
                }}
              ></div>
              <div
                className="slider__item"
                style={{
                  backgroundImage: " url('img/products/product-grey-7.jpg')"
                }}
              ></div>
              <div
                className="slider__item"
                style={{
                  backgroundImage: " url('img/products/product-grey-7.jpg')"
                }}
              ></div>
            </div>
            <div className="slider__indicators">
              <span className="slider__indicator active"></span>
              <span className="slider__indicator"></span>
              <span className="slider__indicator"></span>
            </div>
          </div>
          <div className="add-product__data">
            <div className="form-controls">
              <section className="tabs">
                <div className="tabs__headers">
                  <div className="tabs__header active">English</div>
                  <div className="tabs__header">Arabic</div>
                </div>
                <div className="tabs__bodies">
                  <div className="tabs__body active">
                    <div className="form-group">
                      <label htmlFor="">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="productName"
                        label=""
                        id="productName"
                        value={productName}
                        onChange={this.handleChange}
                      />
                      {this.state.errors.productName && (
                        <div className="form-group invalid">
                          <label htmlFor="">
                            {this.state.errors.productName}
                          </label>
                        </div>
                      )}
                      {backEndErrors.map(
                        err =>
                          err.param === "productName" && (
                            <div className="form-group invalid">
                              <label htmlFor="">{[err.msg]}</label>
                            </div>
                          )
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        id=""
                        cols="50"
                        rows="5"
                        label="description"
                        onChange={this.handleChange}
                        value={description}
                      ></textarea>
                      {this.state.errors.description && (
                        <div className="form-group invalid">
                          <label htmlFor="">
                            {this.state.errors.description}
                          </label>
                        </div>
                      )}
                      {backEndErrors.map(
                        err =>
                          err.param === "description" && (
                            <div className="form-group invalid">
                              <label htmlFor="">{[err.msg]}</label>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                  <div className="tabs__body ">
                    <div className="form-group invalid">
                      <label htmlFor="">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        id=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        id=""
                        cols="30"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </section>

              <div className="form-group">
                <label htmlFor="">Price</label>
                <input
                  className="form-control"
                  type="number"
                  name="price"
                  label="price"
                  id=""
                  value={price}
                  onChange={this.handleChange}
                />
                {this.state.errors.price && (
                  <div className="form-group invalid">
                    <label htmlFor="">{this.state.errors.price}</label>
                  </div>
                )}
                {backEndErrors.map(
                  err =>
                    err.param === "price" && (
                      <div className="form-group invalid">
                        <label htmlFor="">{[err.msg]}</label>
                      </div>
                    )
                )}
              </div>
              <div className="add-product__discount">
                <div className="form-group">
                  <label htmlFor="">Satus</label>
                  {/* <div className="form-group__radios"> */}
                  <div className="form-group__radio">
                    <input
                      type="radio"
                      id="onsale"
                      name="radioBtn"
                      value="onsale"
                      onClick={this.setDiscountDisability}
                      checked
                    />
                    <label for="onsale">On Sale</label>
                  </div>
                  <div className="form-group__radio">
                    <input
                      type="radio"
                      id="notonsale"
                      name="radioBtn"
                      value="notonsale"
                      onClick={this.setDiscountDisability}
                    />
                    <label for="notonsale">Not On Sale</label>
                  </div>
                  {/* </div> */}
                </div>
                <div className="form-group">
                  <label htmlFor="">Discount</label>
                  <input
                    className="form-control"
                    type="number"
                    name="discount"
                    label="discount"
                    id=""
                    value={discount}
                    onChange={this.handleChange}
                    disabled={this.state.isDiscountDisabled}
                  />
                  {/* {this.state.errors.discount && (
                    <div className="form-group invalid">
                      <label htmlFor="">{this.state.errors.discount}</label>
                    </div>
                  )} */}
                  {backEndErrors.map(
                    err =>
                      err.param === "discount" && (
                        <div className="form-group invalid">
                          <label htmlFor="">{[err.msg]}</label>
                        </div>
                      )
                  )}
                </div>
              </div>
              {/* <div className="form-group">
                <label htmlFor="">Payment Types</label>
                <div className="form-group__checkboxs">
                  <div className="form-group__checkbox">
                    <input type="checkbox" name="" id="" />
                    <span>Direct Bank Transfare</span>
                  </div>
                  <div className="form-group__checkbox">
                    <input type="checkbox" name="" id="" />
                    <span>Cheque Payment</span>
                  </div>
                  <div className="form-group__checkbox">
                    <input type="checkbox" name="" id="" />
                    <span>Paypal</span>
                  </div>
                  <div className="form-group__checkbox">
                    <input type="checkbox" name="" id="" />
                    <span>Visa</span>
                  </div>
                  <div className="form-group__checkbox">
                    <input type="checkbox" name="" id="" />
                    <span>Mastercard</span>
                  </div>
                  <div className="form-group__checkbox">
                    <input type="checkbox" name="" id="" />
                    <span>On Dilivery</span>
                  </div>
                </div>
              </div> */}
              <div className="form-group">
                <label htmlFor="">Category</label>
                <select
                  onChange={this.handleCateogoryChange}
                  // value={category[0].categoryName}
                  className="form-control"
                  name="category"
                  id="category"
                >
                  {this.state.categories.map(cat => (
                    <option
                      key={cat.id}
                      value={cat.id}
                      selected={cat.id === categoryId}
                    >
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
                {backEndErrors.map(
                  err =>
                    err.param === "category" && (
                      <div className="form-group invalid">
                        <label htmlFor="">{[err.msg]}</label>
                      </div>
                    )
                )}
              </div>

              <div className="taged-textbox form-group">
                <label className="taged-textbox__lable" htmlFor="">
                  Tags
                </label>

                <div className="taged-textbox__data">
                  <div className="taged-textbox__tags">
                    {tags.map(tag => (
                      <div key={tag} className="taged-textbox__tag">
                        <span>{tag}</span>
                        <a className="taged-textbox__remove">
                          <i
                            className="fas fa-times"
                            onClick={() => this.deleteTag(tag)}
                          ></i>
                        </a>
                      </div>
                    ))}
                  </div>
                  {tags.length > 0 && (
                    <div className="taged-textbox__clear">
                      <a>
                        <i
                          className="fas fa-times"
                          onClick={this.deleteAllTags}
                        ></i>
                      </a>
                    </div>
                  )}
                </div>

                {/* taged-textbox__textbox */}
                <input
                  className=" form-control form-group"
                  type="text"
                  name="tag"
                  label="tags"
                  onKeyUp={this.handleTag}
                  //onChange={this.handleTagsChange}
                  value={tag}
                  id=""
                />
                <button
                  className="btn btn--primary"
                  onClick={this.handleAddTag}
                >
                  Add Tag
                </button>
                {/* {this.state.errors.tags && (
                  <div className="form-group invalid">
                    <label htmlFor="">{this.state.errors.tags}</label>
                  </div>
                )} */}
                {backEndErrors.map(
                  err =>
                    err.param === "tags" && (
                      <div className="form-group invalid">
                        <label htmlFor="">{[err.msg]}</label>
                      </div>
                    )
                )}
              </div>
              <div className="add-product__actions">
                <button className="btn btn--gray" onClick={this.handleCanel}>
                  Cancel
                </button>
                <button
                  className="btn btn--primary"
                  // onClick={this.handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddItem;
