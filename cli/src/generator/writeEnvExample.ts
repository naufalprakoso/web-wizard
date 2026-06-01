import path from "node:path";
import fs from "fs-extra";

const envExample = `# Firebase Web App config. Public pages render fallback content when these are empty.
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Comma-separated admin emails for the client-side admin gate.
# Also replace admin@example.com in firestore.rules and storage.rules before deploy.
NEXT_PUBLIC_ADMIN_EMAILS=admin@example.com

# Set to true if you want the public header to show an Admin link.
NEXT_PUBLIC_SHOW_ADMIN_LINK=false

# Used by generated sitemap and robots routes.
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`;

export async function writeEnvExample(targetDir: string): Promise<void> {
  await fs.writeFile(path.join(targetDir, ".env.example"), envExample);
}
