import React from "react";
import styled from "styled-components";
import SortIconImg from "../../assets/sort.svg?react";

import Filter from "@/components/global/ClearButton";

const HeaderWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconImg = styled.img`
  width: 28px;
  height: 28px;
`;

const NewGameButton = styled.button`
  background: rgba(66, 217, 200, 1);
  color: rgba(255, 255, 255, 1);
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  cursor: pointer;
  transition: background 0.2s;
  margin: 16px 0 0 0;
  &:hover {
    background: rgba(46, 180, 166, 1);
  }
`;

const DividerWrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 24px 0 0 0;
  display: flex;
  justify-content: center;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 0;
  border-top: 1px solid rgba(229, 229, 229, 1);
  position: absolute;
  top: 50%;
  left: 0;
`;

const DividerCenter = styled.div`
  width: 60px;
  height: 4px;
  background: #2196f3;
  border-radius: 2px;
  position: relative;
  z-index: 1;
`;

const TableHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 8px;
`;

const TableHeaderCell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 0;
  min-width: 0;
`;

const SortIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
  user-select: none;
`;

export default function TableHeader() {
  return (
    <HeaderWrapper>
      <Title>Games</Title>
      <NewGameButton>NEW GAME</NewGameButton>
      <Filter />
      <DividerWrapper>
        <DividerLine />
        <DividerCenter />
      </DividerWrapper>
      <TableHeaderWrapper>
        <TableHeaderCell>
          Title
          <SortIconImg />
        </TableHeaderCell>
        <TableHeaderCell>
          Description
          <SortIconImg />
        </TableHeaderCell>
        <TableHeaderCell>
          Category
          <SortIconImg />
        </TableHeaderCell>
        <TableHeaderCell>
          Created at
          <SortIconImg />
        </TableHeaderCell>
        <TableHeaderCell>
          Updated at
          <SortIconImg />
        </TableHeaderCell>
        <TableHeaderCell>
          Favorite
          <SortIconImg />
        </TableHeaderCell>
      </TableHeaderWrapper>
    </HeaderWrapper>
  );
}
