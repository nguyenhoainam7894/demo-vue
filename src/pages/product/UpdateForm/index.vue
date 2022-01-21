<template>
  <a-card>
    <a-form :datasrc="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">

      <a-form-item  label="Name">
        <a-input v-model="form.name" v-decorator="['name', { rules: [{ required: true, message: 'Please input your name!' }] }]"/>
      </a-form-item>

      <a-form-item  label="Price">
        <a-input v-model="form.price" v-decorator="['price', { rules: [{ required: true, message: 'Please input your name!' }] }]"/>
      </a-form-item>

      <a-form-item  label="Status">
        <a-input v-model="form.status" v-decorator="['status', { rules: [{ required: true, message: 'Please input your name!' }] }]"/>
      </a-form-item>
      <a-form-item  label="Category">
        <a-select  v-model="form.categoryId">
          <a-select-option  v-for="cate in categories" :key="cate.id" :value="cate.id">
            {{cate.name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item  label="Description">
        <a-input v-model="form.description" v-decorator="['description', { rules: [{ required: true, message: 'Please input your name!' }] }]"/>
      </a-form-item>

      <a-form-item  label="Thumnail">
        <a-input v-model="form.image" v-decorator="['image', { rules: [{ required: true, message: 'Please input your name!' }] }]"/>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" @click="editProduct()">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import ProductService from "@/service/ProductService";
import CategoryService from "@/service/CategoryService";
export default {
  data() {
    return {
      categories:[],
      params:undefined,
      form:{
        name:undefined,
        price:undefined,
        description:undefined,
        status:undefined,
        categoryId:undefined,
        image: undefined
      }
    }
  },
  created() {
    this.params = this.$router.currentRoute.params.id;
    this.getDetail();
    this.getCategories();
  },
  methods: {
    getDetail(){
      ProductService.detail(this.params).then(res=>
      {
        this.form = res.data;
      })
    },
    editProduct(){
      ProductService.update(this.params, this.form).then(
          this.$router.push("/products/list")
      )
    },
    async getCategories(){
      const cateGet = await CategoryService.getAllCategories();
      console.log(cateGet);
      this.categories = cateGet.data;
    }




    // handleSelectChange(value) {
    //   console.log(value);
    //   this.form.setFieldsValue({
    //     note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    //   });
    // },
  },
};
</script>