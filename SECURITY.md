# Security Policy

## Reporting a Vulnerability

Do not open a public issue for security problems. Instead, email the maintainer
directly or open a private advisory via GitHub's "Report a vulnerability" flow on
the repository page. Include:

- A description of the vulnerability and the affected component.
- Steps to reproduce.
- The impact you observed.

You will receive an acknowledgement within 5 business days and a follow-up once the
issue is triaged.

## Security Notes

- **WiFi credentials** are stored in `secrets.h`, which is git-ignored. Never commit
  a real `secrets.h`; always commit the placeholder-only `secrets.example.h` and let
  each user create their own `secrets.h`.
- **Dashboard credentials** are demo defaults in `src/lib/users.ts`. Change them, or
  move them to environment variables, before any public deployment. Do not reuse
  personal passwords.
- The auth cookie (`auth_token`) is HTTP-only, SameSite=Strict, and marked `Secure`
  in production. Treat the login endpoint as a front-door lock, not a substitute for
  a real identity provider on sensitive deployments.
- If you believe a real secret was ever committed, rotate it immediately and report
  it via the process above.
