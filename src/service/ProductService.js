import axios from "axios";

const URL_PRODUCTS = "http://localhost:9090/api/v1/products";

class ProductService {

    getAll(params){
        return axios.get(URL_PRODUCTS + "/list", {
            params: params
        });
    }

    create(data){
        return axios.post(URL_PRODUCTS + "/insert", data)
    }

    delete(id){
        return axios.delete(URL_PRODUCTS + "/" + id)
    }
    update(id,data){
        return axios.put(URL_PRODUCTS + "/" + id, data)
    }
    detail(id){
        return axios.get(URL_PRODUCTS + "/" + id)
    }

}

export default new ProductService();