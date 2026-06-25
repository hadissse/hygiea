import { Client, Databases, Users } from 'node-appwrite';

export function getAdminClient(): Client {
  return new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);
}

export function getAdminDatabases() {
  return new Databases(getAdminClient());
}

export function getAdminUsers() {
  return new Users(getAdminClient());
}
