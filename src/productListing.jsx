import React, { Component } from "react";
import { GetAll, Delete, GetCurrent } from "./services/products";
import { GetAllCategories } from "./services/categories";
import Pagination from "./pagination";
import Product from "./product";

import { Link } from "react-router-dom";
import FilterCategories from "./filter";
class ProductListing extends Component {
  state = {
    products: [],
    productsService: [],
    categories: [],
    currentPage: Number,
    totalPages: Number,
    currentCategory: "",
    searchKeyword: "",
    currentSortValue: "",
    token: "",
    currentUser: { id: "", firstName: "", lastName: "", username: "" }
  };
  async componentDidMount() {
    let {
      products,
      currentCategory,
      currentPage,
      totalPages,
      token,
      currentUser
    } = this.state;
    token = localStorage.getItem("jwtToken");
    currentUser = localStorage.getItem("user");
    currentUser = JSON.parse(currentUser);
    const data = await GetAll();
    products = data.products;
    currentPage = data.currentPage;
    totalPages = data.totalPages;
    let categories = await GetAllCategories();
    categories = [{ id: "0", categoryName: "All Products" }, ...categories];
    currentCategory = categories[0].id;
    this.setState({
      products,
      categories,
      currentPage,
      totalPages,
      currentCategory,
      token,
      currentUser
    });
  }

  // handleState = async (
  //   data,
  //   products,
  //   categories,
  //   currentPage,
  //   totalPages,
  // ) => {
  //   products = data.products;
  //   currentPage = data.currentPage;
  //   totalPages = data.totalPages;
  //   if(categories != undefined){
  //     categories = [{ id: 0, categoryName: "All Products" }, ...categories];
  //   }
  //   this.setState({
  //     products,
  //     currentPage,
  //     totalPages,
  //     categories
  //   });
  // };

  handleDelete = async id => {
    let {
      products,
      currentCategory,
      searchKeyword,
      currentPage,
      totalPages,
      currentSortValue
    } = this.state;
    await Delete(id).catch(err => console.log(err));
    const data = await GetCurrent(
      currentCategory,
      searchKeyword,
      currentPage,
      currentSortValue
    );
    products = data.products;
    currentPage = data.currentPage;
    totalPages = data.totalPages;
    this.setState({
      products,
      currentPage,
      totalPages,
      currentCategory
    });
  };
  handlePageChange = async page => {
    let {
      products,
      currentCategory,
      searchKeyword,
      currentPage,
      totalPages,
      currentSortValue
    } = this.state;
    const data = await GetCurrent(
      currentCategory,
      searchKeyword,
      page,
      currentSortValue
    );
    let categories = await GetAllCategories();
    categories = [{ id: 0, categoryName: "All Products" }, ...categories];
    products = data.products;
    currentPage = data.currentPage;
    totalPages = data.totalPages;

    this.setState({
      products,
      categories,
      currentPage,
      totalPages
    });
  };
  handleFilter = async selectedCateg => {
    let {
      products,
      searchKeyword,
      currentCategory,
      currentPage,
      totalPages,
      currentSortValue
    } = this.state;
    const data = await GetCurrent(
      selectedCateg,
      searchKeyword,
      currentPage,
      currentSortValue
    );
    products = data.products;
    currentPage = data.currentPage;
    totalPages = data.totalPages;
    currentCategory = selectedCateg;
    const productsService = data;
    this.setState({
      products,
      productsService,
      currentCategory,
      currentPage,
      totalPages
    });
  };
  handleSearch = async e => {
    let {
      products,
      currentCategory,
      searchKeyword,
      currentPage,
      totalPages,
      currentSortValue
    } = this.state;
    searchKeyword = e.target.value;
    const data = await GetCurrent(
      currentCategory,
      searchKeyword,
      currentPage,
      currentSortValue
    );
    products = data.products;
    currentPage = data.currentPage;
    totalPages = data.totalPages;
    console.log(products, currentPage, totalPages);
    this.setState({
      products,
      currentCategory,
      currentPage,
      totalPages,
      searchKeyword
    });
  };

  handleSort = async e => {
    let {
      products,
      currentCategory,
      searchKeyword,
      currentPage,
      totalPages,
      currentSortValue
    } = this.state;
    currentSortValue = e.target.value;
    const data = await GetCurrent(
      currentCategory,
      searchKeyword,
      currentPage,
      currentSortValue
    );
    products = data.products;
    currentPage = data.currentPage;
    totalPages = data.totalPages;
    const productsService = data;
    this.setState({
      products,
      productsService,
      currentCategory,
      currentPage,
      totalPages,
      searchKeyword,
      currentSortValue
    });
  };
  render() {
    let { products, currentPage, totalPages, token, currentUser } = this.state;

    const isValid = token !== null ? true : false;

    // console.log(products, currentPage);

    return (
      <div className="container">
        {/* <!-- filters --> */}
        <section className="filters">
          {/* <!-- search box --> */}
          <div className="search-box">
            <input
              className="search-box__input"
              placeholder="Search..."
              type="text"
              name="txt_search"
              id=""
              onChange={this.handleSearch}
            />
            <button type="submit" className="search-box__btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          {/* <!-- filter list --> */}

          <FilterCategories
            categ={this.state.categories}
            handleFilter={this.handleFilter}
          />
          {/* <!-- filter tags --> */}
          <div>
            {/* <!-- filter header --> */}
            <h5>Tags</h5>
            {/* <!-- filter tags --> */}
            <div className="tags">
              <span className="tag">Nike</span>
              <span className="tag">Travel</span>
              <span className="tag">Sport</span>
              <span className="tag">Tv</span>
              <span className="tag">Books</span>
              {/* <span className="tag">Tech</span>
              <span className="tag">Addidas</span>
              <span className="tag">Promo</span>
              <span className="tag">Reading</span>
              <span className="tag">Social</span>
              <span className="tag">New</span>
              <span className="tag">Special</span>
              <span className="tag">Food</span>
              <span className="tag">Used</span> */}
            </div>
          </div>
          {/* <!-- related items --> */}
          <div>
            {/* <!-- title --> */}
            <h5></h5>
            {/* <!-- small item --> */}
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
        {/* <!-- Items --> */}
        <section className="item-listing">
          {/* <!-- tools (sorting , change view , exporting) --> */}
          <div className="item-listing__tools">
            <select
              className="form-control"
              name=""
              id=""
              value={this.state.currentSortValue}
              onChange={this.handleSort}
            >
              <option value="1">Featured</option>
              <option value="lowPrice">Price low to high</option>
              <option value="highPrice">Price high to low</option>
              <option value="name">Name</option>
            </select>

            {isValid && (
              <Link
                style={{ textDecoration: isValid }}
                className="action-btn"
                to="/addItem"
              >
                <i className="fas fa-plus"></i>
              </Link>
            )}
          </div>
          {/* <!-- items --> */}
          <div className="item-listing__items item-listing--3items">
            {/* <!-- medium item --> */}
            {products.map(product => (
              <Product
                productName={product.productName}
                price={product.price}
                discount={product.discount}
                id={product.id}
                handleDelete={this.handleDelete}
                key={product.id}
                token={token}
                userId={product.userId}
                currentUser={currentUser}
              />
            ))}
          </div>
          {/* <!-- paging --> */}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={this.handlePageChange}
            />
          )}
        </section>
      </div>
    );
  }
}

export default ProductListing;
