import { NextRequest } from "next/server";
import { updateSession } from "./app/_actions/user";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
