# RealTime Chat - A full-stack realtime messaging chat application

A project to learn modern full-stack development.


Framework: Next.js 14/15 (App Router)
Language: TypeScript
Authentication: NextAuth.js (Google & Credentials)

# Database & Real-time

- Database (SQL): Neon (Serverless Postgres) with Prisma ORM
- Cache/Session: Upstash Redis (Fast token management and session state)
- Real-time: Pusher (Websockets for instant chat and notifications)
  
## UI/UX

- Styling: TailwindCSS
- Components: Radix UI / Shadcn/UI https://ui.shadcn.com/ 
- Icons: Lucide React
- Feedback: React Hot Toast
  
## Features

- Instant Messaging: Real-time chat powered by Pusher.
- Friendship System: Send and receive friend requests via email with Prisma persistence.
- Protected Dashboard: Sensitive routes protected by NextAuth Middleware.
- Hybrid Authentication: Login via Google OAuth or Email/Password with Bcrypt.
- Performance: Optimized queries and session caching using Redis for ultra-low latency.
- Responsive Design: Adaptive interface for mobile and desktop devices.

- Built with TypeScript
- TailwindCSS
- Icons from Lucide

- Class merging with tailwind-merge
- Conditional classes with clsx
- Variants with class-variance-authority

## Utility Configuration
To maintain visual and logical consistency:

- tailwind-merge & clsx: For dynamic and conditional Tailwind class merging.
- class-variance-authority (CVA): Creating scalable component variants (e.g., Buttons).
- Axios: For API requests.

## Installation

1. Clone the repository:

git clone https://github.com/rodrigobarroshd/realtime-chat.git

2. Install dependencies:

npm install

3. Configure environment variables(.env)

- DATABASE_URL (Neon Postgres)
- UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN
- NEXTAUTH_SECRET & GOOGLE_CLIENT_ID / SECRET
- PUSHER_APP_ID, PUSHER_KEY, etc.

4. Sync the database:

npx prima db push
## License

[MIT](https://choosealicense.com/licenses/mit/)
