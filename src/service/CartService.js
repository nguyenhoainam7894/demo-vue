import axios from "axios";


const URL_CART = "http://localhost:9090/api/v1/carts";
const access_token = "nam";
class CartService {
    getAll(){
        return axios.get(URL_CART +  `/findcart?access_token=${access_token}`,{
            params: access_token,
            }
        );
    }
    addtoCart(body){
        return axios.post(URL_CART + `/add?access_token=${access_token}`, body);
    }
}
export default new CartService();