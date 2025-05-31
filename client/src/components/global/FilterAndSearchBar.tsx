// import React from "react";
// import styled from "styled-components";
// import SearchIcon from "../../assets/search.svg?react";
//
// const FiltersContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   background: transparent;
//   margin-top: 8px;
// `;
//
// const Input = styled.input`
//   padding: 8px 12px;
//   border-radius: 6px;
//   border: none;
//   background: rgba(255, 255, 255, 1);
//   color: rgba(196, 196, 196, 1);
//   min-width: 150px;
//   font-size: 1rem;
// `;
//
// const Select = styled.select`
//   padding: 8px 12px;
//   border-radius: 6px;
//   border: none;
//   background: rgba(255, 255, 255, 1);
//   color: rgba(196, 196, 196, 1);
//   min-width: 150px;
//   font-size: 1rem;
// `;
//
// const Button = styled.button<{ variant?: "primary" | "secondary" }>`
//   padding: 8px 20px;
//   border-radius: 6px;
//   border: none;
//   font-size: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   background: ${({ variant }) =>
//     variant === "primary" ? "rgba(66, 217, 200, 1)" : "rgba(172, 172, 172, 1)"};
//   color: ${({ variant }) => (variant === "primary" ? "rgba(255, 255, 255, 1)" : "#fff")};
//   margin-left: 4px;
//   transition: background 0.2s;
//   &:hover {
//     background: ${({ variant }) =>
//       variant === "primary" ? "rgba(46, 180, 166, 1)" : "rgba(140, 140, 140, 1)"};
//   }
// `;
//
// const SearchImg = styled.img`
//   width: 18px;
//   height: 18px;
//   margin-left: 6px;
// `;
//
// export default function Filter() {
//   return (
//     <FiltersContainer>
//       <label htmlFor="category-select" style={{ color: "#fff", fontWeight: 600, marginRight: 8 }}>
//         Filters
//       </label>
//       <Input type="text" placeholder="Search Game" />
//       <label htmlFor="category-select" style={{ display: "none" }}>
//         Category
//       </label>
//       <Select id="category-select" defaultValue="" aria-label="Select Category">
//         <option value="" disabled>
//           Select Category
//         </option>
//         <option value="action">Action</option>
//         <option value="adventure">Adventure</option>
//         <option value="rpg">RPG</option>
//       </Select>
//       <label htmlFor="favorite-select" style={{ display: "none" }}>
//         Favorite
//       </label>
//       <Select id="favorite-select" defaultValue="" aria-label="Filter Favorite">
//         <option value="" disabled>
//           Filter Favorite
//         </option>
//         <option value="yes">Yes</option>
//         <option value="no">No</option>
//       </Select>
//       <Button variant="secondary">Clear</Button>
//       <Button variant="primary">
//         Search <SearchIcon />
//       </Button>
//     </FiltersContainer>
//   );
// }

import styled from "styled-components";
import CloseIcon from "../../assets/close.svg?react";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CloseIconWrapper = styled.span`
  width: 1.2rem;
  display: inline-block;
  fill: var(--color-white);
`;

import React from "react";
import SearchBar from "@/components/global/SearchBar";
import FilterBar from "@/components/global/FilterBar";
import Button from "@/components/global/Button";

type FilterAndSearchBarProps = {
  filter: string;
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isFavorite: boolean;
  onFavorite: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequest: () => void;
  onClear: () => void;
};

export default function FilterAndSearchBar({
  filter,
  onFilter,
  isFavorite,
  onFavorite,
  search,
  onSearch,
  onRequest,
  onClear,
}: FilterAndSearchBarProps) {
  return (
    <Container>
      <FilterBar
        filter={filter}
        isFavorite={isFavorite}
        onFilter={onFilter}
        onFavorite={onFavorite}
      />
      <SearchBar search={search} onSearch={onSearch} onRequest={onRequest} />
      <Button size="medium" variant="secondary" onClick={onClear}>
        Clear
        <CloseIconWrapper>
          <CloseIcon />
        </CloseIconWrapper>
      </Button>
    </Container>
  );
}
