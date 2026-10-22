const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
//托管静态前端页面
app.use(express.static('./public'))

//模拟商品数据
const productList = [
  {id:1,name:"Fashion Bag",price:39.99,cate:"bag"},
  {id:2,name:"Classic Watch",price:59.99,cate:"watch"},
  {id:3,name:"Sunglasses",price:19.99,cate:"glass"},
  {id:4,name:"Vintage Jewelry",price:29.99,cate:"jewelry"}
]

//获取商品接口
app.get("/api/products",(req,res)=>{
  const cate = req.query.cate
  if(cate && cate!=='all'){
    const filter = productList.filter(p=>p.cate === cate)
    return res.json(filter)
  }
  res.json(productList)
})

//订单提交接口（内存临时存储，重启丢失）
let orderList = []
app.post("/api/order",(req,res)=>{
  const payload = req.body
  const newOrder = { id:Date.now(), ...payload }
  orderList.push(newOrder)
  res.json({code:0,msg:"订单创建成功",order:newOrder})
})

app.listen(port,()=>{
  console.log(`服务启动成功，访问地址：http://localhost:${port}`)
})