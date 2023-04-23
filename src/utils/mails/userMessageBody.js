import { ADMIN } from '../../config/config.js';


export function userMessageBody(email, products, order) {
  let productsText = '';
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
    from: `'"Succesfull purchase" <${ADMIN}>'`,
    to: email,
    subject: "Succesfull purchase",
    html: `<h2>NEW SALE</h2>
           <h5>SALE data:</h5>
           <p>Email buyer: <b>${email}<b></p>
           <p>Date of the order: <b>${order.date}</b> </p>
           <p>Products:</p> 
           ${productsText}
          `
  };
}