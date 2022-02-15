<template>
  <div>
    <a-card>
      <a-table :columns="columns" :pagination="false" rowKey="id" :data-source="cartItems">
        <span slot="image" slot-scope="text">
             <img :src="text" style="width: 100%">
         </span>
        <div slot="action" slot-scope="text,data">
          <a class="button" @click="showDeleteConfirm(data.id)"><a-icon type="delete" /></a>
        </div>
      </a-table>
      <div>
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
          <a-form-item label="Total Price">
            <a-input disabled  v-model="cartData.totalPrice"/>
          </a-form-item>
          <a-form-item label="Ship name">
            <a-input/>
          </a-form-item>
          <a-form-item label="Ship Address">
            <a-input/>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">
              Submit Cart
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>
<script>

import CartService from "@/service/CartService";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Product Name',
    dataIndex: 'productname',
    key: 'productname',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    ellipsis: true,
    scopedSlots: {customRender: 'image'}
  },
  {
    title: 'Unit price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
  },
  {
    title: 'Amount',
    dataIndex: 'quantity',
    key: 'quantity',
    ellipsis: true,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    ellipsis: true,
    scopedSlots: {customRender: 'action'},
  }

];

export default {
  data() {
    return {
      cartData: undefined,
      cartItems: [],
      columns,
      params:{

      }
    };
  },
  created() {
    this.getCart()
  },
  methods: {
    getCart(){
      CartService.getAll().then(
          rs =>{
            console.log("dataaa", rs.data.setItem);
            this.cartData = rs.data
            this.cartItems = rs.data.setItem;
          }
      )
    }

  }
};
</script>
<style scoped>
.product__search-form{
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
}
</style>