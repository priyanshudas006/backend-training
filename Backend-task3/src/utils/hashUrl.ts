import crypto from "crypto";

/**
 * Generates a SHA-256 hash from the given URL.
 * This hash is used as the Redis cache key.
 *
 * @param url - Complete request URL
 * @returns Hashed cache key
 */
const hashUrl = (url: string): string => {
  return crypto.createHash("sha256").update(url).digest("hex");
};

export default hashUrl;