import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import axios from "axios";
import { baseURL } from "../api";
import { useAuth } from "@/app/context/Auth";
import { toast } from "sonner";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const studentId = session?.metadata?.studentId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!studentId || !courseId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {authState} = useAuth();
    const token = authState.token;
    const purchase = async() => {
        try{
            const response = await axios.post(`${baseURL}/v1/student/purchase-course`, {studentId, courseId}, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("I need this response: ",response);

            toast.success(response.data.message);
        }catch(err: any){
            console.log("Error: ", err);
        }
    }
    await purchase();
  }
  return new NextResponse(null, {status: 200});
}
