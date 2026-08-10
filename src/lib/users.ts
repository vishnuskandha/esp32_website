// Demo credentials - CHANGE THESE before deploying publicly.
// Never reuse personal passwords; manage credentials via
// environment variables for production deployments.
export const users = {
    "admin": "admin123",
    "guest": "guest123",
    "demo": "demo123",
    "principal": "principal123"
};

export type Username = keyof typeof users;
