import { EntityWithId } from "@/types/types";
import API from "@/utils/API";

export async function getAllItems<TOutput>(path: string): Promise<TOutput[] | null> {
  try {
    const { data, status } = await API.GET(path);

    if (status === 200) {
      return data;
    }
  } catch (error) {
    console.error(`GET failed for ${path}:`, error);
  }
  return null;
}

export async function getItem<TOutput>(id: string, path: string): Promise<TOutput | null> {
  try {
    const response = await API.GET(`${path}/${id}`);
    if (response.status === 200) {
      return response.data as TOutput;
    }
  } catch (error) {
    console.error(`GET failed for ${path}:`, error);
  }
  return null;
}

export async function addItem<TInput extends object, TOutput>(
  newItem: TInput,
  path: string,
): Promise<TOutput[] | null> {
  try {
    const response = await API.POST(path, newItem);
    if (response.status === 201) return await getAllItems<TOutput>(path);
  } catch (error) {
    console.error(`POST failed for ${path}:`, error);
  }
  return null;
}

export async function updateItem<TInput extends EntityWithId, TOutput>(
  updatedItem: TInput,
  path: string,
): Promise<TOutput[] | null> {
  try {
    const response = await API.PUT(`${path}/${updatedItem.id}`, updatedItem);
    if (response.status === 200) return await getAllItems<TOutput>(path);
  } catch (error) {
    console.error(`PUT failed for ${path}:`, error);
  }
  return null;
}

export async function deleteItem<TOutput>(id: string, path: string): Promise<TOutput[] | null> {
  try {
    const response = await API.DELETE(`${path}/${id}`);
    if (response.status === 204) return await getAllItems<TOutput>(path);
  } catch (error) {
    console.error(`DELETE failed for ${path}:`, error);
  }
  return null;
}
