# 📋 Subscription Tracker API

A RESTful API service for tracking and managing personal or business subscriptions, with automated email reminders for upcoming renewals.

[🚀 Deployed Application](https://subscription-tracker-bkjt.onrender.com)

---

## ✨ Overview

**Subscription Tracker** helps users and businesses efficiently manage their recurring subscriptions by providing a secure and intuitive backend service. With features like multi-currency support, automated email notifications, and powerful background processing, staying on top of renewals has never been easier.

---

## 🛠️ Features

- 👤 **User Authentication**: Secure signup, signin, and signout functionality.
- 💼 **Subscription Management**: Create, read, update, and delete subscription records.
- 💰 **Multiple Currencies**: Support for USD, EUR, and BGN.
- 📝 **Categories & Status Tracking**: Categorize and track the status of each subscription.
- 🔔 **Automated Email Reminders**: Configurable reminders at 7, 5, 2, and 1 days before renewal.
- 🛡️ **Rate Limiting & Bot Protection**: Using Arcjet for API protection.
- 🚀 **Background Processing**: Asynchronous workflows powered by Upstash.

---

## 🧰 Tech Stack

- **Node.js & Express** — Backend API framework
- **MongoDB & Mongoose** — Database and ODM
- **JWT** — Authentication and authorization
- **Nodemailer** — Email delivery
- **Arcjet** — API protection and rate limiting
- **Upstash Workflow** — Background job processing
- **Dayjs** — Date manipulation
- **Bcrypt** — Password hashing

---

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/sign-up` — Register a new user
- `POST /api/v1/auth/sign-in` — Login a user
- `POST /api/v1/auth/sign-out` — Logout a user

### Users
- `GET /api/v1/users` — Get all users (admin access)
- `GET /api/v1/users/:id` — Get specific user details

### Subscriptions
- `POST /api/v1/subscriptions` — Create a new subscription
- `GET /api/v1/subscriptions/:id` — Get subscription details
- `PUT /api/v1/subscriptions/:id` — Update a subscription
- `DELETE /api/v1/subscriptions/:id` — Delete a subscription
- `GET /api/v1/subscriptions/user/:id` — Get all subscriptions for a user

### Workflows
- `POST /api/v1/workflows/subscription/reminder` — Handle subscription reminder notifications
