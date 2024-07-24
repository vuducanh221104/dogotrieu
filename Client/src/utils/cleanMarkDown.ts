export function cleanMarkDown(description: string) {
    return description.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function cleanMarkDownLimit(description: string) {
    if (!description) return '';

    let cleaned = description.replace(/[#_*~`>+=[\]]/g, '');

    cleaned = cleaned.replace(/<\/?[^>]+(>|$)/g, '');

    cleaned = cleaned.replace(/\s+/g, ' ');

    cleaned = cleaned.trim();

    if (cleaned.length > 150) {
        cleaned = cleaned.substring(0, 150);
    }

    return cleaned;
}
