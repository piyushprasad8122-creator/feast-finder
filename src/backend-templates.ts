// ============================================
// BACKEND TEMPLATE - Express + Prisma + MySQL
// ============================================
// This file is a REFERENCE TEMPLATE. It won't run in Lovable.
// Copy the /backend folder to your own server project.

// ============ FILE: backend/package.json ============
/*
{
  "name": "zomato-backend",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "node prisma/seed.js"
  },
  "dependencies": {
    "@prisma/client": "^5.10.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.0",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "razorpay": "^2.9.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.3",
    "prisma": "^5.10.0"
  }
}
*/

// ============ FILE: backend/.env.example ============
/*
DATABASE_URL="mysql://user:password@localhost:3306/zomato_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
RAZORPAY_KEY_ID="rzp_test_xxxxx"
RAZORPAY_KEY_SECRET="your-razorpay-secret"
MAPTILER_API_KEY="your-maptiler-key"
FRONTEND_URL="http://localhost:5173"
*/

// ============ FILE: backend/prisma/schema.prisma ============
/*
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  CUSTOMER
  ADMIN
  DELIVERY
}

enum OrderStatus {
  PLACED
  PREPARING
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
}

enum PaymentMethod {
  ONLINE
  COD
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  password      String
  phone         String?
  avatar        String?
  role          Role      @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  addresses     Address[]
  orders        Order[]       @relation("CustomerOrders")
  deliveries    Order[]       @relation("DeliveryOrders")
  reviews       Review[]
  favorites     Favorite[]
  notifications Notification[]
}

model Address {
  id        String  @id @default(uuid())
  userId    String
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  label     String  // Home, Work, Other
  address   String
  lat       Float?
  lng       Float?
  isDefault Boolean @default(false)
}

model Restaurant {
  id          String    @id @default(uuid())
  name        String
  image       String?
  cuisine     String    // JSON array stored as string
  rating      Float     @default(0)
  reviewCount Int       @default(0)
  deliveryTime String?
  deliveryFee Float     @default(0)
  priceRange  String?
  address     String
  lat         Float?
  lng         Float?
  isVeg       Boolean   @default(false)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())

  menuItems   MenuItem[]
  orders      Order[]
  reviews     Review[]
  favorites   Favorite[]
  coupons     Coupon[]
}

model MenuItem {
  id            String    @id @default(uuid())
  restaurantId  String
  restaurant    Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
  name          String
  description   String?
  price         Float
  image         String?
  category      String
  isVeg         Boolean   @default(false)
  isBestseller  Boolean   @default(false)
  isAvailable   Boolean   @default(true)
  rating        Float     @default(0)
  createdAt     DateTime  @default(now())

  orderItems    OrderItem[]
}

model Order {
  id              String        @id @default(uuid())
  customerId      String
  customer        User          @relation("CustomerOrders", fields: [customerId], references: [id])
  restaurantId    String
  restaurant      Restaurant    @relation(fields: [restaurantId], references: [id])
  deliveryPartnerId String?
  deliveryPartner User?         @relation("DeliveryOrders", fields: [deliveryPartnerId], references: [id])
  status          OrderStatus   @default(PLACED)
  total           Float
  deliveryFee     Float         @default(0)
  discount        Float         @default(0)
  address         String
  lat             Float?
  lng             Float?
  paymentMethod   PaymentMethod @default(ONLINE)
  paymentStatus   PaymentStatus @default(PENDING)
  razorpayOrderId String?
  razorpayPaymentId String?
  couponCode      String?
  deliveryEta     String?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt

  items           OrderItem[]
}

model OrderItem {
  id         String   @id @default(uuid())
  orderId    String
  order      Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  menuItemId String
  menuItem   MenuItem @relation(fields: [menuItemId], references: [id])
  quantity   Int
  price      Float
}

model Review {
  id           String     @id @default(uuid())
  userId       String
  user         User       @relation(fields: [userId], references: [id])
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id])
  rating       Float
  comment      String?
  createdAt    DateTime   @default(now())
}

model Favorite {
  id           String     @id @default(uuid())
  userId       String
  user         User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  restaurantId String
  restaurant   Restaurant @relation(fields: [restaurantId], references: [id], onDelete: Cascade)
  
  @@unique([userId, restaurantId])
}

model Coupon {
  id           String     @id @default(uuid())
  code         String     @unique
  discount     Float
  maxDiscount  Float
  minOrder     Float
  description  String?
  isActive     Boolean    @default(true)
  restaurantId String?
  restaurant   Restaurant? @relation(fields: [restaurantId], references: [id])
  expiresAt    DateTime?
  createdAt    DateTime   @default(now())
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}
*/

// ============ FILE: backend/src/server.js ============
/*
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');
const couponRoutes = require('./routes/coupons');
const deliveryRoutes = require('./routes/delivery');
const adminRoutes = require('./routes/admin');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/

// ============ FILE: backend/src/middleware/auth.js ============
/*
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Authentication required' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) return res.status(401).json({ error: 'User not found' });
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  next();
};

module.exports = { authenticate, authorize };
*/

// ============ FILE: backend/src/middleware/errorHandler.js ============
/*
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { errorHandler };
*/

// ============ FILE: backend/src/middleware/validate.js ============
/*
const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validate };
*/

// ============ FILE: backend/src/routes/auth.js ============
/*
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { validate } = require('../middleware/validate');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/signup', [
  body('name').trim().notEmpty(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['CUSTOMER', 'ADMIN', 'DELIVERY']),
], validate, async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
      select: { id: true, name: true, email: true, role: true }
    });
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.status(201).json({ user, token });
  } catch (error) { next(error); }
});

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
], validate, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) { next(error); }
});

module.exports = router;
*/

// ============ FILE: backend/src/routes/orders.js ============
/*
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Create order
router.post('/', authenticate, authorize('CUSTOMER'), async (req, res, next) => {
  try {
    const { restaurantId, items, address, lat, lng, paymentMethod, couponCode } = req.body;
    
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
      if (coupon && coupon.isActive) discount = Math.min(coupon.discount, coupon.maxDiscount);
    }
    
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee = total > 499 ? 0 : 30;
    
    const order = await prisma.order.create({
      data: {
        customerId: req.user.id,
        restaurantId,
        total: total + deliveryFee - discount,
        deliveryFee,
        discount,
        address,
        lat,
        lng,
        paymentMethod,
        couponCode,
        items: { create: items.map(i => ({ menuItemId: i.menuItemId, quantity: i.quantity, price: i.price })) }
      },
      include: { items: { include: { menuItem: true } } }
    });
    
    res.status(201).json(order);
  } catch (error) { next(error); }
});

// Get user orders
router.get('/my', authenticate, async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.user.id },
      include: { restaurant: true, items: { include: { menuItem: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) { next(error); }
});

// Update order status (admin/delivery)
router.patch('/:id/status', authenticate, authorize('ADMIN', 'DELIVERY'), async (req, res, next) => {
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json(order);
  } catch (error) { next(error); }
});

module.exports = router;
*/

// ============ FILE: backend/src/routes/payments.js ============
/*
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { authenticate } = require('../middleware/auth');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
router.post('/create', authenticate, async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.total * 100),
      currency: 'INR',
      receipt: orderId,
    });
    
    await prisma.order.update({
      where: { id: orderId },
      data: { razorpayOrderId: razorpayOrder.id }
    });
    
    res.json({ orderId: razorpayOrder.id, amount: razorpayOrder.amount, currency: razorpayOrder.currency });
  } catch (error) { next(error); }
});

// Verify payment
router.post('/verify', authenticate, async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body).digest('hex');
    
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }
    
    await prisma.order.updateMany({
      where: { razorpayOrderId: razorpay_order_id },
      data: { paymentStatus: 'COMPLETED', razorpayPaymentId: razorpay_payment_id }
    });
    
    res.json({ success: true });
  } catch (error) { next(error); }
});

module.exports = router;
*/

// ============ FILE: backend/src/routes/restaurants.js ============
/*
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all restaurants
router.get('/', async (req, res, next) => {
  try {
    const { cuisine, veg, search, sort } = req.query;
    const where = { isActive: true };
    if (veg === 'true') where.isVeg = true;
    if (search) where.name = { contains: search };
    
    const orderBy = sort === 'rating' ? { rating: 'desc' } 
      : sort === 'cost' ? { deliveryFee: 'asc' } 
      : { rating: 'desc' };

    const restaurants = await prisma.restaurant.findMany({ where, orderBy });
    res.json(restaurants.map(r => ({ ...r, cuisine: JSON.parse(r.cuisine) })));
  } catch (error) { next(error); }
});

// Get restaurant by ID with menu
router.get('/:id', async (req, res, next) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: req.params.id },
      include: { menuItems: { where: { isAvailable: true } }, reviews: { include: { user: { select: { name: true } } } } }
    });
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
    res.json({ ...restaurant, cuisine: JSON.parse(restaurant.cuisine) });
  } catch (error) { next(error); }
});

// Admin: create restaurant
router.post('/', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const restaurant = await prisma.restaurant.create({
      data: { ...req.body, cuisine: JSON.stringify(req.body.cuisine) }
    });
    res.status(201).json(restaurant);
  } catch (error) { next(error); }
});

// Admin: update restaurant
router.put('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (data.cuisine) data.cuisine = JSON.stringify(data.cuisine);
    const restaurant = await prisma.restaurant.update({ where: { id: req.params.id }, data });
    res.json(restaurant);
  } catch (error) { next(error); }
});

// Admin: delete restaurant
router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    await prisma.restaurant.update({ where: { id: req.params.id }, data: { isActive: false } });
    res.json({ message: 'Restaurant deactivated' });
  } catch (error) { next(error); }
});

module.exports = router;
*/

// ============ FILE: backend/src/routes/favorites.js ============
/*
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get user favorites
router.get('/', authenticate, async (req, res, next) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: req.user.id },
      include: { restaurant: true }
    });
    res.json(favorites.map(f => ({ ...f.restaurant, cuisine: JSON.parse(f.restaurant.cuisine) })));
  } catch (error) { next(error); }
});

// Toggle favorite
router.post('/:restaurantId', authenticate, async (req, res, next) => {
  try {
    const existing = await prisma.favorite.findUnique({
      where: { userId_restaurantId: { userId: req.user.id, restaurantId: req.params.restaurantId } }
    });
    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      res.json({ favorited: false });
    } else {
      await prisma.favorite.create({ data: { userId: req.user.id, restaurantId: req.params.restaurantId } });
      res.json({ favorited: true });
    }
  } catch (error) { next(error); }
});

module.exports = router;
*/

// ============ FILE: backend/src/routes/notifications.js ============
/*
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get notifications
router.get('/', authenticate, async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(notifications);
  } catch (error) { next(error); }
});

// Mark all as read
router.patch('/read-all', authenticate, async (req, res, next) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user.id, isRead: false },
      data: { isRead: true }
    });
    res.json({ success: true });
  } catch (error) { next(error); }
});

module.exports = router;
*/

// ============ FILE: backend/src/routes/admin.js ============
/*
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Dashboard stats
router.get('/stats', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    
    const [totalOrders, ordersToday, totalRevenue, revenueToday, activeUsers, activeRestaurants, deliveryPartners] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: today } } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.aggregate({ where: { createdAt: { gte: today } }, _sum: { total: true } }),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.restaurant.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: 'DELIVERY' } }),
    ]);

    res.json({
      totalOrders,
      ordersToday,
      totalRevenue: totalRevenue._sum.total || 0,
      revenueToday: revenueToday._sum.total || 0,
      activeUsers,
      activeRestaurants,
      deliveryPartners,
    });
  } catch (error) { next(error); }
});

// Revenue chart data (last 7 days)
router.get('/revenue-chart', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const days = 7;
    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(); date.setDate(date.getDate() - i);
      const start = new Date(date); start.setHours(0, 0, 0, 0);
      const end = new Date(date); end.setHours(23, 59, 59, 999);
      
      const [revenue, orders] = await Promise.all([
        prisma.order.aggregate({ where: { createdAt: { gte: start, lte: end } }, _sum: { total: true } }),
        prisma.order.count({ where: { createdAt: { gte: start, lte: end } } }),
      ]);
      
      data.push({ day: date.toLocaleDateString('en', { weekday: 'short' }), revenue: revenue._sum.total || 0, orders });
    }
    res.json(data);
  } catch (error) { next(error); }
});

// Manage users
router.get('/users', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) { next(error); }
});

// Manage all orders
router.get('/orders', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      include: { customer: { select: { name: true } }, restaurant: { select: { name: true } }, items: { include: { menuItem: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) { next(error); }
});

module.exports = router;
*/

// ============ FILE: backend/src/routes/delivery.js ============
/*
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get assigned orders
router.get('/orders', authenticate, authorize('DELIVERY'), async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { deliveryPartnerId: req.user.id, status: { in: ['PLACED', 'PREPARING', 'OUT_FOR_DELIVERY'] } },
      include: { restaurant: true, customer: { select: { name: true, phone: true } }, items: { include: { menuItem: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) { next(error); }
});

// Update delivery status
router.patch('/orders/:id/status', authenticate, authorize('DELIVERY'), async (req, res, next) => {
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json(order);
  } catch (error) { next(error); }
});

// Delivery history & earnings
router.get('/history', authenticate, authorize('DELIVERY'), async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { deliveryPartnerId: req.user.id, status: 'DELIVERED' },
      include: { restaurant: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    const totalEarnings = orders.length * 40; // ₹40 per delivery
    res.json({ orders, totalEarnings, totalDeliveries: orders.length });
  } catch (error) { next(error); }
});

module.exports = router;
*/

// ============ FILE: backend/prisma/seed.js ============
/*
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@feastfinder.com' },
    update: {},
    create: { name: 'Admin', email: 'admin@feastfinder.com', password: adminPassword, role: 'ADMIN' }
  });

  // Seed restaurants
  const restaurants = [
    { name: 'Paradise Biryani', cuisine: '["Biryani","North Indian"]', rating: 4.5, reviewCount: 2340, deliveryTime: '30-35 min', deliveryFee: 30, priceRange: '₹₹', address: 'Banjara Hills, Hyderabad', isVeg: false },
    { name: 'Italiano Kitchen', cuisine: '["Italian","Pizza"]', rating: 4.3, reviewCount: 1890, deliveryTime: '25-30 min', deliveryFee: 40, priceRange: '₹₹₹', address: 'Jubilee Hills, Hyderabad', isVeg: false },
    { name: 'Green Leaf Veg', cuisine: '["South Indian","Healthy"]', rating: 4.6, reviewCount: 980, deliveryTime: '20-25 min', deliveryFee: 20, priceRange: '₹', address: 'Madhapur, Hyderabad', isVeg: true },
    { name: 'Burger Junction', cuisine: '["Burgers","Street Food"]', rating: 4.4, reviewCount: 3200, deliveryTime: '15-20 min', deliveryFee: 25, priceRange: '₹', address: 'Kukatpally, Hyderabad', isVeg: false },
  ];

  for (const r of restaurants) {
    await prisma.restaurant.create({ data: r });
  }

  // Seed coupons
  await prisma.coupon.createMany({
    data: [
      { code: 'WELCOME50', discount: 50, maxDiscount: 100, minOrder: 199, description: '50% off on your first order' },
      { code: 'FREEDEL', discount: 50, maxDiscount: 50, minOrder: 149, description: 'Free delivery on orders above ₹149' },
      { code: 'FEAST200', discount: 200, maxDiscount: 200, minOrder: 599, description: 'Flat ₹200 off on orders above ₹599' },
    ]
  });

  console.log('Database seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
*/

// ============ DEPLOYMENT FILES ============

// FILE: ecosystem.config.js (PM2)
/*
module.exports = {
  apps: [{
    name: 'feast-finder-api',
    script: 'src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: { NODE_ENV: 'development' },
    env_production: { NODE_ENV: 'production' }
  }]
};
*/

// FILE: nginx.conf
/*
server {
    listen 80;
    server_name 13.235.162.211;

    # Frontend
    location / {
        root /var/www/feast-finder/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
*/

// FILE: .github/workflows/deploy.yml
/*
name: Deploy Feast Finder to EC2

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install & Build Frontend
        run: |
          npm ci
          npm run build

      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USER }}
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /var/www/feast-finder
            git pull origin main
            
            # Backend
            cd backend
            npm ci --production
            npx prisma migrate deploy
            pm2 restart ecosystem.config.js --env production
            
            # Frontend
            cd ../
            npm ci
            npm run build
            sudo cp -r dist/* /var/www/feast-finder/frontend/dist/
            sudo systemctl reload nginx
*/

export {};
