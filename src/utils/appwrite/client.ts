import { Client, Account, Databases } from 'appwrite';

let client: Client | null = null;

export function getClient(): Client {
  if (!client) {
    client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
  }
  return client;
}

export function getAccount() {
  return new Account(getClient());
}

export function getDatabases() {
  return new Databases(getClient());
}
