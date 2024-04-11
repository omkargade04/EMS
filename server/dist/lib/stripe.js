"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe = __importDefault(require("stripe"));
require('dotenv').config;
export const stripe_1 = new stripe.default(process.env.STRIPE_API_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
});
