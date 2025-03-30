This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure
e-commerce-project/
│── src/
│   ├── app/                   # Root Next.js App Router
│   │   ├── layout.tsx         # Layout tổng thể của ứng dụng
│   │   ├── page.tsx           # Trang Home (Landing Page)
│   │   ├── auth/              # Các trang authentication (Login, Register)
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   ├── dashboard/         # Khu vực dành cho user đăng nhập
│   │   │   ├── page.tsx       # Trang Dashboard chính
│   │   │   ├── orders/page.tsx   # Lịch sử đơn hàng
│   │   │   ├── profile/page.tsx  # Hồ sơ người dùng
│   │   ├── products/          # Trang sản phẩm
│   │   │   ├── page.tsx       # Danh sách sản phẩm
│   │   │   ├── [id]/page.tsx  # Chi tiết sản phẩm
│   │   ├── cart/              # Trang giỏ hàng
│   │   │   ├── page.tsx
│   │   ├── checkout/          # Trang thanh toán
│   │   │   ├── page.tsx
│   │   ├── admin/             # Khu vực dành cho admin
│   │   │   ├── page.tsx       # Trang Admin Dashboard
│   │   │   ├── products/page.tsx  # Quản lý sản phẩm
│   │   │   ├── orders/page.tsx    # Quản lý đơn hàng
│   ├── components/            # Tái sử dụng UI components
│   │   ├── layout/            # Các layout chính
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   ├── ui/                # Các component UI nhỏ (button, input,...)
│   │   ├── products/          # Component liên quan đến sản phẩm
│   │   ├── cart/              # Component liên quan đến giỏ hàng
│   │   ├── auth/              # Component liên quan đến đăng nhập/đăng ký
│   ├── store/                 # Redux Toolkit store
│   │   ├── store.ts           # Cấu hình store
│   │   ├── hooks.ts           # Custom hooks
│   │   ├── slices/            # Redux slices
│   │   │   ├── authSlice.ts   # Xử lý trạng thái authentication
│   │   │   ├── cartSlice.ts   # Xử lý trạng thái giỏ hàng
│   │   │   ├── productSlice.ts  # Xử lý trạng thái sản phẩm
│   ├── services/              # Gọi API
│   │   ├── api.ts             # Cấu hình API fetch
│   │   ├── authService.ts     # API cho authentication
│   │   ├── productService.ts  # API cho sản phẩm
│   │   ├── orderService.ts    # API cho đơn hàng
│   ├── utils/                 # Helper functions
│   │   ├── formatPrice.ts     # Format giá tiền
│   │   ├── validateForm.ts    # Hàm validate form
│   ├── styles/                # Global styles
│   ├── config/                # Các config chung
│   │   ├── constants.ts       # Chứa hằng số (key token, API base URL,...)
│   │   ├── env.ts             # Load biến môi trường
│── public/                    # Static assets (images, icons, fonts,...)
│── .eslintrc.js                # Cấu hình ESLint
│── .prettierrc                 # Cấu hình Prettier
│── next.config.js              # Cấu hình Next.js
│── tsconfig.json               # Cấu hình TypeScript
│── package.json                # Dependencies
│── README.md                   # Hướng dẫn dự án

