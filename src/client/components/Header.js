import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper className="ui secondary pointing menu">
      <StyledLink to="/" className="item">
        Stream App
      </StyledLink>
      <div className="right menu">
        <StyledLink to="/" className="item">
          All Streams
        </StyledLink>
        <GoogleAuth />
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  background-color: green !important;
  height: 20px;
`;

const StyledLink = styled(Link)`
  color: white !important;
`;
//The CSS rules are automatically vendor prefixed, styled-components takes care of that for you!
