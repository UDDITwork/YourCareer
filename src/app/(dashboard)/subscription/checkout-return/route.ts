// src/app/checkout-return/route.ts

import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import Stripe from "stripe";

// Lazy initialize stripe
let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in your environment variables.');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const stripeSessionId = searchParams.get("session_id");


  if (!stripeSessionId?.length)
    return redirect("/home");

  const session = await getStripe().checkout.sessions.retrieve(stripeSessionId);

  if (session.status === "complete") {
    return redirect(`/subscription/checkout/success?session_id=${stripeSessionId}`);
  }

  if (session.status === "open") {
    return redirect(
      `/subscription/checkout?price_id=${session.metadata?.price_id}`,
    );
  }

  return redirect("/home");
};
