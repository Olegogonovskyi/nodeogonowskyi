export const isValid = (name: string, pattern: RegExp): boolean => {
    return pattern.test(name);
}
