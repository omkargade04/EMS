import Stripe from "stripe";
require('dotenv').config

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2023-10-16",
    typescript: true,
});