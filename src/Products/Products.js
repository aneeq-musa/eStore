import React, { Component } from "react";
import Product from "../Product/Product";
import "./Products.css";
import Filter from "../Filter/Filter";
import Header from "../Header/Header";
import Cart from "../Cart/Cart";
import Modal from "../Modal/Modal";

class Products extends Component {
  state = {
    productList: [],
    resetProductList: [],
    addedCart: [],
    cartVisibility: false,
    totalItems: 0,
    noResultVisibility: false,
    modalVisibility: false,
    modalSelectedItem: []
  };

  componentDidMount() {
    fetch(
      "https://c9b8570d-f7cd-41a9-8ef6-1c5b97879e00.mock.pstmn.io/inventory"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.map((a) => (a.quantity = 1));
        this.setState({ productList: data, resetProductList: data });
      });
  }

  handleSorting = (selected) => {
    const productList = [...this.state.productList];
    const pSort = (order) =>
      productList.sort((a, b) => {
        return order === "low"
          ? a.product_price - b.product_price
          : b.product_price - a.product_price;
      });
    selected === "Low to High" && selected !== "Select"
      ? pSort("low")
      : pSort("high");
    this.setState({ productList });
  };

  handleCart = (target) => {
    const productList = [...this.state.productList];
    let addedCart = this.state.addedCart;
    const cartItem = productList.filter(
      (product) => product.id === parseInt(target.id)
    );
    const idArray = addedCart.length > 0 && addedCart.map((a) => a.id);
    const cartIndex =
      addedCart.length > 0 ? idArray.indexOf(cartItem[0].id) : -1;
    let updatedCart =
      cartIndex === -1
        ? addedCart.concat(cartItem)
        : addedCart.map((a, index) =>
            index === cartIndex
              ? Object.assign({}, a, { quantity: a.quantity + 1 })
              : a
          );
    const totalItems = updatedCart
      .map((a) => a.quantity)
      .reduce((a, b) => a + b);
    this.setState({ addedCart: updatedCart, cartVisibility: true, totalItems });
    this.state.modalVisibility === true &&
      this.setState({ modalVisibility: false });
    window.scrollTo(0, 0);
  };

  handleCartShow = () => {
    this.state.cartVisibility === false
      ? this.setState({ cartVisibility: true })
      : this.setState({ cartVisibility: false });
  };

  handleDelete = (id) => {
    let cartItems = this.state.addedCart;
    const updatedCart = cartItems.filter((a) => a.id !== id);
    const totalItems =
      updatedCart.length > 0
        ? updatedCart.map((a) => a.quantity).reduce((a, b) => a + b)
        : 0;
    this.setState({ addedCart: updatedCart, totalItems });
  };

  handleCounter = (cartid, type) => {
    let addedCart = [...this.state.addedCart];
    const ids = addedCart.map((a) => a.id),
      pos = ids.indexOf(cartid);
    type === "increment"
      ? addedCart[pos].quantity >= 1 && (addedCart[pos].quantity += 1)
      : addedCart[pos].quantity !== 1 && (addedCart[pos].quantity -= 1);
    const totalItems = addedCart.map((a) => a.quantity).reduce((a, b) => a + b);
    this.setState({ addedCart, totalItems });
  };

  handleSearch = (textInput) => {
    const lowerTextInput = textInput.toLowerCase();
    const productList = [...this.state.resetProductList];
    const searchResult = productList.filter(
      (a) =>
        a.product_name.toLowerCase().includes(lowerTextInput) ||
        a.category.toLowerCase().includes(lowerTextInput) ||
        a.tag.toLowerCase().includes(lowerTextInput)
    );
    searchResult.length <= 0 && this.setState({ noResultVisibility: true });
    textInput !== "" && this.setState({ productList: searchResult });
    textInput === "" &&
      this.setState({ productList: this.state.resetProductList });
  };

  handleQuickView = (id) => {
    const productList = [...this.state.productList];
    const selectedProduct = productList.filter((a) => a.id === id);
    this.setState({
      modalVisibility: true,
      modalSelectedItem: selectedProduct
    });
    window.scrollTo(0, 0);
  };

  handleModalVisibility = () => {
    this.setState({ modalVisibility: false });
  };

  render() {
    return (
      <>
        <Header
          handleCartShow={this.handleCartShow}
          totalItems={this.state.totalItems}
          handleSearch={this.handleSearch}
        />

        {this.state.cartVisibility === true && (
          <Cart
            cartItems={this.state.addedCart}
            cartVisibility={this.state.cartVisibility}
            handleCartShow={this.handleCartShow}
            handleDelete={this.handleDelete}
            handleCounter={this.handleCounter}
          />
        )}

        {this.state.modalVisibility && (
          <Modal
            selectedItem={this.state.modalSelectedItem}
            handleModalVisibility={this.handleModalVisibility}
            handleCart={this.handleCart}
          />
        )}

        <div className="products_container">
          <Filter handleSorting={this.handleSorting} />
          <div className="flex_wrap">
            {this.state.noResultVisibility === true && (
              <h2>
                No results found! Try searching for Bike Brand, name or type...
              </h2>
            )}
            {this.state.productList.map((product) => {
              return (
                <Product
                  imageSource={product.product_image}
                  imageAlt={product.product_name}
                  category={product.category}
                  price={product.product_price}
                  name={product.product_name}
                  id={product.id}
                  handleCart={this.handleCart}
                  key={`${product.id}-product`}
                  handleQuickView={this.handleQuickView}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Products;
