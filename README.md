# 🍽️ Feast Finder — Food Discovery & Ordering Platform

Feast Finder is a **Zomato-style food discovery and ordering platform** built using modern full-stack technologies and deployed with a **complete DevOps CI/CD pipeline**.

This project demonstrates how to build and deploy a **production-ready web application** using **React, Node.js, AWS EC2, Nginx, and GitHub Actions**.

---

# 🌐 Live Application

Frontend:

http://13.235.162.211

Backend API examples:

```
http://13.235.162.211/api/restaurants
http://13.235.162.211/api/menu/1
```

---

# 🏗️ Architecture

```
Developer
   ↓
GitHub Repository
   ↓
GitHub Actions CI/CD Pipeline
   ↓
AWS EC2 Server (Ubuntu)
   ↓
Nginx Reverse Proxy
   ↓
Node.js Backend API
   ↓
React Frontend
   ↓
Public Website
```

---

# 🧰 Technology Stack

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* ShadCN UI

## Backend

* Node.js
* Express.js
* REST APIs

## DevOps

* AWS EC2 (Ubuntu)
* Nginx Web Server
* GitHub Actions (CI/CD)
* SSH Key Based Deployment
* GitHub Secrets

---

# 📁 Project Structure

```
feast-finder/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── App.tsx
│
├── public/
│
├── dist/                  # Production build
│
├── server/
│   └── index.js           # Express API
│
├── .github/
│   └── workflows/
│       deploy.yml         # CI/CD pipeline
│
├── package.json
├── vite.config.ts
└── README.md
```

---

# 🚀 Current Features

### 🏪 Restaurant Discovery

Users can view available restaurants.

```
GET /api/restaurants
```

---

### 🍔 Restaurant Menu

Clicking a restaurant loads its menu.

```
GET /api/menu/:restaurantId
```

Example:

```
/api/menu/1
```

---

### 🛒 Cart System

Users can:

* Add items to cart
* Increase quantity
* Decrease quantity
* Remove items
* View total price

---

### 💳 Checkout API

Orders are placed through:

```
POST /api/order
```

Example request:

```json
{
  "cart": [...],
  "totalAmount": 398
}
```

Example response:

```json
{
  "message": "Order placed successfully"
}
```

---

### ⚙️ CI/CD Deployment

Every push to the **main branch** automatically deploys the site.

Pipeline flow:

```
GitHub Push
   ↓
GitHub Actions
   ↓
Build React Project
   ↓
Upload Build to EC2
   ↓
Replace Production Files
   ↓
Reload Nginx
   ↓
Live Website Updated
```

---

# 🔐 Security

* SSH key based deployment
* GitHub Secrets for credentials
* Nginx reverse proxy
* EC2 firewall rules

---

# 🖥️ Deployment

### Build frontend

```
npm run build
```

### Deploy to server

```
sudo rm -rf /var/www/feast-finder/*
sudo cp -r dist/* /var/www/feast-finder/
sudo systemctl reload nginx
```

---

# 📊 DevOps Skills Demonstrated

* Infrastructure setup on AWS EC2
* Nginx web server configuration
* Reverse proxy setup
* CI/CD automation using GitHub Actions
* Secure SSH deployment
* Production build deployment
* Backend API integration

---

# 📈 Future Improvements (Planned Features)

The following features will be implemented in future updates.

## Database Integration

Planned:

* MySQL database
* Restaurant table
* Menu table
* Orders table
* Order items table

---

## Authentication System

Planned features:

* User registration
* Login system
* JWT authentication
* User profiles

---

## Payment Integration

Future integration:

* Razorpay payment gateway
* Secure payment verification

---

## Map Integration

Restaurant discovery using maps.

Planned:

* MapTiler API
* Nearby restaurant detection
* Delivery tracking

---

## Real-Time Order Tracking

Future features:

* Live order status
* WebSocket updates

---

## Admin Dashboard

Admin panel for:

* Restaurant management
* Menu management
* Order monitoring

---

## Advanced DevOps

Future infrastructure improvements:

* Docker containerization
* Kubernetes orchestration
* Terraform infrastructure as code
* Prometheus monitoring
* Grafana dashboards

---

# 🎯 Project Goal

The goal of this project is to demonstrate **full-stack development and DevOps deployment skills** by building a scalable food ordering platform with an automated deployment pipeline.

---

# 👨‍💻 Author

Piyush Prasad

DevOps & Full Stack Developer

