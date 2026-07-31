import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const response = await context.next();
  const hostname = new URL(request.url).hostname;

  if (hostname.endsWith(".netlify.app")) {
    response.headers.set("X-Robots-Tag", "noindex");
  }

  return response;
};
