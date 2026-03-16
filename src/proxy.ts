import { NextRequest, NextResponse } from "next/server";
import { getUser, userLogOut } from "./services/auth";
import { ROLES } from "./constants/roles";


const ALLOWED_ROLE = [ROLES.customer, ROLES.provider, ROLES.admin];



export async function proxy(request: NextRequest){
    const { pathname, origin } = request.nextUrl;
    
    const user = await getUser();


    if (!user) {
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, origin));
    }


    if (!ALLOWED_ROLE.includes(user.role)) {
        userLogOut();
        return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, origin));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"]
}