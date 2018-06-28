export function formatPostcode(postcode) {
    const parts = postcode.toUpperCase().match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/);
    parts.shift();

    return parts.join(' ');
}
