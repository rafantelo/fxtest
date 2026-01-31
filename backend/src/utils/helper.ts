/**
 * Helper function to validate if a string is a valid UUID
 */
export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Helper function to safely parse an integer
 */
export const safeParseInt = (value: string | undefined, defaultValue = 0): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Helper function to handle pagination params
 */
export const getPaginationParams = (req: any): { page: number; limit: number; offset: number } => {
  const page = safeParseInt(req.query.page, 1);
  const limit = safeParseInt(req.query.limit, 10);
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
};

/**
 * Helper function to format error messages
 */
export const formatError = (error: any): { message: string; details?: any } => {
  if (error instanceof Error) {
    return {
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };
  }
  
  return { message: String(error) };
};
