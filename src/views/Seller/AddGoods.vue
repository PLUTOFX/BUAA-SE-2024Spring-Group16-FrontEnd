<template>
  <div class="form-container">
    <el-form :model="good" label-width="100px">
      <el-form-item label="商品名称">
        <el-input v-model="good.name"></el-input>
      </el-form-item>
      <el-form-item label="商品版本">
        <el-input v-for="i in 3" :key="i" v-model="good.version[i]" placeholder="请输入版本"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-input v-model="good.imageSrc[0]"></el-input>
        <!-- <el-upload action="your-upload-url" list-type="picture"> -->
        <!-- <el-button slot="trigger" size="small" type="primary">选择图片</el-button> -->
        <!-- </el-upload> -->
      </el-form-item>
      <el-form-item label="单价">
        <el-input-number v-model="good.price" :min="0"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="单价">
        <el-input v-model="good.price" placeholder="请输入单价"></el-input>
      </el-form-item> -->
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="good.details"></el-input>
      </el-form-item>
      <el-form-item label="库存量">
        <el-input-number v-model="good.storage" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item class="form-actions">
        <el-button type="primary" @click="uploadGoods">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { uploadProductUrl, getShopId } from '../../api/apis.js'
import { ElMessage } from 'element-plus';
export default {
  data() {
    return {
      axios,
      ElMessage,
      uploadProductUrl,
      good: {
        name: '',
        storage: 0,
        version: ['', '', ''],
        price: 0,
        imageSrc: [''],
        details: '',
        shopName: localStorage.getItem('loginUserName'),
        shopId: -1,
      },
    };
  },
  methods: {
    getShopId,
    uploadGoods() {
      axios.post(this.uploadProductUrl, this.good, {
        headers: {
          'Content-type': 'application/json'
        }
      }).then(response => {
        const res = response.data;
        if (res.stateCode == '200') {
          ElMessage.success('上传成功');
          this.$router.push('/Seller/GoodsList')
        } else {
          if (res.stateMsg) {
            ElMessage.error(res.stateMsg);
          } else {
            ElMessage.error('未知错误, Status: ' + res.stateCode);
          }
        }
      });
    },
    getShopIdRequest() {
      getShopId({username: this.good.shopName}).then(res => {
        if (res.stateCode == '200') {
          console.log(res.data);
          this.good.shopId = res.data;
          console.log('sid: ' +  this.good.shopId);
        }
      });
    }
  },
  mounted() {
    console.log('username: ' + this.good.shopName);
    this.getShopIdRequest();
  },
};
</script>

<style scoped>
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