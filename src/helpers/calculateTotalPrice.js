export const calculateTotalPrice = (artworks) => {
    return artworks.reduce((total, item) => total + item.sellingPrice, 0);
};