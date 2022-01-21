import axios from "axios";

const URL_CATEGORY = "http://localhost:9090/api/v1/categories";

class CategoryService{
    getAllCategories = ()=> axios.get(URL_CATEGORY+'/list');
}
export default new CategoryService();


