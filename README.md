# Movie Frontend 🎬

This is a modern, standalone Angular application that provides a professional user interface for the Movie Reservation System. It features a clean, responsive design with a cinematic black and yellow theme, allowing users to browse movies, view details, and book seats in real-time.

This frontend consumes the **[Movie Reservation REST API (Spring Boot)](https://github.com/M-Sayed939/Movie-Reservation.git)**.

## Table of Contents

1.  [Preview](#preview)
2.  [Features](#features-)
3.  [Technology Stack](#technology-stack-)
4.  [Getting Started](#getting-started-)

-----

### Preview

**Home Page Guest View**
![Home Guest](preview/Home-Guest.png)
**Home Page Auth User View**
![Home Guest](preview/Home-User.png)


**Movie List Page**
![Movie1](preview/Movie1.png)
![Movie2](preview/Movie2.png)

**Login Page**
![Login](preview/Login.png)

**Registration Page**
![Register](preview/Register.png)
**Registration Page Failed**
![Register](preview/Login Failed.png)
**Registration Page Success**
![Register](preview/Login Successful.png)

**Movie Details Page Choose Date**
![Movie Details](preview/Movie Detail Choose Date.png)
**Movie Details Page No Showtime**
![Movie Details](preview/Movie Detail No Showtime.png)
**Movie Details Page with Showtime**
![Movie Details](preview/Movie Detail with Showtime 1.png)
![Movie Details](preview/Movie Detail with Showtime 2.png)

**Seat Reservation Page**
![Seat Reservation](preview/Seat.png)
**Booking Confirmation Page**
![Booking Confirmation](preview/Book Seat.png)

**My Reservations Page**
![My Reservations](preview/My Reservation.png)


-----

## Features ✨

- **Modern Standalone Architecture:** Built with Angular's latest standalone components, services, and guards for a clean codebase.
- **Dynamic UI:** The navbar and other elements reactively update based on the user's authentication status using Angular Signals.
- **Professional Styling:** A custom-designed, responsive UI with a cinematic black and yellow theme and smooth animations.
- **Movie Browsing:** Users can view a grid of currently playing movies and see a detailed view with descriptions, genres, and showtimes.
- **Interactive Seat Reservation:** A visual seat map allows users to see which seats are available and select the ones they wish to book.
- **Secure Route Guarding:** Booking and reservation history pages are protected by authentication guards.

## Technology Stack 🛠️

- **Framework:** Angular 17+
- **Language:** TypeScript
- **Styling:** CSS (with modern features like Flexbox and Grid)
- **State Management:** Angular Signals
- **HTTP Client:** Angular `HttpClient` with Interceptors
- **Build Tool:** Angular CLI

## Getting Started 🚀

### Prerequisites

- **Node.js and npm**: Latest LTS version recommended.
- **Angular CLI**: `npm install -g @angular/cli`
- The **[Spring Boot Backend](https://github.com/M-Sayed939/Movie-Reservation)** must be running.

### 1\. Clone the Repository

```bash
git clone https://github.com/M-Sayed939/Movie-Reservation-FrontEnd
cd movie-reservation-frontend
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Run the Development Server

This project is pre-configured with a proxy (`proxy.conf.json`) to avoid CORS issues. It will automatically forward API requests from `http://localhost:4200/api` to your backend at `http://localhost:8081/api`.

```bash
ng serve --open
```

The application will start, and your browser will open to `http://localhost:4200`.
