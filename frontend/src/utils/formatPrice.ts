const formatPrice = (price: number) => {
  let newFormattedPrice = '';
  newFormattedPrice = (price).toFixed(2).replace('.', ',');
  newFormattedPrice = `R$ ${newFormattedPrice}`;
  return newFormattedPrice;
};

export default formatPrice;
