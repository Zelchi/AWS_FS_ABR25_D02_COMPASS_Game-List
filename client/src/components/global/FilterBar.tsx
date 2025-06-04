import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../../utils/API";
import Heart from "@/assets/heart.svg?react";
import ClearButton from "@/components/global/ClearButton";
import { useGlobal } from "@/contexts/globalContext";
import { getLabel, isLabelKey } from "@/utils/labels";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 67em) {
    flex-direction: column;
    gap: 1rem;

    & > * {
      width: 100%;
    }
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 67em) {
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }
`;

const SortContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 67em) {
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }
`;

const FavoriteContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    display: inline-block;
    color: var(--color-white);
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1;
    font-family: var(--font-primary);

    @media (max-width: 67em) {
      font-weight: 500;
      font-size: 1.4rem;
    }
  }
`;

const SelectInput = styled.select`
  padding: 0.8rem 1.4rem;
  line-height: 1;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 1.2rem;
  color: "var(--color-black)";
  border-radius: 0.4rem;
  border: none;

  option:disabled {
    color: var(--color-grey-light-05);
  }

  &:focus {
    box-shadow: 0 0.2rem 1.2rem var(--color-aqua);
  }
`;

const IconWrapper = styled.button<{ $isFavorite?: boolean }>`
  cursor: pointer;
  background: none;
  border: none;
  width: 3rem;
  height: 3rem;
  fill: ${({ $isFavorite }) => ($isFavorite ? "var(--color-aqua)" : "var(--color-grey-light-05)")};
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    fill: var(--color-aqua);
  }

  @media (max-width: 67em) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const FavoriteAndClearWrapper = styled.div`
  display: flex;

  & > * {
    width: calc(50% - 0.5rem);
  }

  & > *:last-child {
    margin-left: auto;
  }
`;

const filterDictionary: Record<string, string> = {
  categoryBy: "Category",
  platformBy: "Platform",
  statusBy: "Status",
};

export default function FilterBar({
  header,
  onLoadItems,
}: {
  header: string[];
  onLoadItems: () => Promise<void>;
}) {
  const {
    sortBy,
    sortOrder,
    filters,
    selectedFilter,
    isFavorite,
    handleSortBy,
    handleSortOrder,
    handleFilters,
    handleSelectedFilter,
    handleIsFavorite,
    isMobile,
    isLaptop,
  } = useGlobal();

  const [data, setData] = useState<{ id: string, name: string }[]>([]);

  const handleRequest = async () => {
    try {
      if (!filters) return setData([]);

      const endpoint = filterDictionary[filters] || filters;
      const response = await API.GET(`${endpoint}`);
      if (response && response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (filters !== "statusBy") handleRequest();
    if (filters === "statusBy") setData([
      { id: "playing", name: "Playing" },
      { id: "done", name: "Done" },
      { id: "abandoned", name: "Abandoned" },
    ]);

    handleSelectedFilter({
      target: { value: "" },
    } as React.ChangeEvent<HTMLSelectElement>);
  }, [filters]);

  return (
    <Container>
      {isMobile ? (
        <>
          <FilterContainer>
            <SelectInput onChange={handleFilters} value={filters}>
              <option value="" disabled>
                Filter by
              </option>
              {Object.entries(filterDictionary).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </SelectInput>
            {filters && (
              <SelectInput onChange={handleSelectedFilter} value={selectedFilter}>
                <option value="" disabled>
                  Choose an option
                </option>
                {data.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </SelectInput>
            )}
          </FilterContainer>
          <SortContainer>
            <SelectInput onChange={handleSortBy} value={sortBy}>
              <option value="" disabled>
                Sort by
              </option>
              {["updatedAt", ...header].map((head) => (
                <option key={head} value={head}>
                  {isLabelKey(head) ? getLabel(head) : ""}
                </option>
              ))}
            </SelectInput>
            {sortBy && (
              <SelectInput onChange={handleSortOrder} value={sortOrder}>
                <option value="" disabled>
                  Choose an option
                </option>
                <option value={"asc"}>Ascending</option>
                <option value={"desc"}>Descending</option>
              </SelectInput>
            )}
          </SortContainer>
          <FavoriteContainer>
            <span>Filter by favorite</span>
            <IconWrapper $isFavorite={isFavorite} onClick={handleIsFavorite}>
              <Heart />
            </IconWrapper>
          </FavoriteContainer>
          <ClearButton onLoadItems={onLoadItems} />
        </>
      ) : isLaptop ? (
        <>
          <div style={{ display: "flex", gap: "1rem" }}>
            <FilterContainer>
              <SelectInput onChange={handleFilters} value={filters}>
                <option value="" disabled>
                  Filter by
                </option>
                {Object.entries(filterDictionary).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </SelectInput>
              {filters && (
                <SelectInput onChange={handleSelectedFilter} value={selectedFilter}>
                  <option value="" disabled>
                    Choose an option
                  </option>
                  {data.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </SelectInput>
              )}
            </FilterContainer>
            <SortContainer>
              <SelectInput onChange={handleSortBy} value={sortBy}>
                <option value="" disabled>
                  Sort by
                </option>
                {["updatedAt", ...header].map((head) => (
                  <option key={head} value={head}>
                    {isLabelKey(head) ? getLabel(head) : ""}
                  </option>
                ))}
              </SelectInput>
              {sortBy && (
                <SelectInput onChange={handleSortOrder} value={sortOrder}>
                  <option value="" disabled>
                    Choose an option
                  </option>
                  <option value={"asc"}>Ascending</option>
                  <option value={"desc"}>Descending</option>
                </SelectInput>
              )}
            </SortContainer>
          </div>
          <FavoriteAndClearWrapper>
            <FavoriteContainer>
              <span>Filter by favorite</span>
              <IconWrapper $isFavorite={isFavorite} onClick={handleIsFavorite}>
                <Heart />
              </IconWrapper>
            </FavoriteContainer>
            <ClearButton onLoadItems={onLoadItems} />
          </FavoriteAndClearWrapper>
        </>
      ) : (
        <>
          <FilterContainer>
            <SelectInput value={filters} onChange={handleFilters}>
              <option value="" disabled>
                Filter by
              </option>
              {Object.entries(filterDictionary).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </SelectInput>
            {filters && (
              <SelectInput onChange={handleSelectedFilter} value={selectedFilter}>
                <option value="" disabled>
                  Choose an option
                </option>
                {data.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </SelectInput>
            )}
          </FilterContainer>
          <FavoriteContainer>
            <span>Favorite?</span>
            <IconWrapper $isFavorite={isFavorite} onClick={handleIsFavorite}>
              <Heart />
            </IconWrapper>
          </FavoriteContainer>
        </>
      )}
    </Container>
  );
}
