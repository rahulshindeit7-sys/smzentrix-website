# Feedback CMS Server

This module provides a moderation CMS backend for website feedback and doctor website showcase.

## Features

- Public feedback submit endpoint
- Public approved feedback endpoint
- Admin list endpoint (pending/approved/rejected/all)
- Admin approve/reject endpoint
- Doctor website showcase CRUD endpoints
- Built-in CMS panel at `/cms`
- JSON file storage (simple VPS deployment)

## API Endpoints

- `POST /api/feedback/submissions`
- `GET /api/feedback/public?status=approved`
- `GET /api/admin/feedback?status=pending` (admin auth required)
- `GET /api/admin/feedback/stats` (admin auth required)
- `PATCH /api/admin/feedback/:id/status` (admin auth required)
- `GET /api/showcase/public`
- `GET /api/admin/showcase?status=all` (admin auth required)
- `POST /api/admin/showcase` (admin auth required)
- `PATCH /api/admin/showcase/:id` (admin auth required)
- `PATCH /api/admin/showcase/:id/status` (admin auth required)
- `DELETE /api/admin/showcase/:id` (admin auth required)

Admin auth options:

- Session verification with your existing admin login using `ADMIN_AUTH_VERIFY_URL`
- OR fallback header `x-api-key: <ADMIN_API_KEY>`

This allows same username/password login to access `/cms` and admin APIs.

## Setup

1. Copy env file:

```bash
cp .env.example .env
```

2. Install dependencies from monorepo root:

```bash
npm install
```

3. Start server:

```bash
npm run dev --workspace apps/feedback-cms
```

or

```bash
npm run start --workspace apps/feedback-cms
```

## Nginx Reverse Proxy Example

If this server runs on port `8081`, add reverse proxy:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8081/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

Deploy this on `admin.smzentrix.info` so website calls work with base URL:

- `https://admin.smzentrix.info/api`

## Same Login Integration

Set these env values:

- `ADMIN_AUTH_VERIFY_URL` -> existing endpoint that returns `200` when session cookie/token is valid
- `ADMIN_LOGIN_URL` -> where unauthenticated user should be redirected

Then host this service on `admin.smzentrix.info` and open:

- `https://admin.smzentrix.info/cms`

If user is already logged in, CMS opens directly.

## Integrating In Existing Admin UI

For your existing admin dashboard (clients/products/invoices), add a Feedback tab and call:

- `GET /api/admin/feedback?status=pending`
- `PATCH /api/admin/feedback/:id/status` with body `{ "status": "approved" }` or `{ "status": "rejected" }`
- `GET /api/admin/showcase?status=all`
- `POST /api/admin/showcase`
- `PATCH /api/admin/showcase/:id`

