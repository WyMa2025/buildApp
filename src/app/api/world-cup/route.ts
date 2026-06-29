import { getWorldCupData } from "@/lib/world-cup-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getWorldCupData();

  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
