import axios from 'axios';

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

export const getErrorMessage = (e: unknown): string => {
  if (axios.isAxiosError(e)) {
    if (e.response?.data) {
      if (typeof e.response.data === "string") {
         return e.response.data.replace('Something went wrong. Error: ', '');
      }
      if (e.response.data.error && Array.isArray(e.response.data.error)) {
        // Handle Zod errors
        return e.response.data.error.map((issue: {path: string[], message: string}) => 
          `${issue.path.join('.')}: ${issue.message}`
        ).join(', ');
      }
      if (typeof e.response.data.error === "string") {
        return e.response.data.error;
      }
    }
    return e.message;
  }
  if (e instanceof Error) {
    return e.message;
  }
  return "Unknown error";
};