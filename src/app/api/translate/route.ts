import { NextRequest } from "next/server";
import { translateByDeepLX } from "./util";

export async function POST(req: NextRequest) {
  let body: {
    source_lang: string;
    target_lang: string;
    text: string;
  };

  try {
    body = await req.json();
  } catch (e) {
    return new Response("Invalid JSON", { status: 400 });
  }
  let result: deepLXTranslationResult | any;
  try {
    result = await translateByDeepLX(
      body.source_lang,
      body.target_lang,
      body.text
    );
  } catch (e) {
    return new Response("Error", { status: 500 });
  }

  if (result.code === 200) {
    return Response.json({
      code: 200,
      id: result.id,
      data: result.data,
      alternatives: result.alternatives,
      source_lang: result.source_lang,
      target_lang: result.target_lang,
      method: result.method,
    });
  } else {
    return Response.json(result);
  }
}
