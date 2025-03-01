import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const isVerifyEmail = request.cookies.get('isVerifyEmail')?.value;
    const { pathname } = request.nextUrl;

    // Nếu chưa đăng nhập (không có refreshToken) và truy cập trang /auth/verifyEmail => Chuyển hướng về "/auth/login"
    if (!refreshToken && pathname === '/auth/verifyEmail') {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Nếu đã đăng nhập (có refreshToken) và truy cập các trang login, recover, register, resetPassword => Chuyển hướng về "/"
    if (refreshToken && ['/auth/login', '/auth/recover', '/auth/register', '/auth/resetPassword'].includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Nếu đã đăng nhập (có refreshToken) và isVerifyEmail là true (boolean) và truy cập các trang verifyEmail, verifyEmail/check => Chuyển hướng về "/"
    if (
        refreshToken &&
        isVerifyEmail === 'true' &&
        ['/auth/verifyEmail', '/auth/verifyEmail/check'].includes(pathname)
    ) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Các trường hợp khác cho phép tiếp tục
    return NextResponse.next();
}

// Chỉ áp dụng middleware cho các đường dẫn auth liên quan
export const config = {
    matcher: ['/auth/:path*'],
};
