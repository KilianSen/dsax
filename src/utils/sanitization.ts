// A novel approach to sanitizing user-generated content (UGC) by only allowing a small subset of characters to pass through
// This should be replaced with a more robust solution in a production environment
export function sanitize(ugc: string): string {
    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,-:"
    return ugc.split("").filter((char) => allowedChars.includes(char)).join("")
}