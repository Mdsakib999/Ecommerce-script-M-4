import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressSession from "express-session";
import passport from "passport";
import { envVariables } from "./app/config/envConfig";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes/router";

const app = express();
console.log(envVariables.FRONTEND_URL)
// backend/app.js
const allowedOrigins = (envVariables.FRONTEND_URL || "")
  .split(",")
  .map((url) => url.trim())
  .filter((url) => url); // Remove empty strings if any
console.log('Allowed Origins:', allowedOrigins); // just to verify


app.use(
  expressSession({
    secret: envVariables.EXPRESS_SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: (origin, callback) => {
    // allow server-to-server requests (no origin, e.g., Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true); // ✅ allow this origin
    } else {
      callback(new Error(`CORS blocked: ${origin}`)); // ❌ block others
    }
  },
  credentials: true, // needed if you use cookies
}));



app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Unimart backend",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
