import React from "react";
import "./product.scss";

const Product = (props) => {
  return (
    <div className="product">
      <div className="product_container">
        <div className="product_category_container">
          <button id={props.id} onClick={() => props.handleQuickView(props.id)}>
            Quick View
          </button>
          <button
            id={props.id}
            onClick={(event) => props.handleCart(event.target)}
          >
            Add to Cart
          </button>
        </div>
        <div className="img_container">
          <img src={props.imageSource} alt={props.imageAlt} />
        </div>
        <div className="product_info_container">
          <div>
            <p className="product_category">{props.category}</p>
            <p className="product_name">{props.name}</p>
          </div>
          <p className="product_price">
            <em>CAD</em> ${props.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
