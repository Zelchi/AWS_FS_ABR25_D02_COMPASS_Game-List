import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Checkbox from "@/components/global/Checkbox";
import API from "../../utils/API";


const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
`;

type FilterBarType = {
    filter: string;
    onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selected: string;
    onSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    isFavorite: boolean;
    onFavorite: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const filterDictionary: Record<string, string> = {
    categoryBy: "Category",
    platformBy: "Platform",
    statusBy: "Status"
};

export default function FilterBar({ filter, onFilter, selected, onSelected, isFavorite, onFavorite }: FilterBarType) {
    const [data, setData] = useState<string[]>([]);

    const handleRequest = async () => {
        try {
            if (!filter) return setData([]);

            const endpoint = filterDictionary[filter] || filter;
            const response = await API.GET(`${endpoint}`);
            if (response && response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        if (filter !== 'statusBy') handleRequest();
        if (filter === 'statusBy') setData(["Playing", "Done", "Abandoned"]);

        onSelected({
            target: { value: "" }
        } as React.ChangeEvent<HTMLSelectElement>);
    }, [filter]);

    return (
        <Container>
            <FilterContainer>
                <SelectInput value={filter} onChange={onFilter} >
                    <option value="" disabled>
                        Filter by
                    </option>
                    {Object.entries(filterDictionary).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </SelectInput>
                {filter && (
                    <SelectInput onChange={onSelected} value={selected}>
                        <option value="" disabled>
                            Filter by
                        </option>
                        {data.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </SelectInput>
                )}
            </FilterContainer>
            <FavoriteContainer>
                <span>Favorite?</span>
                <Checkbox isFavorite={isFavorite} onFavorite={onFavorite} />
            </FavoriteContainer>
        </Container>
    );
}
