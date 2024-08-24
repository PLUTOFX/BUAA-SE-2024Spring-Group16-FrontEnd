<template>
  <footer>
    <div class="container pt-5">
      <div style="display: flex; flex-wrap: wrap;">
        <div class="col-md-3 col-6">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold pb-2">了解我们</li>
            <li><a class="footer-link font-weight-light" href="#">关于我们</a></li>
            <li><a class="footer-link font-weight-light" href="#">关于我们</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">关于我们</a><br></li>
          </ul>
        </div>

        <div class="col-md-3 col-6">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold">联系我们</li>
            <li><a class="footer-link font-weight-light" href="#">邮箱</a></li>
            <li><a class="footer-link font-weight-light" href="#">微博</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">哔哩哔哩</a><br></li>
          </ul>
        </div>

        <div class="col-md-3 col-6">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold">与我们合作</li>
            <li><a class="footer-link font-weight-light" href="#">成为商家</a></li>
            <li><a class="footer-link font-weight-light" href="#">加入我们</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">广告推广</a><br></li>
          </ul>
        </div>

        <div class="col-md-3 col-6">
          <ul style="list-style-type: none">
            <li class="text-light font-weight-bold">帮助</li>
            <li><a class="footer-link font-weight-light" href="#">返回顶部</a></li>
            <li><a class="footer-link font-weight-light" href="#">返回顶部</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">返回顶部</a><br></li>
            <li><a class="footer-link font-weight-light" href="#">返回顶部</a><br></li>
          </ul>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          
        </div>
      </div>
        <div class="footer-image-container">
            <img id="logo" src="../../assets/Taoduoduo.png" class="footer-image"/>
        </div>
    </div>
  </footer>
</template>

<script>
export default {
  name : "Footer"
}
</script>

<style>
footer {
  margin-top : 100px;
  background-color:#232F3E;
  font-size:16px;
}

li {
  padding-left: 0;
  padding-bottom: 10px;
}

a {
  text-decoration: none;
}

.footer-link {
  color: #DDD;
}

#logo {
  width: 150px;
}

footer {
  font-family: 'Roboto', sans-serif;
}

.row {
  display: flex;
  justify-content: space-between; 
  padding: 0 2rem; 
}

.col-md-3 {
  flex: 1; 
  max-width: 23%; 
  margin: 0 0.5rem; 
}

.footer-image-container {
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding-top: 1rem; 
}

.footer-image {
  max-width: 100%; 
  height: auto;
  margin-bottom: 50px;
}

</style>
