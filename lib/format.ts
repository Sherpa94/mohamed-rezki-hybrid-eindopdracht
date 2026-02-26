export function formatEventDate(dateString: string | Date) {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(dateString));
}

export function formatPrice(priceInCents: number) {
    if (priceInCents === 0) return "Free";

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(priceInCents / 100);
}