"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const envConfig_1 = require("./app/config/envConfig");
require("./app/config/passport");
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const router_1 = require("./app/routes/router");
const app = (0, express_1.default)();
// console.log(envConfig_1.envVariables.FRONTEND_URL);
// backend/app.js
const allowedOrigins = (envConfig_1.envVariables.FRONTEND_URL || "")
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url); // Remove empty strings if any
// console.log('Allowed Origins:', allowedOrigins); // just to verify
app.use((0, express_session_1.default)({
    secret: envConfig_1.envVariables.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // allow server-to-server requests (no origin, e.g., Postman)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true); // ✅ allow this origin
        }
        else {
            callback(new Error(`CORS blocked: ${origin}`)); // ❌ block others
        }
    },
    credentials: true, // needed if you use cookies
}));
app.use("/api/v1", router_1.router);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Unimart backend",
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map