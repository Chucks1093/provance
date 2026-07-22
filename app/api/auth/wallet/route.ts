import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
import { createClient } from "@/utils/supabase/server";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
   const body = await req.json() as {
      address: string;
      signature: string;
      message: string;
      name?: string;
   };

   const { address, signature, message, name } = body;

   if (!address || !signature || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
   }

   // Verify signature
   const valid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
   });

   if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
   }

   const supabase = await createClient();

   // Find or create profile
   const { data: existing } = await supabase
      .from("profiles")
      .select("*")
      .eq("wallet_address", address.toLowerCase())
      .single();

   if (existing) {
      const token = await createSessionToken({
         id: existing.id,
         name: existing.name,
         email: existing.email,
         avatar_url: existing.avatar_url,
         provider: existing.provider,
         wallet_address: existing.wallet_address,
      });

      await setSessionCookie(token);
      return NextResponse.json({ user: existing });
   }

   // New wallet user — requires name
   if (!name || name.trim().length < 2) {
      return NextResponse.json({ requiresOnboarding: true });
   }

   const { data: created, error } = await supabase
      .from("profiles")
      .insert({
         name: name.trim(),
         provider: "wallet",
         wallet_address: address.toLowerCase(),
      })
      .select()
      .single();

   if (error || !created) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error?.message ?? "Could not create profile" }, { status: 500 });
   }

   const token = await createSessionToken({
      id: created.id,
      name: created.name,
      email: created.email,
      avatar_url: created.avatar_url,
      provider: created.provider,
      wallet_address: created.wallet_address,
   });

   await setSessionCookie(token);
   return NextResponse.json({ user: created });
}
