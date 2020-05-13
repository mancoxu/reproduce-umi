export const setLocalStorage = (name: string, data: any) => {
    localStorage[name] = JSON.stringify(data);
};

export const getLocalStorage = (name: string) => {
    const result = localStorage.getItem(name);
    return result === null ? result : JSON.parse(result);
};
export const removeLocalStorage = (name: string) => localStorage.removeItem(name);

export const setSessionStorage = (name: string, data: any) => {
    sessionStorage[name] = JSON.stringify(data);
};

export const getSessionStorage = (name: string) => {
    const result = sessionStorage.getItem(name);
    return result === null ? null : JSON.parse(result);
};
