# ⚡ ESP32 Neon Control Center

![Project Status](https://img.shields.io/badge/Status-Active-cyan) ![License](https://img.shields.io/badge/License-MIT-magenta) ![Next.js](https://img.shields.io/badge/Next.js-14-black)

A futuristic, high-performance IoT dashboard designed to interface with ESP32 microcontrollers. Featuring a **Premium Neon Glassmorphism** UI, real-time bi-directional control, and a live "Hacker-style" activity log.

## ✨ Features

-   **💎 Neon Glassmorphism UI**: Deep dark aesthetics with translucent glass cards and vibrant neon accents (Cyan & Magenta).
-   **👆 3D Interactive Buttons**: Skeuomorphic buttons that physically "depress" and glow intensely upon activation.
-   **📜 Live Activity Log**: Real-time scrolling terminal that tracks every system event and button press.
-   **⚡ Real-time Control**: Instant bi-directional communication between the web dashboard and ESP32.
-   **📱 Mobile-First**: Fully responsive design that feels like a native app on any device.

## 🚀 Tech Stack

-   **Frontend**: Next.js 14, Tailwind CSS, Lucide React
-   **Backend**: Next.js API Routes (Serverless)
-   **Hardware**: ESP32 (Arduino Framework)

## 🛠️ Getting Started

### Prerequisites
-   Node.js 18+
-   ESP32 Development Board

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/esp32-neon-control.git
    cd esp32-neon-control
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### ESP32 Setup

1.  Open `esp32_code.ino` in Arduino IDE.
2.  Install the **WiFi** and **HTTPClient** libraries.
3.  Update the `ssid`, `password`, and `serverUrl` variables.
4.  Flash to your ESP32.

## 📦 Deployment

This project is optimized for **Vercel**.

1.  Push to GitHub.
2.  Import project into Vercel.
3.  Deploy! 🚀

## 📄 License

MIT License - build something awesome!
