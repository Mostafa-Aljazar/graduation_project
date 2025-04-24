export default function getLimitedWords(text: string, limit: number = 100) {
    const words = text.trim().split(/\s+/);
    const first500 = words.slice(0, limit);
    return first500.join(' ');
};
