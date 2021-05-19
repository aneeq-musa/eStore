import React from "react";
import "./Modal.scss";
import Close from "../Icons/Close";
import List from "../List/List";

const Modal = (props) => {
  console.log(props.selectedItem[0].product_details.list);
  return (
    <div className="modal">
      <div className="modal_container">
        <div className="modal_header">
          <p>{props.selectedItem[0].product_name}</p>

          <button onClick={props.handleModalVisibility}>
            <Close />
          </button>
        </div>
        <div className="modal_body">
          <div className="col">
            <img
              src={props.selectedItem[0].product_image}
              alt={props.selectedItem[0].product_name}
            />
          </div>
          <div className="col">
            <p className="product_category">{props.selectedItem[0].category}</p>
            <List
              list={props.selectedItem[0].product_details.list}
              copy={props.selectedItem[0].product_description}
            />
            <p className="modal_offer">{props.selectedItem[0].offer}</p>
            <div className="row">
              <p>CAD ${props.selectedItem[0].product_price}</p>
              <button
                className="btn btn-primary"
                onClick={() => props.handleCart(props.selectedItem[0])}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
