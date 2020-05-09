import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import UpperHeader from "./upperHeader";
import MiddleHeader from "./middleHeader";
import NavBar from "./navBar";

// import "../public/img"
import ProductListing from "./productListing";
import AddItem from "./addItem";
import NotFound from "./notFound";
import ProductDetails from "./producDetails";
import ContactUs from "./contactUs";
import AboutUs from "./aboutUs";
import Product from "./product";
import Login from "./login";
import Register from "./register";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="header">
          <UpperHeader />
          <MiddleHeader />
          <NavBar />
        </div>
        {/* <ProductListing /> */}
        {/* <Product /> */}
        <Switch>
          <Route path="/addItem" component={AddItem} />
          <Route path="/editItem/:id" component={AddItem} />
          <Route path="/home" component={ProductListing} />
          <Route path="/notFound" component={NotFound} />
          <Route path="/productDetails/:id" component={ProductDetails} />
          <Route path="/contactus" component={ContactUs} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="/" exact to="/home" />
          <Redirect to="/notFound" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
