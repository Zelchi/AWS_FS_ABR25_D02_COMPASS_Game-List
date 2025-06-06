import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  width: 80%;
  max-width: 500px;
  max-height: 50vh;

  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const ModalList = styled.div`
  width: 100%;
  max-height: 300px;

  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const SelectItem = styled.div`
  display: flex;
  align-items: center;
`;
