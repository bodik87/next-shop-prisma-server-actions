import { NextRequest } from "next/server";
import { updateSession } from "./app/user/_actions/user";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
