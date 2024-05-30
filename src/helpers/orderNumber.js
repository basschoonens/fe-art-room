// Description: This file contains the function that generates the order number consisting of the current date and a random number.

const orderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const random = Math.floor(Math.random() * 1000);
    return `${year}${month}${random}`;
}
export default orderNumber;

