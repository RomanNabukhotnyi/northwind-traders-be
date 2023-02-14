const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 

export const createId = (): string => {
    const id = new Array(5).fill(0).map(() => {
        const index = Math.floor(Math.random() * UPPERCASE.length);
        return UPPERCASE[index];
    });
    return id.join('');
};
