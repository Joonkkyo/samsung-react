import { ACCESS_TOKEN_NAME } from "@/lib/api";
import { redirect } from "react-router";

export async function requiresAuth({ request }: { request: Request }) {
  const url = new URL(request.url); // http://localhost:5174/movies/tt1877830
  const token = localStorage.getItem(ACCESS_TOKEN_NAME);
  if (!token) {
    return redirect(`/signin?redirectTo=${url.pathname}`);
  }
}
