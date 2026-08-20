import { redirect } from "next/navigation";

// This article now lives at the flat Framer path /article (app/article/page.tsx).
// Keep the old /writing/ozon-search-ai URL working by redirecting.
export default function OzonSearchAiRedirect() {
  redirect("/article");
}
