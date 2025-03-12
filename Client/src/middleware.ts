import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Các route cần bảo vệ
const PROTECTED_ROUTES = {
    admin: {
        login: '/admin/auth/login',
        base: '/admin/dashboard',
    },
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        recover: '/auth/recover',
        resetPassword: '/auth/resetPassword',
        verifyEmail: '/auth/verifyEmail',
        verifyEmailCheck: '/auth/verifyEmail/check',
        verifyEmailCheckRegister: '/auth/verifyEmail/checkRegister',
    },
};

export function middleware(request: NextRequest) {
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const refreshTokenAdmin = request.cookies.get('refreshTokenAdmin')?.value;
    const isVerifyEmail = request.cookies.get('isVerifyEmail')?.value;
    const { pathname } = request.nextUrl;

    // Xử lý routes auth
    if (pathname.startsWith('/auth')) {
        // Nếu đã đăng nhập, không cho phép truy cập các trang login, register, recover, resetPassword
        if (
            refreshToken &&
            [
                PROTECTED_ROUTES.auth.login,
                PROTECTED_ROUTES.auth.register,
                PROTECTED_ROUTES.auth.recover,
                PROTECTED_ROUTES.auth.resetPassword,
            ].includes(pathname)
        ) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Nếu đã verify email, không cho phép truy cập các trang verify
        if (
            refreshToken &&
            isVerifyEmail === 'true' &&
            [
                PROTECTED_ROUTES.auth.verifyEmail,
                PROTECTED_ROUTES.auth.verifyEmailCheck,
                PROTECTED_ROUTES.auth.verifyEmailCheckRegister,
            ].includes(pathname)
        ) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Nếu chưa đăng nhập, không cho phép truy cập trang verify email
        if (!refreshToken && pathname === PROTECTED_ROUTES.auth.verifyEmail) {
            return NextResponse.redirect(new URL(PROTECTED_ROUTES.auth.login, request.url));
        }
    }

    // Xử lý routes admin
    if (pathname.startsWith(PROTECTED_ROUTES.admin.base)) {
        // Cho phép truy cập trang login admin
        if (pathname === PROTECTED_ROUTES.admin.login) {
            // Nếu đã đăng nhập admin, chuyển về trang admin
            if (refreshTokenAdmin) {
                return NextResponse.redirect(new URL(PROTECTED_ROUTES.admin.base, request.url));
            }
            return NextResponse.next();
        }

        // Nếu chưa đăng nhập admin, chuyển về trang login admin
        if (!refreshTokenAdmin) {
            return NextResponse.redirect(new URL(PROTECTED_ROUTES.admin.login, request.url));
        }
    }

    return NextResponse.next();
}

// Áp dụng middleware cho cả routes auth và admin
export const config = {
    matcher: ['/auth/:path*', '/admin/:path*'],
};
