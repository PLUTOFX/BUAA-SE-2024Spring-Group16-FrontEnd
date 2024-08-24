<template>
  <div class="form-container" >
    <el-form :model="goods" label-width="100px">
      <el-form-item label="商品名称">
        <el-input v-model="goods.name"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload action="your-upload-url" list-type="picture">
          <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="goods.price" placeholder="请输入单价"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="goods.description"></el-input>
      </el-form-item>
      <el-form-item label="库存量">
        <el-input-number v-model="goods.storage" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item class="form-actions">
        <el-button type="primary" @click="saveGoods">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
  export default {
  data() {
    return {
      goods: {
        productId: 1, 
        name: '测试商品名称',
        storage: 20,
        version: ['S', 'M', 'L', 'XL', 'XXL', 'custom'],
        price: 100.01,
        imageSrc: ['https://sc01.alicdn.com/kf/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3/200006212/HTB1Cic9HFXXXXbZXpXXq6xXFXXX3.jpg', '', ''],
        details: 'This is a test product.',
        shopName: 'Bemani Sound Team',
        shopId: 1,
      },
    };
  },
  methods: {
    updateGoods() {
      
    },
  },
  mounted() {
    this.id = this.$route.params.id;

  },
};
  </script>
  
<style scoped>
h4 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
.form-container {
  max-width: 600px; 
  margin: 0 auto; 
  padding: 20px; 
  background-color: #fff; 
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); 
  border-radius: 8px; 
  margin-top: 100px;
}

.el-form-item {
  margin-bottom: 20px; 
}

.form-actions {
  text-align: center; 
}

.el-input,
.el-upload,
.el-input-number {
  width: 100%; 
}

.el-button {
  width: 100%; 
}

</style>