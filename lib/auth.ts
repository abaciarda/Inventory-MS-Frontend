import { cookies } from "next/headers";
import type { AuthUser } from "@/types/app.types";
import { env } from "@/lib/env";

export async function getServerSession(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();
      return {
        id: data?.userId,
        username: data?.username,
        role: data?.role
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch server session:", error);
    return null;
  }
}
