const orderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const random = Math.floor(Math.random() * 1000);
    return `${year}${month}${random}`;
}
export default orderNumber;

