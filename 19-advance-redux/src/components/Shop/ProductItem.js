import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

import { cartActions } from "../../store/index.js";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, price, description } = props;

  const handleAddToCart = (item) => {
    dispatch(cartActions.addToCart(item));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button
            onClick={(event) => {
              const item = {
                title,
                price,
                description,
                id,
              };
              handleAddToCart(item);
            }}
          >
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;