export const isValidName = (name: string, pattern: RegExp): boolean => {
    return pattern.test(name);
}
