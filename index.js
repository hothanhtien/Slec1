const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded());
app.use(express.json())

//khi gửi dữ liệu lên thì nó đi qua controler giữa controler vs trình duyệt có th middelware , đứng ở 
// giữa tích hợp sẵn middleque xử lý query paramater nhưng chưa tích hợp sẵn body


const users = [
  {
    id: 1,
    name: "Trần Viết Hỏa",
    Age: 18
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    Age: 18
  },
  {
    id: 3,
    name: "Nguyễn Văn B",
    Age: 18
  },
  {
    id: 4,
    name: "Nguyễn Văn C",
    Age: 11
  }
]
  // users.sort((a, b) => b.id - a.id);



const logToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (token) {
      console.log('Authorization bearer token',  token)
  }
  else {
      console.log('ko co token')
  }
  next();
}

app.get('/users', logToken
  ,(req, res) => {
    console.log('1. Get tất cả dữ liệu trong mảng')
    console.log(users)
    res.send('users')
})

app.get('/users/:id', (req, res) => {
  console.log('2. Get từng user cụ thể khi truyền params')
  console.log('ID muốn lấy ra thông qua params nè' ,req.params.id)
  const a = users.filter(user => user.id === parseFloat(req.params.id))
  console.log('Người dùng có id la: ', req.params.id, 'la:');
  console.log(a);
  res.send(a)
})

app.post('/create', (req, res) => {
  console.log('3. Tạo người dùng mới')
  console.log('Các trường và value muốn tạo: ', req.body)

  const newUser = {
    id: parseInt(req.body.id),
    name: req.body.name,
    Age: parseInt(req.body.Age)
  }

  users.push(newUser)
  console.log('Danh sach sau khi tao la: ')
  console.log(users)
  res.send('Hello World!')
})

app.put('/update', (req, res) => {
  console.log('4. Update dữ liệu')
  console.log('Id name Age bạn muốn update ', req.body)
  const userUpdate = users.find(user => user.id === parseInt(req.body.id))
  userUpdate.name = req.body.name;
  userUpdate.Age = parseInt(req.body.Age);
  console.log('Sau khi update')
  console.log(users)
  res.send('update')
})

app.delete('/delete', (req, res) => { 
  console.log('5. Xóa dữ liệu qua id')
  console.log('Id người nhập muốn xóa' ,req.body)
  const userDelete = users.filter(user => user.id !== parseInt(req.body.id));
  console.log('Sau khi xóa id', req.body.id, 'la',userDelete);
  res.send('delete')
})

app.listen(port, () => { 
  console.log(`Example app listening on port ${port}`)
})