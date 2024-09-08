//express-rate-limit
import rateLimit from "express-rate-limit";
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 999999,
    message: "Too many accounts created from this IP, please try again after an hour"
});

export {limiter};