# QuickServe

QuickServe is a unified modern web application built using **React** and **Vite**, combining both a vibrant customer-facing food ordering interface and a highly functional Administrative dashboard in a single deployable application.

## 🚀 Features

* **Unified Frontend**: A seamless combination of the Customer Website and Admin Dashboard into a single Single Page Application (SPA).
* **Cross-Tab Synchronization**: Real-time cross-tab updates using `localStorage` events. Orders placed on the customer side immediately reflect on the admin dashboard.
* **Modern UI/UX**: Built with standard Vite CSS, Tailwind CSS, and lucide-react for sharp typography, soft glassmorphism components, and beautiful gradients.
* **Routing**: Managed elegantly via `react-router-dom`:
  - `/` — Customer Order Page
  - `/history` — Customer Order History
  - `/admin` — Restricted Admin Management Panel

## 🛠 Tech Stack

* **Framework:** Frontend powered by [React v19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Routing:** `react-router-dom`
* **Styling:** Vanilla CSS + Tailwind CSS (@tailwindcss/vite)
* **Icons:** `lucide-react`

## 📦 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the local development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   - Head over to `http://localhost:5173/` for the Customer Interface.
   - Head over to `http://localhost:5173/admin` for the Admin Dashboard.

## 🧑‍💻 Deployment

Because it is a single unified Vite app, this repository is perfectly structured to be deployed natively on **Vercel**, **Netlify**, or **Cloudflare Pages**. 
Simply link your GitHub repository to your preferred hosting platform, and it will auto-detect the Vite build commands (`npm run build`).
