# __PROJECT_NAME__

Created with Web Template Wizard.

## Install

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Configure Firebase

1. Create a Firebase project.
2. Add a Web App in Firebase project settings.
3. Enable Email/Password sign-in in Firebase Auth.
4. Create a Firestore database.
5. Enable Firebase Storage.
6. Copy `.env.example` to `.env.local` and fill in the public Firebase web app values.

## Environment Variables

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com
```

`NEXT_PUBLIC_ADMIN_EMAILS` is used by the client-side admin guard. Firestore and Storage rules must also be edited to include the same admin email list.

## First Admin

For the first release, create the first admin manually in Firebase Authentication:

1. Open Firebase Console.
2. Go to Authentication → Users.
3. Add a user with email and password.
4. Add that email to `NEXT_PUBLIC_ADMIN_EMAILS`.
5. Add the same email to `firestore.rules` and `storage.rules`.

This avoids public admin registration. For stricter production setups, migrate the `isAdmin()` rule to Firebase custom claims.

## Security Rules

Deploy the generated rules from this project:

```bash
firebase deploy --only firestore:rules,storage
```

Before deploying, replace `admin@example.com` in `firestore.rules` and `storage.rules`.

## Admin Dashboard

Go to `/admin/login`, sign in with the allowlisted admin email, then manage:

- CMS content
- Theme colors
- Contact messages

## Theme Colors

Admin users can edit primary, secondary, accent, background, text color, and border radius in `/admin/settings`. Values are saved in Firestore under `siteSettings/theme` and applied to the public website through CSS variables.

## Deploy

Deploy to Vercel, Firebase Hosting, or another Next.js-compatible host. Set all environment variables in your hosting provider before building.
