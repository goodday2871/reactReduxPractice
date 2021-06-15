import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id:'p1',
    price:6,
    title:'This is a book', 
    description:'the book is dummy'
  },
  {
    id:'p2',
    price:12,
    title:'This is another book', 
    description:'the book is also dummy '
  }

]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(item=>(
          <ProductItem 
            title={item.title} 
            price={item.price} 
            description={item.description} 
            key={item.id}
            id={item.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
