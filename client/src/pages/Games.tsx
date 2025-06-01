const initialGames: IGameEntity[] = [
    {
        id: "1",
        userId: "1",
        imageUrl: "",
        name: "Mario Kart",
        description: "Mario B que ganhei de aniversário",
        categories: [{ id: "1" }],
        favorite: true,
        acquisDate: new Date(Date.now()),
        finishDate: null,
        status: "Playing",
        updatedAt: new Date(Date.now()),
    },
];

const labels = {
    name: "Title",
    description: "Description",
    imageUrl: "Image",
    status: "Status",
    favorite: "Favorite",
    rating: "Rating",
    acquisDate: "Acquisition Date",
    finishDate: "Finished Date",
    price: "Price",
    categories: "Categories",
    platforms: "Platforms",
    updatedAt: "Last Update",
};

import SiteLayout from "@/components/global/SiteLayout";
import { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import { getAllItems, getItem } from "@/utils/crudHandlers";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import FilterAndSearchBar from "@/components/global/FilterAndSearchBar";
import Table from "@/components/global/Table";

export default function Games() {
    const [games, setGames] = useState<IGameEntity[]>(initialGames);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("updatedAt");
    const [filterList, setFilterList] = useState<string>("");
    const [filterSelected, setFilterSelected] = useState("");
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<string>("desc");

    const pathAPI = `game/page?page=${page}&limit=${limit}` +
        `&sortBy=${sortBy}&sortOrder=${sortOrder}` +
        `${filterSelected ? `&${filterList}=${filterSelected}` : ""}` +
        `${isFavorite ? `&isFavorite=${isFavorite}` : ""}`;

    const handleFilterList = (e: ChangeEvent<HTMLSelectElement>): void => {
        setFilterList(e.target.value);
    };

    const handleFilterSelected = (e: ChangeEvent<HTMLSelectElement>): void => {
        setFilterSelected(e.target.value);
    }

    const handleFavorite = (e: ChangeEvent<HTMLInputElement>): void => {
        setIsFavorite((is) => !is);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

    const handleSortByAndOrder = (e: MouseEvent<HTMLButtonElement>): void => {
        if (e.currentTarget.value === sortBy) {
            setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
            return;
        }
        setSortOrder("asc");
        setSortBy(e.currentTarget.value);
    };

    const handleClear = () => {
        setFilterList("");
        setFilterSelected("");
        setIsFavorite(false);
        setSearch("");
        setSortBy("updatedAt");
    };

    const fetchData = async (path: string) => {
        const response = await getAllItems<{ games: IGameEntity[] }>(path);
        if (response && response.games) {
            setGames(response.games);
        }
    };

    const handleRequest = async (): Promise<void> => {
        const searchInput = search.trim();
        if (!searchInput) return fetchData(pathAPI);
        if (searchInput) return fetchData(`${pathAPI}&search=${search}`);
    };

    useEffect(() => {
        handleRequest();
    }, [page, limit, sortBy, sortOrder, filterSelected, isFavorite]);

    return (
        <SiteLayout>
            <FilterAndSearchBar
                filter={filterList}
                onFilter={handleFilterList}
                selected={filterSelected}
                onSelected={handleFilterSelected}
                isFavorite={isFavorite}
                onFavorite={handleFavorite}
                search={search}
                onSearch={handleSearch}
                onRequest={handleRequest}
                onClear={handleClear}
            />
            <Table<IGameEntity>
                data={games}
                header={["name", "rating", "price", "acquisDate", "finishDate", "updatedAt"]}
                labels={labels}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortByAndOrder={handleSortByAndOrder}
                path={pathAPI}
                onItemsChange={setGames}
                onClear={handleClear}
            />
            {/*Pagination*/}
        </SiteLayout>
    );
}