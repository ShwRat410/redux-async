import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id:"p1",
    title:"Hello",
    price:28,
    description:"Heloooooooooooo"
  },
  {
    id:"p2",
    title:"BOLO",
    price:2800,
    description:"Beloooooooooooo"
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product)=>(
        <ProductItem 
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />
        ))}

      </ul>
    </section>
  );
};

export default Products;
