// app/api/queryAppSync/route.ts
import { getToken } from "@/actions/getToken";

export async function POST(req: Request) {
  const { query, variables } = await req.json();
  const token = await getToken();

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const res = await fetch(process.env.AWS_APPSYNC_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await res.json();
  return Response.json(data);
}