import API from "@/utils/API";
import { EntityWithId } from "@/types/types";

export async function getAllItems<T>(path: string): Promise<T[] | null> {
  try {
    const response = await API.GET(path);
    if (response.status === 200) {
      return response.data as T[];
    }
  } catch (error) {
    console.error(`GET failed for ${path}:`, error);
  }
  return null;
}

export async function getItem<T>(id: string, path: string): Promise<T | null> {
  try {
    const response = await API.GET(`${path}/${id}`);
    if (response.status === 200) {
      return response.data as T;
    }
  } catch (error) {
    console.error(`GET failed for ${path}:`, error);
  }
  return null;
}

export async function addItem<T extends object>(newItem: T, path: string): Promise<T[] | null> {
  try {
    const response = await API.POST(path, newItem);
    if (response.status === 201) return await getAllItems(path);
  } catch (error) {
    console.error(`POST failed for ${path}:`, error);
  }
  return null;
}

export async function updateItem<T extends EntityWithId>(
  updatedItem: T,
  path: string,
): Promise<T[] | null> {
  try {
    const response = await API.PUT(`${path}/${updatedItem.id}`, updatedItem);
    if (response.status === 200) return await getAllItems(path);
  } catch (error) {
    console.error(`PUT failed for ${path}:`, error);
  }
  return null;
}

export async function deleteItem<T>(id: string, path: string): Promise<T[] | null> {
  try {
    const response = await API.DELETE(`${path}/${id}`);
    if (response.status === 204) return await getAllItems(path);
  } catch (error) {
    console.error(`DELETE failed for ${path}:`, error);
  }
  return null;
}
