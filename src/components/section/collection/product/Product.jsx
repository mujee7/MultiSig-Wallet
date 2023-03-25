import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProductStyleWrapper from "./Product.style";

const Product = ({ product }) => {
  let nav = useNavigate();
  // console.log(product)
  return (
    <ProductStyleWrapper>
      
      <div className="product_details" style={{ color: "white" }}>
        <a>To: {product.to}</a>
        <span><h6>Data:  {product.data}</h6> </span>
        
        <span><h6>Value: </h6> {product.value} </span>
        <br></br>
        <br></br>
        <span><h6>numConfirmations:  {product.numConfirmations}</h6> </span>
        <br></br>
        <br></br>
        <span>{product[3]?<h6 style={{Color:"white"}}>Executed: true </h6>:<h6 style={{Color:"white"}}>Executed: false</h6>} </span>
        <p>
          
          
          <span>
            <FaRegHeart />
          </span>
        </p>
      </div>
    </ProductStyleWrapper>
  );
};

export default Product;
