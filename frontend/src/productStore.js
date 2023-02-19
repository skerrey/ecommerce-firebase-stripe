// Description: Product store data

const productsArray = [
  {
    id: "price_1MbqqnEf1jo0J7CjACcaz1tE",
    title: "Coffee",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    imageAlt: "Coffee",
  },
  {
    id: "price_1MbqvLEf1jo0J7Cjq8MEaT6k",
    title: "Tea",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    imgAlt: "Tea",
  },
  {
    id: "price_1Mbqw0Ef1jo0J7CjeMQ2mqEA",
    title: "Water",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1614887065001-06c958a7cddd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    imgAlt: "Water",
  },
]

function getProductData(id) {
  let productData = productsArray.find(product => product.id === id);

  if (productData === undefined) {
    console.log("Product data does not exist for ID: " + id);
    return undefined;
  }

  return productData;
}

export { productsArray, getProductData };