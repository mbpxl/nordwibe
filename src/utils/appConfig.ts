let currentUserId: string | null = null;

export const setCurrentUserId = (id: string) => {
  currentUserId = id;
};

export const getCurrentUserId = (): string | null => {
  return currentUserId;
};