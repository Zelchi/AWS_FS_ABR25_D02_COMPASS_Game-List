import React from "react";
import { useState, FormEvent, useEffect, Dispatch, SetStateAction } from "react";
import HeartIcon from "@/assets/icons/heart.svg?react";
import { IGameEntity } from "@/../../server/src/Game/GameEntity";
import Button from "@/components/button/Button";
import { useModal } from "@/contexts/modalContext";
import { useGlobal } from "@/contexts/globalContext";
import API from "@/utils/API";
import {
  StyledInput,
  StyledSelection,
  StyledLabel,
  StyledButtonUpload,
  FormField,
  Form,
  ImageSelection,
  Wrapper,
  ButtonSet,
  StyledIcon,
  ImageUrl,
  ImageUpload,
  Rating,
  Favorite,
  Price,
  FormFieldMobile,
} from "@/components/forms/styles";
import StarRating from "@/components/rating/Rating/StarRating";
import { InvalidMessage } from "@/components/forms/LoginForm/styles";
import { SelectMany } from "@/components/forms/GameForm/SelectMany/SelectMany";

export interface GameFormProps {
  initialData?: Partial<IGameEntity>;
}

export interface ItemData {
  id: string;
  name: string;
}

export default function GameForm({ initialData }: GameFormProps) {
  const [categories, setCategories] = useState<ItemData[]>([]);
  const [platforms, setPlatforms] = useState<ItemData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [type] = useState(initialData && Object.keys(initialData).length > 0 ? "put" : "post");
  const { setIsModalOpen, setModalContent } = useModal();
  const { handleClear, isMobile } = useGlobal();
  const [game, setGame] = useState<Partial<IGameEntity>>({
    userId: "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    imageUrl: initialData?.imageUrl || "",
    price: initialData?.price || 1,
    status: initialData?.status || "playing",
    favorite: initialData?.favorite || false,
    rating: initialData?.rating || 1,
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
    return new Date(date).toISOString().split("T")[0];
  };

  const getSelectedIds = (type: "categories" | "platforms") => {
    return (game[type] || []).map((item) => item.id);
  };

  const handleModalConfirm = (type: "categories" | "platforms") => (selectedIds: string[]) => {
    setGame((prev) => ({
      ...prev,
      [type]: selectedIds.map((id) => ({ id })),
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
      categories: Array.isArray(game.categories)
        ? game.categories.map((cat) => ({ id: cat.id }))
        : [],
      platforms: Array.isArray(game.platforms)
        ? game.platforms.map((plat) => ({ id: plat.id }))
        : [],
    };

    try {
      const response =
        type === "post"
          ? await API.POST("/game", gameData)
          : await API.PUT(`/game/${initialData?.id}`, gameData);
      if ((response && response.status === 201) || response.status === 200) {
        setModalContent(null);
        setIsModalOpen(false);
        handleClear();
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
  };

  const handleRating = (rating: number) => {
    setGame((prev) => ({
      ...prev,
      rating: Number(rating),
    }));
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchItems("/category", setCategories),
      fetchItems("/platform", setPlatforms),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <StyledLabel htmlFor="name">Game Name</StyledLabel>
        <StyledInput
          name="name"
          value={game.name}
          onChange={(e) => setGame((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </FormField>

      <FormField>
        <StyledLabel htmlFor="description">Description</StyledLabel>
        <StyledInput
          $type={"textarea"}
          name="description"
          type="textarea"
          value={game.description || ""}
          onChange={(e) => setGame((prev) => ({ ...prev, description: e.target.value }))}
        />
      </FormField>

      {isMobile ? (
        <>
          <StyledLabel>Choose an image</StyledLabel>
          <FormField>
            <ImageUrl>
              <StyledLabel htmlFor="imageUrl">Image URL:</StyledLabel>
              <StyledInput
                name="imageUrl"
                type="url"
                value={game.imageUrl || ""}
                onChange={(e) => setGame((prev) => ({ ...prev, imageUrl: e.target.value }))}
              />
            </ImageUrl>
            <ImageUpload>
              <StyledLabel htmlFor="imageUrl">Upload file:</StyledLabel>
              <StyledButtonUpload htmlFor="fileUpload">Upload</StyledButtonUpload>
            </ImageUpload>
          </FormField>
          <FormFieldMobile>
            <Rating>
              <StyledLabel>Rating</StyledLabel>
              <StarRating onSetRating={handleRating} size={28} />
            </Rating>
            <Favorite>
              <StyledLabel htmlFor="favorite">Favorite</StyledLabel>
              <StyledIcon
                icon={HeartIcon}
                onClick={() => setGame((prev) => ({ ...prev, favorite: !prev.favorite }))}
                role="button"
                $isFavorite={game.favorite || false}
              />
            </Favorite>
          </FormFieldMobile>
        </>
      ) : (
        <FormField>
          <StyledLabel>Choose an image</StyledLabel>
          <Wrapper>
            <ImageSelection>
              <ImageUrl>
                <StyledLabel htmlFor="imageUrl">Image URL:</StyledLabel>
                <StyledInput
                  name="imageUrl"
                  type="url"
                  value={game.imageUrl || ""}
                  onChange={(e) => setGame((prev) => ({ ...prev, imageUrl: e.target.value }))}
                />
              </ImageUrl>
              <ImageUpload>
                <StyledLabel htmlFor="imageUrl">Upload file:</StyledLabel>
                <StyledButtonUpload htmlFor="fileUpload">Upload</StyledButtonUpload>
              </ImageUpload>
            </ImageSelection>
            <div>
              <Rating>
                <StyledLabel>Rating</StyledLabel>
                <StarRating onSetRating={handleRating} size={28} />
              </Rating>
              <Favorite>
                <StyledLabel htmlFor="favorite">Favorite</StyledLabel>
                <StyledIcon
                  icon={HeartIcon}
                  onClick={() => setGame((prev) => ({ ...prev, favorite: !prev.favorite }))}
                  role="button"
                  $isFavorite={game.favorite || false}
                />
              </Favorite>
            </div>
          </Wrapper>
        </FormField>
      )}

      {isMobile ? (
        <>
          <FormField>
            <StyledLabel htmlFor="price">Price</StyledLabel>
            <Price>
              <StyledLabel>$</StyledLabel>
              <StyledInput
                name="price"
                type="number"
                min={0}
                step="0.01"
                value={(game.price || 0) / 100}
                onChange={(e) =>
                  setGame((prev) => ({
                    ...prev,
                    price: Math.round(Number(e.target.value) * 100),
                  }))
                }
              />
            </Price>
          </FormField>
          <FormField>
            <StyledLabel htmlFor="status">Status</StyledLabel>
            <StyledSelection
              name="status"
              value={game.status || "playing"}
              onChange={(e) => setGame((prev) => ({ ...prev, status: e.target.value }))}
              required
            >
              <option value="playing">Playing</option>
              <option value="done">Done</option>
              <option value="abandoned">Abandoned</option>
            </StyledSelection>
          </FormField>
        </>
      ) : (
        <FormField>
          <Wrapper>
            <Price>
              <StyledLabel htmlFor="price">Price</StyledLabel>
              <div>
                <StyledLabel>$</StyledLabel>
                <StyledInput
                  name="price"
                  type="number"
                  min={0}
                  step="0.01"
                  value={(game.price || 0) / 100}
                  onChange={(e) =>
                    setGame((prev) => ({
                      ...prev,
                      price: Math.round(Number(e.target.value) * 100),
                    }))
                  }
                />
              </div>
            </Price>
            <div>
              <StyledLabel htmlFor="status">Status</StyledLabel>
              <StyledSelection
                name="status"
                value={game.status || "playing"}
                onChange={(e) => setGame((prev) => ({ ...prev, status: e.target.value }))}
                required
              >
                <option value="playing">Playing</option>
                <option value="done">Done</option>
                <option value="abandoned">Abandoned</option>
              </StyledSelection>
            </div>
          </Wrapper>
        </FormField>
      )}

      {isMobile ? (
        <>
          <FormField>
            <StyledLabel htmlFor="acquisDate">Acquisition Date</StyledLabel>
            <StyledInput
              $type="date"
              name="acquisDate"
              type="date"
              value={formatDateForInput(game.acquisDate as Date)}
              onChange={(e) =>
                setGame((prev) => ({ ...prev, acquisDate: new Date(e.target.value) }))
              }
              required
            />
          </FormField>
          <FormField>
            <StyledLabel htmlFor="finishDate">Completion Date</StyledLabel>
            <StyledInput
              $type="date"
              name="finishDate"
              type="date"
              value={formatDateForInput(game.finishDate as Date)}
              onChange={(e) =>
                setGame((prev) => ({
                  ...prev,
                  finishDate: e.target.value ? new Date(e.target.value) : null,
                }))
              }
              required
            />
          </FormField>
        </>
      ) : (
        <FormField>
          <Wrapper>
            <div>
              <StyledLabel htmlFor="acquisDate">Acquisition Date</StyledLabel>
              <StyledInput
                $type="date"
                name="acquisDate"
                type="date"
                value={formatDateForInput(game.acquisDate as Date)}
                onChange={(e) =>
                  setGame((prev) => ({ ...prev, acquisDate: new Date(e.target.value) }))
                }
                required
              />
            </div>

            <div>
              <StyledLabel htmlFor="finishDate">Completion Date</StyledLabel>
              <StyledInput
                $type="date"
                name="finishDate"
                type="date"
                value={formatDateForInput(game.finishDate as Date)}
                onChange={(e) =>
                  setGame((prev) => ({
                    ...prev,
                    finishDate: e.target.value ? new Date(e.target.value) : null,
                  }))
                }
                required
              />
            </div>
          </Wrapper>
        </FormField>
      )}

      {isMobile ? (
        <>
          <FormField>
            <StyledLabel htmlFor="Categories">Categories</StyledLabel>
            <SelectMany
              label="Categories"
              modalTitle="SelectMany Categories"
              items={categories}
              selectedItemIds={getSelectedIds("categories")}
              loading={loading}
              onConfirm={handleModalConfirm("categories")}
            />
          </FormField>
          <FormField>
            <StyledLabel htmlFor="Platforms">Platforms</StyledLabel>
            <SelectMany
              label="Platforms"
              modalTitle="SelectMany Platforms"
              items={platforms}
              selectedItemIds={getSelectedIds("platforms")}
              loading={loading}
              onConfirm={handleModalConfirm("platforms")}
            />
          </FormField>
        </>
      ) : (
        <FormField>
          <Wrapper>
            <div>
              <StyledLabel htmlFor="Categories">Categories</StyledLabel>
              <SelectMany
                label="Categories"
                modalTitle="SelectMany Categories"
                items={categories}
                selectedItemIds={getSelectedIds("categories")}
                loading={loading}
                onConfirm={handleModalConfirm("categories")}
              />
            </div>
            <div>
              <StyledLabel htmlFor="Platforms">Platforms</StyledLabel>
              <SelectMany
                label="Platforms"
                modalTitle="SelectMany Platforms"
                items={platforms}
                selectedItemIds={getSelectedIds("platforms")}
                loading={loading}
                onConfirm={handleModalConfirm("platforms")}
              />
            </div>
          </Wrapper>
        </FormField>
      )}

      {error && <InvalidMessage>{error}</InvalidMessage>}

      <ButtonSet>
        <Button
          type="button"
          variant="danger"
          size="large"
          onClick={handleCancel}
          disabled={submitting}
        >
          {" "}
          Cancel{" "}
        </Button>
        <Button type="submit" size="large" disabled={submitting}>
          {" "}
          {submitting ? "Saving..." : "Save"}{" "}
        </Button>
      </ButtonSet>
    </Form>
  );
}
