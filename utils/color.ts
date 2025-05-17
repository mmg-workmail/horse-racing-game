export function generateColors(
    count: number = 20,
    saturation: number = 100,
    lightness: number = 50
): string[] {
    const step = 360 / count
    return Array.from({ length: count }, (_, i) =>
        `hsl(${Math.round(i * step)}, ${saturation}%, ${lightness}%)`
    )
}