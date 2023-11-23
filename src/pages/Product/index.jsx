import  {useEffect ,useState , createContext} from 'react'
import SingleProduct from "./SingleProduct";
import { useParams } from 'react-router-dom'
import { SingleProductAPI } from '../../middlewave/products/listsAPI';
import Breadcrumb from '../../components/Breadcrumb';
import ProductRecommended from './ProductRecommended';

export const SelectedVariants = createContext(null);

export default function Product() {
  const [variant, setVariant] = useState("")
  const [product, setProduct] = useState({})
  const { productHandle } = useParams();
  useEffect(() => {
    async function fetchMyAPI(){
        let response = await SingleProductAPI(productHandle);
        setProduct(response);
    }
    fetchMyAPI();
  }, [productHandle])
  return (
    <SelectedVariants.Provider value={{variant, setVariant}}>
      <Breadcrumb />
      <SingleProduct product={product}/>
      <ProductRecommended productID={product?.id} />
    </SelectedVariants.Provider>
  );
}
