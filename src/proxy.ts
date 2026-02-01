import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { userService } from "./services/user.service"
import { Roles } from "./constants/roles"

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname

  let isAuthenticated = false
  let role: string | null = null

  const { data } = await userService.getSession()

  if (data) {
    isAuthenticated = true
    role = data.user.role
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (role === Roles.admin && !pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(
      new URL("/admin-dashboard", request.url)
    )
  }

  if (role === Roles.seller && !pathName.startsWith("/seller-dashboard")) {
    return NextResponse.redirect(
      new URL("/seller-dashboard", request.url)
    )
  }

  if (role === Roles.customer && !pathName.startsWith("/customer-dashboard")) {
    return NextResponse.redirect(
      new URL("/customer-dashboard", request.url)
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/admin-dashboard',
    '/seller-dashboard',
    '/customer-dashboard',
    '/admin-dashboard/:path*'
  ],
}