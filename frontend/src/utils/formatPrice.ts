const formatPrice = (price: string) => {
  let newFormattedPrice = '';
  newFormattedPrice = price.replace('.', ',');
  newFormattedPrice = `R$ ${newFormattedPrice}`;
  return newFormattedPrice;
}

export default formatPrice;
