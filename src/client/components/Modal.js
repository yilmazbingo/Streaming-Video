import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

// resusable components should not have hardcoded texts.
// ------------- this componet is inside the streamDelete-----------------

const Modal = (props) => {
  return ReactDOM.createPortal(
    // {we pass click event handler from the parent component to keep this component reusable}
    <WrapperDiv onClick={props.onDismiss}>
      <ModalDiv onClick={(e) => e.stopPropagation()}>
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </ModalDiv>
    </WrapperDiv>,
    document.querySelector("#modal")
  );
};

const ModalDiv = styled.div`
  background-color: gray;
  height: 200px;
  width: 400px;
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const WrapperDiv = styled.div`
  background-color: #8c7127;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Modal;
