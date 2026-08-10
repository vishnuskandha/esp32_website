# ESP32 Website Control Center

![CI](https://github.com/vishnuskandha/esp32_website/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

A real-time web dashboard that pairs a **Next.js frontend** with **ESP32 firmware**. The ESP32 reads two physical buttons (GPIO 4 and GPIO 5) and posts their state to the dashboard's API; the dashboard reflects that state instantly and also lets you toggle the same buttons from the browser, with a live scrolling activity log.

## Features

- **Live dashboard** - ESP32 button state rendered in real time, polled every 500 ms.
- **Bi-directional control** - Toggle the virtual buttons from the web UI and see ESP32 state pushed back.
- **Live activity log** - Every state change is appended to a scrolling terminal-style log.
- **Cookie-based authentication** - HTTP-only session cookie protects all routes except `/login` and the public API endpoints used by the ESP32.
- **Neon glassmorphism UI** - Dark, glassmorphic interface with cyan/magenta accents.
- **Responsive** - Mobile-first layout that works on any screen size.
- **ESP32 firmware** - Arduino sketch with WiFi, debounced button input, and HTTPS POST support, buildable with Arduino IDE or PlatformIO.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Lucide React
- **Backend**: Next.js Route Handlers (serverless on Vercel)
- **Hardware**: ESP32 (Arduino framework)
- **Tooling**: ESLint, PlatformIO

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- An ESP32 development board (for the firmware part)

### Web dashboard

```bash
git clone https://github.com/vishnuskandha/esp32_website.git
cd esp32_website
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in.

> **Default credentials** (demo only - change them before any public deployment):
>
> | Role | Username | Password |
> | :--- | :--- | :--- |
> | Principal | `principal` | `principal123` |
> | Admin | `admin` | `admin123` |
> | Guest | `guest` | `guest123` |
> | Demo | `demo` | `demo123` |
>
> Credentials are defined in `src/lib/users.ts`. For production, move them out of the
> source tree (for example into environment variables) and rotate the defaults.

### ESP32 firmware

1. Copy `secrets.example.h` to `secrets.h` and set your WiFi `ssid` and `password`.
   (`secrets.h` is git-ignored, so your credentials never get committed.)
2. Update `serverUrl` in `esp32_code.ino` if your backend is deployed somewhere other
   than the default Vercel URL.
3. Flash the sketch:
   - **Arduino IDE** - open `esp32_code.ino`, select your ESP32 board, upload.
   - **PlatformIO** - install [PlatformIO Core](https://platformio.org) and run:

     ```bash
     pio run -t upload
     pio device monitor
     ```

4. Wire two momentary push buttons between GPIO 4/5 and GND (the firmware uses
   `INPUT_PULLUP`, so the buttons connect to ground).
5. Power the board; the Serial Monitor (115200 baud) will confirm the WiFi connection
   and then stream button events as they happen.

## API

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/auth/login` | POST | Validate credentials and set the `auth_token` cookie |
| `/api/auth/logout` | POST | Clear the `auth_token` cookie |
| `/api/button` | POST | ESP32 pushes `{ button1, button2 }` state |
| `/api/status` | GET | Dashboard polls the latest button state and log |

## Project Structure

```
esp32_website/
├── src/
│   ├── app/
│   │   ├── api/                 # Route handlers (login, logout, button, status)
│   │   ├── login/               # Login page
│   │   ├── globals.css          # Tailwind entry
│   │   ├── layout.tsx           # Root layout + metadata
│   │   └── page.tsx             # Dashboard page
│   ├── components/              # StatusIndicator, ActivityLog
│   └── lib/                     # users, store, utils
├── esp32_code.ino               # ESP32 Arduino firmware
├── secrets.example.h            # WiFi credential template (copy to secrets.h)
├── platformio.ini               # PlatformIO build config
├── middleware.ts                # Auth guard for protected routes
└── next.config.ts
```

## Deployment

This project is optimized for **Vercel**:

1. Push to GitHub and import the repository into Vercel (the CI workflow builds and
   lints every push).
2. Deploy. Set your production domain as `serverUrl` in the ESP32 firmware.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

See [SECURITY.md](SECURITY.md) for how to report vulnerabilities and for security
best practices.

## License

MIT - see [LICENSE](LICENSE).
