import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSession, createSessionToken, setSessionCookie } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
   const user = await getSession();
   if (!user) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
   }

   const { walletAddress } = await req.json() as { walletAddress: string };
   if (!walletAddress) {
      return NextResponse.json({ error: "Missing walletAddress" }, { status: 400 });
   }

   const supabase = await createClient();
   const { data: updated, error } = await supabase
      .from("profiles")
      .update({ wallet_address: walletAddress.toLowerCase() })
      .eq("id", user.id)
      .select()
      .single();

   if (error || !updated) {
      return NextResponse.json({ error: "Could not update wallet" }, { status: 500 });
   }

   const token = await createSessionToken({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      avatar_url: updated.avatar_url,
      provider: updated.provider,
      wallet_address: updated.wallet_address,
   });

   await setSessionCookie(token);
   return NextResponse.json({ user: updated });
}
