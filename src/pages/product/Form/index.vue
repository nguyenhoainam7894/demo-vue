<template>
  <a-card>
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">

      <a-form-item label="Name">
        <a-input v-decorator="['name', { rules: [{ required: true, message: 'Please input product name!' }] }]"/>
      </a-form-item>

      <a-form-item label="Price">
        <a-input v-decorator="['price', { rules: [{ required: true, message: 'Please input product price!' }] }]"/>
      </a-form-item>

      <a-form-item label="Status">
        <a-input v-decorator="['status', { rules: [{ required: true, message: 'Please input product status!' }] }]"/>
      </a-form-item>
          <a-form-item label="Category">
            <a-select placeholder="Select category">
              <a-select-option v-for="cate in categories" :key="cate.id" :value="cate.id">
                {{cate.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
      <a-form-item label="Description">
        <a-input v-decorator="['description', { rules: [{ required: true, message: 'Please input product description!' }] }]"/>
      </a-form-item>

      <a-form-item label="Thumnail">
        <a-input v-decorator="['image', { rules: [{ required: true, message: 'Please input product link image!' }] }]"/>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
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
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  created() {
    this.getCategories();
  },
  methods: {

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          values.status = "Available";
          ProductService.create(values);
          console.log(values);
          this.$router.push({name:'productList'});
        }
      });
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