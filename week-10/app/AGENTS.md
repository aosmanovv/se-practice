# AGENTS.md — Smart Campus Room Availability Checker

Instructions for any coding agent working in this project. Read this file before you change
anything, and follow it over any general habit of yours.

## Project

A React + TypeScript page (Vite) that tells a student whether a campus room is free for a
requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
the tests are in `src/booking.test.ts`.

Scope: exactly one fictional room and the fictional bookings in `src/bookings.ts`. Never use real room names, real timetables or data from the KBTU portal.
Never add a login page or a database (no Supabase, no other persistence), and never add or commit secrets, API keys, tokens or `.env` files.
Never deploy or publish the app anywhere (no `netlify deploy`); run it locally only.

## Acceptance contract

- AC1 Reject start ≥ end and requests in the past.
- AC2 Enforce the maximum allowed duration (120 minutes).
- AC3 Reject a blocked room.
- AC4 Reject overlaps; allow bookings that only touch at endpoints.
- AC5 Return Available / Unavailable without changing booking data.
- AC6 Preserve clear UI feedback on desktop and mobile.
## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Tests: `npm test`
- Build: `npm run build`
## You may

- Edit any file in the project.
- Add packages when a task needs them.
## Before you finish

- Make sure the page still loads.
  - Before proposing the work as accepted, run `npm test` and `npm run build` and report their real output. Never claim a pass you did not run.