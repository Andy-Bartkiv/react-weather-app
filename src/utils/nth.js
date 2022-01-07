export default function nth(n) {
    return n + ["th", "st", "nd", "rd"][n % 100 > 10 && n % 100 < 14 || n % 10 > 3 ? 0 : n % 10]
}