export const localStorageSetItem = (itemName , item) => {
    localStorage.setItem(itemName, JSON.stringify(item));
}

export const localStorageGetItem = (itemName) => {
    return JSON.parse(localStorage.getItem(itemName));
}