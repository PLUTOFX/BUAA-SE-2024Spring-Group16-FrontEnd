import http from './public'

// Login
export const userLogin = params => http.fetchPost(`/users/login?username=${params.username}&password=${params.password}&type=${params.userType}`, params);

// Register
export const userRegister = params => http.fetchPost(`/users/reg?username=${params.username}&password=${params.password}&type=${params.userType}`, params);

// Get all products in homepage
export const getAllGoods = params => http.fetchGet('/products/all', params);

// Search results of goods
export const searchGoods = params => http.fetchPost(`/products/search?keywords=${params.keywords}`, params);

// Search results of shops
export const searchShops = params => http.fetchPost(`/shop/search?keywords=${params.keywords}`, params);

// Get goods detail
export const getGoodsDetail = params => http.fetchPost(`/products/details?id=${params.id}`, params);

// Add to cart 
export const addToCart = params => http.fetchPost(`/cart/add_to_cart?username=${params.username}&pid=${params.pid}&version=${params.version}&quantity=${params.quantity}`, params);


// Buy immediately 
export const buyImmediately = params => http.fetchPost(`/order/submit?username=${params.username}&pid=${params.pid}&version=${params.version}&quantity=${params.quantity}&aid=${params.aid}`, params);

// Collect product
export const collectProduct = params => http.fetchPost(`/favorite/add?username=${params.username}&pid=${params.pid}`, params);


// Subscribe shop
export const subscribeShop = params => http.fetchPost(`/favorite_shop/add?username=${params.username}&sid=${params.sid}`, params);

// Cancel collecting product
export const cancelCollectingProduct = params => http.fetchPost(`/favorite/remove?username=${params.username}&pid=${params.pid}`, params);

// Cancel subscribing shop
export const cancelSubscribingShop = params => http.fetchPost(`favorite_shop/remove?username=${params.username}&sid=${params.sid}`, params);

// check if shop is subscribed 
export const checkShopSubscribed = params => http.fetchPost(`/favorite_shop/isFavorite?username=${params.username}&sid=${params.sid}`, params);


// check if product is collected 
export const checkProductCollected = params => http.fetchPost(`/favorite/isFavorite?username=${params.username}&pid=${params.pid}`, params);


// Get shop details
export const getShopDetail = params => http.fetchPost(`/shop/shop_info?sid=${params.sid}`, params);
// Get shop product list
export const getShopProducts = params => http.fetchPost(`/shop/get_products?sid=${params.sid}`, params);
// Get cart product list
export const getCartList =params => http.fetchPost('/cart/get_list',params);
// Get address list
export const getAddress = params => http.fetchPost(`/address/get_address?username=${params.username}`,params);
// add address
export const addAddress = params => http.fetchPost('/address/add_address',params);
// delay address
export const delayAddress =params => http.fetchPost('/address/delay_address',params);
//remove from cart
export const remove_cart = params => http.fetchPost('/cart/remove_cart',params);
//get inventory
export const getInventory = params => http.fetchPost('/cart/get_Inventory',params);
//checkout
export const afterbuy = params => http.fetchPost('/cart/checkout',params);

