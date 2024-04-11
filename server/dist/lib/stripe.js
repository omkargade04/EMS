"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = require("stripe");
require('dotenv').config;
exports.stripe = void 0;
exports.stripe = new stripe_1.default(process.env.STRIPE_API_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
});
