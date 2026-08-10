# Contributing to ESP32 Website Control Center

Thanks for taking the time to contribute. This project pairs a Next.js dashboard with
ESP32 firmware, so contributions can touch web code, the Arduino sketch, or both.

## Development Setup

1. Fork and clone the repository.
2. Install dependencies: `npm ci`.
3. Run the development server: `npm run dev`.
4. (Optional) Set up PlatformIO if you want to build the firmware:
   `pio run` (requires [PlatformIO Core](https://platformio.org)).

## Checks

Before submitting, make sure the project is clean:

```bash
npm run lint
npm run build
```

The CI workflow runs these same commands on every push and pull request, so a green
CI run is required before a merge.

## Making Changes

- Create a branch off `main`, for example `fix/descriptive-name` or
  `feature/descriptive-name`.
- Keep changes focused and small; one logical change per pull request.
- For firmware changes, keep the sketch buildable with both Arduino IDE and
  PlatformIO, and never commit a real `secrets.h`.

## Commit Messages

Use clear, imperative commit messages (for example "fix: debounce button reads").
No real credentials, tokens, or `secrets.h` files may ever be committed.

## Pull Requests

1. Push your branch and open a pull request against `main`.
2. Describe what you changed and why.
3. Reference any related issues.
4. Ensure CI passes.

## Code of Conduct

Be respectful and constructive. Harassment of any kind is not tolerated.
