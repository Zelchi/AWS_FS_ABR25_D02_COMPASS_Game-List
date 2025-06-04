import { useState, FormEvent, useEffect, Dispatch, SetStateAction } from "react";
import { IGameEntity } from "../../../../server/src/Game/GameEntity";
import { SelectionField } from "./Fields/SelectionField";
import { FormField } from "./Fields/FormField";
import { useModal } from "@/contexts/modalContext";
import API from "@/utils/API";

export interface GameFormProps {
    initialData?: Partial<IGameEntity>;
}

export interface ItemData {
    id: string;
    name: string;
}

export default function GameForm({
    initialData,
}: GameFormProps) {

    const [categories, setCategories] = useState<ItemData[]>([]);
    const [platforms, setPlatforms] = useState<ItemData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [type] = useState(initialData ? "put" : "post");
    const { setIsModalOpen, setModalContent } = useModal();
    const [game, setGame] = useState<Partial<IGameEntity>>({
        userId: "",
        name: initialData?.name || "",
        description: initialData?.description || "",
        imageUrl: initialData?.imageUrl || "",
        price: initialData?.price || 0,
        status: initialData?.status || "playing",
        favorite: initialData?.favorite || false,
        rating: initialData?.rating || 0,
        acquisDate: initialData?.acquisDate ? new Date(initialData.acquisDate) : null,
        finishDate: initialData?.finishDate ? new Date(initialData.finishDate) : null,
        categories: initialData?.categories || [],
        platforms: initialData?.platforms || [],
    });

    const fetchItems = async (endpoint: string, setItems: Dispatch<SetStateAction<ItemData[]>>) => {
        const response = await API.GET(endpoint);
        if (response && response.data) {
            setItems(Array.isArray(response.data) ? response.data : []);
        }
    };

    const formatDateForInput = (date: Date | null | undefined) => {
        if (!date) return "";
        return new Date(date).toISOString().split('T')[0];
    };

    const getSelectedIds = (type: 'categories' | 'platforms') => {
        return (game[type] || []).map(item => item.id);
    };

    const handleModalConfirm = (type: 'categories' | 'platforms') => (selectedIds: string[]) => {
        setGame(prev => ({
            ...prev,
            [type]: selectedIds.map(id => ({ id }))
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        const gameData = {
            userId: game.userId,
            name: game.name,
            description: game.description,
            imageUrl: game.imageUrl,
            status: game.status,
            favorite: game.favorite,
            rating: game.rating,
            price: game.price,
            acquisDate: game.acquisDate instanceof Date ? game.acquisDate.toISOString() : game.acquisDate,
            finishDate: game.finishDate instanceof Date ? game.finishDate.toISOString() : game.finishDate,
            categories: Array.isArray(game.categories) ? game.categories.map(cat => ({ id: cat.id })) : [],
            platforms: Array.isArray(game.platforms) ? game.platforms.map(plat => ({ id: plat.id })) : []
        };

        try {
            const response = type === "post"
                ? await API.POST("/game", gameData)
                : await API.PUT(`/game/${initialData?.id}`, gameData);
            if (response && response.status === 201 || response.status === 200) {
                setIsModalOpen(false);
                setModalContent(null);
            }
        } catch (e) {
            setError("An error occurred while saving the game. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalContent(null);
    }

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetchItems("/category", setCategories),
            fetchItems("/platform", setPlatforms)
        ]).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                id="name"
                label="Game Name"
                value={game.name || ""}
                onChange={(e) => setGame(prev => ({ ...prev, name: e.target.value }))}
            />

            <FormField
                id="description"
                label="Description"
                type="textarea"
                value={game.description || ""}
                onChange={(e) => setGame(prev => ({ ...prev, description: e.target.value }))}
            />

            <FormField
                id="imageUrl"
                label="Image URL"
                type="url"
                value={game.imageUrl || ""}
                onChange={(e) => setGame(prev => ({ ...prev, imageUrl: e.target.value }))}
            />

            <FormField
                id="price"
                label="Price"
                type="number"
                min={0}
                step="0.01"
                value={(game.price || 0) / 100}
                onChange={(e) => setGame(prev => ({
                    ...prev,
                    price: Math.round(Number(e.target.value) * 100)
                }))}
            />

            <div>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    value={game.status || "playing"}
                    onChange={(e) => setGame(prev => ({ ...prev, status: e.target.value }))}
                >
                    <option value="playing">Playing</option>
                    <option value="done">Done</option>
                    <option value="abandoned">Abandoned</option>
                </select>
            </div>

            <div>
                <input
                    id="favorite"
                    type="checkbox"
                    checked={game.favorite || false}
                    onChange={(e) => setGame(prev => ({ ...prev, favorite: e.target.checked }))}
                />
                <label htmlFor="favorite">Favorite</label>
            </div>


            <FormField
                id="acquisDate"
                label="Acquisition Date"
                type="date"
                value={formatDateForInput(game.acquisDate as Date)}
                onChange={(e) => setGame(prev => ({ ...prev, acquisDate: new Date(e.target.value) }))}
            />

            <FormField
                id="finishDate"
                label="Completion Date"
                type="date"
                value={formatDateForInput(game.finishDate as Date)}
                onChange={(e) => setGame(prev => ({
                    ...prev,
                    finishDate: e.target.value ? new Date(e.target.value) : null
                }))}
            />

            <SelectionField
                label="Categories"
                modalTitle="Select Categories"
                items={categories}
                selectedItemIds={getSelectedIds('categories')}
                loading={loading}
                onConfirm={handleModalConfirm('categories')}
            />

            <SelectionField
                label="Platforms"
                modalTitle="Select Platforms"
                items={platforms}
                selectedItemIds={getSelectedIds('platforms')}
                loading={loading}
                onConfirm={handleModalConfirm('platforms')}
            />

            {error && <p>{error}</p>}

            <div>
                <button type="button" onClick={handleCancel} disabled={submitting}> Cancel </button>
                <button type="submit" disabled={submitting}> {submitting ? "Saving..." : "Save"} </button>
            </div>
        </form>
    );
}