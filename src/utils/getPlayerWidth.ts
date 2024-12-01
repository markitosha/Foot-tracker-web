export default function getPlayerWidth() {
    if (window.innerWidth < 900) {
        return window.innerWidth;
    }

    return window.innerWidth / 3 * 2;
}
