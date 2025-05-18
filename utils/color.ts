import { Colors } from "~/constants/colors";

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

export function getRandomColor() {
    const colors = Colors;
    const availableColors = [...colors];

    return () => {
        if (availableColors.length === 0) return 'gray';
        const randomIndex = Math.floor(Math.random() * availableColors.length);
        const color = availableColors[randomIndex];
        availableColors.splice(randomIndex, 1);
        return color;
    };
};