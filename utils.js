// Get local storage and findbyid and stuff, reset,

export function getFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

export function setInLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

export function findByID(array, id){
    for (const element of array){
        if (element.id === id){
            return element;
        }
    }
    return null;
}