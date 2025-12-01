import { atom } from "jotai";

export interface UserPreferences {
  paginationType: "pages" | "infinite" | "virtual";
  itemsPerPage: number;
  autoLoadNextPage: boolean;
  feedSortOrder: "asc" | "desc";
}

// Default preferences
const defaultPreferences: UserPreferences = {
  paginationType: "pages",
  itemsPerPage: 10,
  autoLoadNextPage: false,
  feedSortOrder: "desc",
};

// User preferences atom
export const userPreferencesAtom = atom<UserPreferences>(defaultPreferences);

// Atom to load preferences from user data
export const loadedUserPreferencesAtom = atom(
  (get) => get(userPreferencesAtom),
  async (_get, set, userPrefs: Partial<UserPreferences>) => {
    set(userPreferencesAtom, {
      ...defaultPreferences,
      ...userPrefs,
    });
  }
);

// Helper atom to save preferences to the backend
export const saveUserPreferencesAtom = atom(
  null,
  async (get, _set, preferences: Partial<UserPreferences>) => {
    const currentPrefs = get(userPreferencesAtom);
    const updatedPrefs = {
      ...currentPrefs,
      ...preferences,
    };

    // Save to backend
    try {
      const response = await fetch("/api/user/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPrefs),
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      // Update local state
      _set(userPreferencesAtom, updatedPrefs);
      
      return updatedPrefs;
    } catch (error) {
      console.error("Error saving preferences:", error);
      throw error;
    }
  }
);
