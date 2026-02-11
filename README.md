# 🚀 Simple CRUD App with Next.js, React, Tailwind & ShadCN

A **modern, minimal web app** built with **Next.js**, **React**, **Tailwind CSS**, and **ShadCN** components.  
This app demonstrates a simple **CRUD system** with authentication, allowing users to **sign up, log in, view all users, and delete users**. Perfect for learning full-stack fundamentals!

---

## 🌟 Features

- 🔑 **Authentication**: Login & Signup on a single page
- 👥 **User Management**: View all registered users
- 🗑️ **Delete Users**: Remove users from the list easily
- 📱 **Responsive UI**: Built with **Tailwind CSS** + **ShadCN** components
- ⚡ **Fast & Lightweight**: Minimal setup, simple CRUD logic
- 🎨 **Notifications**: Success & error feedback with `react-hot-toast`
- ✅ **Form Validation**: Powered by `zod` + `react-hook-form`

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)
![ShadCN](https://img.shields.io/badge/ShadCN-F3F4F6?style=flat-square&logoColor=black)
![Prisma](https://img.shields.io/badge/Prisma-0EA5E9?style=flat-square&logo=prisma&logoColor=white)  
![Zod](https://img.shields.io/badge/Zod-6C63FF?style=flat-square&logoColor=white)

---

## 📄 Pages

1. **Auth Page (Login/Signup)**
   - All in **one page**
   - Login with email & password
   - Signup with name, email & password
   - Form validation using **Zod**

2. **Users Page**
   - Displays all users
   - Option to **delete users**
   - Info displayed using **ShadCN components**

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/reportJNG/simple-crud-nextjs.git
cd simple-crud-nextjs
Install dependencies
npm install
Environment Variables
Create a .env file:

DATABASE_URL="your_database_url_here"
Run database migrations (if using Prisma)
npx prisma migrate dev
Start the development server
npm run dev
Open http://localhost:3000 in your browser 👀

🎯 Usage
Go to the auth page to login or sign up

Visit the users page to see all registered users

Delete users by clicking the 🗑️ delete button

🗂️ Folder Structure
/src
  /components    # Reusable UI components (ShadCN + Tailwind)
  /pages         # Next.js pages (auth page, users page)
  /lib           # API calls & utility functions
  /schemas       # Zod schemas for validation
  /prisma        # Prisma client & DB schema
💡 Notes
Simple and learning-focused

No advanced auth (JWT/OAuth) included

Perfect example to learn Next.js + React + Tailwind + ShadCN integration

📜 License
MIT License

✨ Author
Remali Hamza
GitHub: https://github.com/reportJNG
LinkedIn: optional if you want

Made with ❤️ and ☕ by Remali Hamza

```
