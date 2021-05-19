import React, { Component } from "react";
import "./Cart.scss";
import CloseIcon from "../Icons/Close";

class Cart extends Component {
  state = {
    cartVisibility: this.props.cartVisibility
  };

  orderTotal = () => {
    return this.props.cartItems
      .map((a) => a.product_price * a.quantity)
      .reduce((a, b) => a + b);
  };
  totalTax = () => (this.orderTotal() * 0.13).toFixed(2);
  checkoutPrice = () =>
    parseFloat(this.orderTotal()) + parseFloat(this.totalTax());

  render() {
    return (
      <>
        {this.state.cartVisibility === true && (
          <div className="cart">
            <div className="cart_container">
              <div className="cart_close_container">
                <h2>Your cart.</h2>
                <button
                  className="cart_close"
                  onClick={this.props.handleCartShow}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="cart_items_container">
                {this.props.cartItems.length > 0 ? (
                  this.props.cartItems.map((item, index) => {
                    return (
                      <div className="cart_item" key={`${index}-cartItem`}>
                        <div className="cart_image_container">
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                          />
                        </div>
                        <div className="cart_product_details">
                          <p>{item.product_name}</p>
                          <p>
                            Quantity:{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                        <div className="cart_action">
                          <button
                            className="btn-secondary btn"
                            onClick={() => this.props.handleDelete(item.id)}
                          >
                            Delete
                          </button>
                          <p>$ {item.product_price * item.quantity}</p>
                          <div className="cart_action_counter">
                            <button
                              onClick={() =>
                                this.props.handleCounter(item.id, "increment")
                              }
                              className="btn btn-info"
                            >
                              +
                            </button>
                            <button
                              onClick={() =>
                                this.props.handleCounter(item.id, "decrement")
                              }
                              className="btn btn-info"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="cart_empty_container">
                    <h2>Your cart is empty!</h2>
                  </div>
                )}
              </div>
              {this.props.cartItems.length > 0 && (
                <div className="cart_summary_container">
                  <p>
                    <span>Order subtotal:</span>
                    <span>${this.orderTotal()}</span>
                  </p>
                  <p>
                    <span>Tax:</span>
                    <span>${this.totalTax()}</span>
                  </p>
                  <p>
                    <span>Total:</span>
                    <span>${this.checkoutPrice()}</span>
                  </p>
                  <button>Checkout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Cart;
