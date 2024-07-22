export const patternService = (chek:  string, pattern: RegExp): boolean => {
    return pattern.test(chek)
}