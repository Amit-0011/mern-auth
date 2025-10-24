// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import cookieParser from "cookie-parser";

// import connectDB from "./config/mongodb.js";
// import authRouter from './routes/authRoutes.js'
// import userRouter from "./routes/userRoutes.js";

// const app = express();
// const port = process.env.PORT || 4000;
// connectDB();

// const allowedOrigins = ['http://localhost:5173']

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({origin: allowedOrigins, credentials: true }));

// // API Endpoints
// app.get('/', (req, res)=> res.send("API Working"));
// app.use('/api/auth', authRouter)
// app.use('/api/user', userRouter)

// app.listen(port, () => console.log(`Server started on PORT:${port} `));




import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://mern-auth-sv2h.vercel.app'
];

// IMPORTANT: Apply middleware in correct order
app.use(express.json());
app.use(cookieParser());

// Updated CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests
app.options('*', cors());

// API Endpoints
app.get('/', (req, res)=> res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server started on PORT:${port}`));