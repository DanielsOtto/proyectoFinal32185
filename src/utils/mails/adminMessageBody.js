import { ADMIN } from '../../config/config.js';

export function adminMessageBody(id, email, idCart, products, order) {
  let productsText = "";
  products.forEach(product => {
    productsText += `
      <ul>
      <li>Product: <b>${product.prod.name}</b></li>
      <li>Description: <b>${product.prod.description}</b></li>
      <li>Price per unit: <b>${product.prod.price}</b></li>
      <li>Image: <b>${product.prod.image}</b></li>
      <li>Quantity: <b>${product.cant}</b></li>
      </ul>
      <br>
    `;
  });
  return {
    from: `"NEW SALE" <${ADMIN}>`,
    to: ADMIN,
    subject: 'New sale made',
    html: `<h2>NEW SALE</h2>
           <h5>SALE data</h5>
           <p>ID buyer:</p> <b> ${id}</b>
           <p>Email buyer: </p> <b>${email} </b>
           <p>CART ID buyer:</p> <b> ${idCart} </b>
           <p>Date of the order:</p> <b> ${order.date} </b>

           <p>Products:<p> 
           ${productsText}
          `
  };
}