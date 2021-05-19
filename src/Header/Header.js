import React, { useRef } from "react";
import "./Header.scss";
import CartToggle from "../CartToggle/CartToggle";
import Logo from "../Icons/Logo";
import Search from "../Icons/Search";

const Header = (props) => {
  const textInput = useRef(null);
  return (
    <header className="header">
      <div className="header_container">
        <div className="logo">
          <Logo />
        </div>
        <div className="search_container">
          <input
            ref={textInput}
            type="text"
            placeholder="How can we help?"
            id="search_box"
          />
          <button onClick={() => props.handleSearch(textInput.current.value)}>
            <Search />
          </button>
        </div>
        <CartToggle
          handleCartShow={props.handleCartShow}
          totalItems={props.totalItems}
        />
      </div>
    </header>
  );
};

export default Header;
