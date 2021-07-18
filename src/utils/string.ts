function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function kebabCaseToCamelCase(string: string): string {
    return string.replace(/([-_][a-z])/ig, (v) => {
        return v.toUpperCase()
            .replace('-', '')
            .replace('_', '');
    });
}

function genID(): string {
    return Math.random().toString(16).slice(2, 8) + Date.now().toString(16).slice(4, 8);
}

export {
    capitalizeFirstLetter,
    kebabCaseToCamelCase,
    genID,
};
