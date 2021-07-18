function getLocalStorage<Data>(key: string): Data | null {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return null;
};

function setLocalStorage<Data>(key: string, data: Data): void {
    localStorage.setItem(key, JSON.stringify(data));
};

function removeLocalStorage(key: string): void {
    localStorage.remove(key);
}

export {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
};
