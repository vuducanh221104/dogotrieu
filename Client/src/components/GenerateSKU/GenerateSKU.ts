export function useGenerateSKU() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';

    // Tạo ra 3 chữ cái ngẫu nhiên từ letters
    const randomLetters = Array.from({ length: 3 }, () =>
        letters.charAt(Math.floor(Math.random() * letters.length)),
    ).join('');

    // Tạo ra 5 ký tự số ngẫu nhiên từ digits
    const randomDigits = Array.from({ length: 5 }, () => digits.charAt(Math.floor(Math.random() * digits.length))).join(
        '',
    );

    // Kết hợp chữ cái và số để tạo SKU hoàn chỉnh
    const sku = randomLetters + randomDigits;

    return sku;
}
