export function cleanMarkDown(description: string) {
    return description.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
}
