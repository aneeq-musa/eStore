import React, { Component } from "react";
import "./CartToggle.css";

class CartToggle extends Component {
  render() {
    return (
      <>
        <button onClick={this.props.handleCartShow} className="cart_toggle">
          {this.props.totalItems !== 0 && (
            <span className="cart_items">{this.props.totalItems}</span>
          )}
          <svg
            id="shopping-cart"
            viewBox="0 0 18 16"
            width="30px"
            height="30px"
            stroke="#FFF"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="#FFFFF"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                stroke-width="1.5"
                d="M1 1l2.785.287 2.485 9.021h9.148l1.704-6.152H4.918"
              ></path>
              <path
                stroke-width="1.75"
                d="M9.337 14.527a1.747 1.747 0 11-3.493 0 1.747 1.747 0 013.493 0z"
              ></path>
              <path
                stroke-width="1.5"
                d="M15.912 14.527a1.747 1.747 0 11-3.494 0 1.747 1.747 0 013.494 0z"
              ></path>
            </g>
          </svg>
        </button>
      </>
    );
  }
}

export default CartToggle;
