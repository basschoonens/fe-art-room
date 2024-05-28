export const currencyFormat = (num) => {
    return 'Sales price : €' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
