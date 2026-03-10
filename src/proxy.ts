import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./services/auth";
import { ROLES } from "./constants/roles";

export async function proxy(request: NextRequest){
    const user = await getUser();

    if(!user){
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"]
}