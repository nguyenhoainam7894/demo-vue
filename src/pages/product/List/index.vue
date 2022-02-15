<template>
  <div>
    <h1>Products</h1>
<!--    <a-input-search placeholder="input search text" style="width: 600px" @search="onSearch" />-->
    <div>
      <a-form @submit="handlerSearch" class="product__search-form">
        <a-form-item>
          <a-input-search v-model="params.name" placeholder="Search by name">
            <a-icon type="search"/>
          </a-input-search>
        </a-form-item>
        <a-form-item>
          <a-select placeholder="Search by category" v-model="params.categoryId">
            <a-select-option v-for="cate in categories" :key="cate.id" :value="cate.id">
              {{cate.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select placeholder="Min price" v-model="params.minPrice">
            <a-select-option :value="1000">
              1.000
            </a-select-option>
            <a-select-option :value="3000">
              3.000
            </a-select-option>
            <a-select-option :value="5000">
              5.000
            </a-select-option>
            <a-select-option :value="7000">
              7.000
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select placeholder="Max price" v-model="params.maxPrice">
            <a-select-option :value="1000">
              1.000
            </a-select-option>
            <a-select-option :value="3000">
              3.000
            </a-select-option>
            <a-select-option :value="5000">
              5.000
            </a-select-option>
            <a-select-option :value="7000">
              7.000
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select placeholder="Sort" v-model="params.sortType">
            <a-select-option :value="100000">
              100.000
            </a-select-option>
            <a-select-option :value="200000">
              200.000
            </a-select-option>
            <a-select-option :value="300000">
              300.000
            </a-select-option>
            <a-select-option :value="400000">
              400.000
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-button type="primary" html-type="submit" @click="handlerSearch">
        Search
      </a-button>
      <a-button type="primary" html-type="submit" @click="resetButton" style="margin-left: 20px">
        Reset
      </a-button>
    </div>
    <a-card>
      <a-table style="margin-bottom: 15px" :pagination="false" :columns="columns" :data-source="data">

       <span slot="thumbnail" slot-scope="text">
         <img :src="text.split(',')[0]" style="width: 100%">
       </span>
        <div slot="action" slot-scope="text,data">
          <a class="button" @click="showDeleteConfirm(data.id)"><a-icon type="delete" /></a> |
          <a class="button" :href="'/products/edit/'+ data.id "><a-icon type="edit" /></a> |
          <a class="button" :href="'/products/detail/'+ data.id " ><a-icon type="info-circle" /></a> |
          <a class="button" @click="addToCart(data.id) " ><a-icon type="shopping-cart" /></a>
        </div>
      </a-table>
      <div>
        <a-pagination
            show-size-changer
            :page-size.sync="this.params.pageSize"
            :total="totalRecord"
            @showSizeChange="onShowSizeChange"
            @change = "changePage"
        />
      </div>
    </a-card>
  </div>
</template>
<script>

import {columns} from "@/pages/product/columns";
import ProductService from "@/service/ProductService";
import CategoryService from "@/service/CategoryService";
import CartService from "@/service/CartService";


export default {
  data() {
    return {
      data: [],
      form:{
        productId:undefined,
        quantity:1
      },
      columns: columns,
      totalRecord: undefined,
      categories:[],
      params: {
        pageSize:5,
        page: 1,
        name: undefined,
        categoryId:undefined,
        minPrice: undefined,
        maxPrice:undefined,
      }
    };
  },
  created() {
    this.getProducts()
    this.getCategories()
  }
  ,
  methods: {
    getProducts() {
      ProductService.getAll(this.params)
          .then(res => {
            this.data = res.data.data
            this.totalRecord = res.data.pagination.totalItems;
            console.log("res: ", res)
          })
          .catch(err => console.log(err))
    },

    onShowSizeChange(current, pageSize) {
      this.params.pageSize = pageSize
      this.getProducts()
    },

    changePage(current){
      this.params.page = current;
      this.getProducts();
    },
    deleteProduct(id){
      ProductService.delete(id);
      this.getProducts();
    },
    showDeleteConfirm(id){
      this.$confirm({
        title:"Do you want delete product with id" + id,
        onOk: ()=>{
          this.deleteProduct(id)
        },
        onCancel(){
          console.log("Cancel")
        }
      })
    },
    handlerSearch(e){
      e.preventDefault();
      this.params.page=1;
      this.getProducts();
    },
    getCategories(){
      CategoryService.getAllCategories().then(
        res=>{
          this.categories = res.data;
      }
      )
    },
    resetButton(){
      this.params = {
        categoryId: undefined,
        maxPrice: undefined,
        minPrice: undefined,
        name: undefined,
        page: undefined,
      }
    },
    addToCart(id){
      this.form.productId = id
      CartService.addtoCart(this.form).then(response=>{
        console.log(response)
        this.$message.success("ADD TO CART SUCCESS")
      })
    }
  }
};
</script>
<style>
.product__search-form{
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
}
</style>
