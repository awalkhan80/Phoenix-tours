import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
export async function middleware(req){
 if(!req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname==='/admin/login') return NextResponse.next();
 const token=req.cookies.get('phoenix_admin')?.value;
 if(!token) return NextResponse.redirect(new URL('/admin/login',req.url));
 try{await jwtVerify(token,new TextEncoder().encode(process.env.AUTH_SECRET || 'change-this-in-production'));return NextResponse.next()}catch{return NextResponse.redirect(new URL('/admin/login',req.url))}
}
export const config={matcher:['/admin/:path*']};
