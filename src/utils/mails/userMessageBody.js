import { ADMIN } from "../../config/config.js";


export function userMessageBody(email, products) {
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
    from: `'"Succesfull purchase" <${ADMIN}>'`,
    to: email,
    subject: "Succesfull purchase",
    text: `NEW SALE
           SALE data:
           Email buyer: ${email}
           Products: 
           
           ${productsText}
          `
  };
}

// modificar a mensaje HTML !!

[
  {
    prod: {
      id: '1bd6dc90-b8be-4630-9ed7-9230f03f1712',
      name: 'televisor',
      price: 8555,
      description: 'es una cosita hermosa',
      image: 'lololo'
    },
    cant: 3
  },
  {
    prod: {
      id: '739af2f6-6ad0-4099-b7d2-8c08ea036fac',
      name: 'tractor',
      price: 1505999,
      description: 'es amarillo',
      image: 'lololo'
    },
    cant: 8
  }
]