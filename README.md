# 🎨 Design Service – Canvas Backend (Microservice)

## 📌 Tổng quan

**Design Service** là một **microservice cốt lõi** trong hệ sinh thái **Canvas**, chịu trách nhiệm quản lý toàn bộ **bản thiết kế (design)** của người dùng. Service này xử lý các nghiệp vụ liên quan đến việc **tạo – chỉnh sửa – lưu trữ – xoá** các bản thiết kế canvas, đồng thời đảm bảo dữ liệu được tổ chức, phân quyền và mở rộng hiệu quả.

Design Service được xây dựng theo triết lý **Single Responsibility** trong kiến trúc Microservice, giúp hệ thống Canvas dễ dàng mở rộng, bảo trì và phát triển lâu dài.

🔗 Repository: [https://github.com/nam-Space/design-service-canvas-be](https://github.com/nam-Space/design-service-canvas-be)

---

## 🎯 Mục tiêu của service

* Quản lý vòng đời của **Design** một cách độc lập
* Lưu trữ dữ liệu thiết kế an toàn, nhất quán
* Phân quyền rõ ràng theo người dùng
* Dễ dàng tích hợp với Frontend thông qua **API Gateway**
* Phù hợp mở rộng thêm các tính năng nâng cao (versioning, collaboration)

---

## 🧩 Vai trò trong kiến trúc Microservice

```
Frontend (Canvas FE)
        │
        ▼
API Gateway Service
        │
        ▼
Design Service  ──► Database
```

* Frontend **không gọi trực tiếp** Design Service
* Mọi request đều đi qua **API Gateway**
* Gateway đảm nhiệm routing, auth và logging

---

## 🚀 Công nghệ sử dụng

### Backend Core

* **Node.js** – Runtime
* **Express.js** – RESTful API
* **JavaScript / TypeScript** (tuỳ cấu hình repo)

### Database

* **MongoDB** – Lưu trữ dữ liệu design
* **Mongoose** – ODM cho MongoDB

### Khác

* **dotenv** – Quản lý biến môi trường
* **UUID / ObjectId** – Định danh design
* **Middleware** – Auth, validation, error handling

---

## 📂 Cấu trúc thư mục

```bash
design-service-canvas-be/
├── src/
│   ├── controllers/          # Xử lý request/response
│   ├── routes/               # Định nghĩa API endpoints
│   ├── services/             # Business logic liên quan design
│   ├── models/               # Schema MongoDB (Design)
│   ├── middlewares/          # Auth, validate, error handling
│   ├── utils/                # Helper functions
│   ├── config/               # Database config
│   └── app.js / server.js
│
├── .env
├── package.json
└── README.md
```

---

## 📝 Đối tượng dữ liệu chính – Design

### Thuộc tính cơ bản (ví dụ)

* `id`: Định danh design
* `title`: Tên bản thiết kế
* `userId`: Chủ sở hữu
* `canvasData`: Dữ liệu canvas (JSON)
* `thumbnail`: Ảnh preview
* `createdAt`: Ngày tạo
* `updatedAt`: Ngày cập nhật

Design được lưu dưới dạng **JSON linh hoạt**, phù hợp cho việc render lại canvas ở frontend.

---

## 🖼️ Các chức năng chính

### 1️⃣ Tạo bản thiết kế mới

* Khởi tạo design trống hoặc từ template
* Gắn design với user hiện tại

```http
POST /designs
```

---

### 2️⃣ Lấy danh sách design của người dùng

* Phân trang
* Chỉ trả về design thuộc user

```http
GET /designs
```

---

### 3️⃣ Lấy chi tiết một design

* Dùng khi mở editor
* Load toàn bộ canvasData

```http
GET /designs/:id
```

---

### 4️⃣ Cập nhật design

* Lưu trạng thái canvas
* Auto-save / manual save

```http
PUT /designs/:id
```

---

### 5️⃣ Xoá design

* Chỉ chủ sở hữu được phép xoá

```http
DELETE /designs/:id
```

---

## 🔐 Authentication & Authorization

* Request phải đi qua **API Gateway**
* Gateway inject `userId` vào request
* Design Service kiểm tra:

  * Quyền sở hữu design
  * Quyền truy cập tài nguyên

---

## 🔄 Luồng xử lý lưu design

```
User → Frontend → API Gateway → Design Service → Database
```

* Frontend gửi canvasData
* Service validate dữ liệu
* Lưu vào MongoDB
* Trả về trạng thái thành công

---

## ⚙️ Cấu hình môi trường (.env)

```env
PORT=4002

# Database
MONGODB_URI=mongodb://localhost:27017/canvas_design
```

---

## ▶️ Cài đặt & Chạy service

### 1️⃣ Clone repository

```bash
git clone https://github.com/nam-Space/design-service-canvas-be.git
cd design-service-canvas-be
```

---

### 2️⃣ Cài đặt dependencies

```bash
npm install
```

---

### 3️⃣ Chạy development

```bash
npm run dev
```

Service chạy tại:

```
http://localhost:4002
```

---

## 🧪 Test API

* Postman / Thunder Client
* Test CRUD design
* Test phân quyền user

---

## 🔒 Bảo mật & Best Practices

* Validate input
* Không cho truy cập chéo design
* Logging lỗi
* Backup dữ liệu định kỳ

---

## 🚀 Hướng phát triển trong tương lai

* Version history cho design
* Autosave realtime
* Realtime collaboration
* Template system
* Export design (PNG, PDF)

---

## 👨‍💻 Tác giả

* **Nam Nguyen**
* GitHub: [https://github.com/nam-Space](https://github.com/nam-Space)

---

## 📄 License

Service được xây dựng cho mục đích **học tập, nghiên cứu kiến trúc microservice và quản lý dữ liệu thiết kế trong hệ thống Canvas**.
