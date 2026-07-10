# Feedback API Contract

This frontend sends client feedback for moderation on your VPS admin backend.

## Environment Variables

Set these in production environment:

- `VITE_FEEDBACK_API_BASE_URL` (example: `https://admin.smzentrix.info/api`)
- `VITE_FEEDBACK_API_KEY` (optional)

## 1) Submit Feedback (Public Website)

- Method: `POST`
- URL: `/feedback/submissions`
- Headers:
  - `Content-Type: application/json`
  - `x-api-key: <value>` (optional)

### Request Body

```json
{
  "id": 1720610000000,
  "clientName": "Dr. Aditi Patil",
  "clinicName": "Shree Clinic",
  "rating": 5,
  "feedback": "Very smooth OPD workflow and excellent support.",
  "createdAt": "2026-07-10T11:30:00.000Z",
  "status": "pending",
  "source": "website"
}
```

### Expected Behavior

- Save in DB with status `pending`.
- Show on admin page list for moderation.
- Admin can `approve` or `reject`.

## 2) List Approved Feedback (Public Website)

- Method: `GET`
- URL: `/feedback/public?status=approved`
- Headers:
  - `x-api-key: <value>` (optional)

### Response (Array)

```json
[
  {
    "id": "fb_001",
    "clientName": "Dr. Aditi Patil",
    "clinicName": "Shree Clinic",
    "rating": 5,
    "feedback": "Very smooth OPD workflow and excellent support.",
    "createdAt": "2026-07-10T11:30:00.000Z"
  }
]
```

## 3) Admin Moderation Endpoints

- Method: `GET`
- URL: `/admin/feedback?status=pending`
- Headers:
  - `x-api-key: <admin key>`

Returns all records for the selected status (`pending|approved|rejected|all`).

---

- Method: `PATCH`
- URL: `/admin/feedback/:id/status`
- Headers:
  - `Content-Type: application/json`
  - `x-api-key: <admin key>`

### Request Body

```json
{
  "status": "approved"
}
```

Allowed status values:

- `approved`
- `rejected`

Only `approved` feedback should be returned from public endpoint.
