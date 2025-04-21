export const sanitizeId = (input: string) => {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input for sanitizeId');
  }
  return btoa(input).replace(/=+$/, '').replace(/\//g, '_');
};

export const decodeId = (encodedId: string): string => {
  try {
    return atob(encodedId);
  } catch (error) {
    console.error('Error decoding ID:', error);
    return '';
  }
};
