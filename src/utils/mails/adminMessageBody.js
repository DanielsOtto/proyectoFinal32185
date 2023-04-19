import { ADMIN } from '../../config/config.js';

export function adminMessageBody(id, email, idCart, products) {
  let productsText = "";
  products.forEach(product => {
    productsText += `
      Product: ${product.prod.name}
      Description: ${product.prod.description}
      Price per unit: ${product.prod.price}
      Quantity: ${product.cant}
    `;
  });
  return {
    from: `"NEW SALE" <${ADMIN}>`,
    to: ADMIN,
    subject: 'New sale made',
    text: `NEW SALE
           SALE data:
           ID buyer: ${id}
           Email buyer: ${email}
           CART ID buyer: ${idCart}

           Products: 
           
           ${productsText}
          `
  };
}