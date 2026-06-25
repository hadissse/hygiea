/**
 * Run once after creating your Appwrite project:
 *   node scripts/setup-appwrite.mjs
 *
 * Requires APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY in .env.local
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load .env.local manually
const envPath = resolve(process.cwd(), '.env.local');
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l && !l.startsWith('#'))
    .map(l => l.split('=').map(s => s.trim()))
    .filter(([k]) => k)
);

const ENDPOINT = env.APPWRITE_ENDPOINT;
const PROJECT_ID = env.APPWRITE_PROJECT_ID;
const API_KEY = env.APPWRITE_API_KEY;
const DB_ID = env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'hygiea';

if (!ENDPOINT || !PROJECT_ID || !API_KEY || PROJECT_ID === 'FILL_IN_AFTER_SETUP') {
  console.error('❌ Fill in APPWRITE_PROJECT_ID and APPWRITE_API_KEY in .env.local first');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'X-Appwrite-Project': PROJECT_ID,
  'X-Appwrite-Key': API_KEY,
};

async function req(method, path, body) {
  const res = await fetch(`${ENDPOINT}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok && json.code !== 409) throw new Error(`${method} ${path}: ${json.message}`);
  return json;
}

async function createAttr(dbId, colId, type, key, opts = {}) {
  try {
    await req('POST', `/databases/${dbId}/collections/${colId}/attributes/${type}`, { key, ...opts });
  } catch (e) {
    if (!e.message.includes('409') && !e.message.includes('already exists')) throw e;
  }
}

async function main() {
  console.log('🚀 Setting up Appwrite for Hygiea...\n');

  // 1. Create database
  console.log('📦 Creating database...');
  await req('POST', '/databases', { databaseId: DB_ID, name: 'Hygiea' });

  // 2. Create collections
  const collections = [
    { id: 'profiles', name: 'Profiles' },
    { id: 'charts', name: 'Charts' },
    { id: 'events', name: 'Events' },
    { id: 'calibrations', name: 'Calibrations' },
    { id: 'traits', name: 'Traits' },
    { id: 'journey_progress', name: 'Journey Progress' },
  ];

  for (const col of collections) {
    console.log(`  Creating collection: ${col.name}`);
    await req('POST', `/databases/${DB_ID}/collections`, {
      collectionId: col.id,
      name: col.name,
      documentSecurity: false,
    });
  }

  // 3. Add attributes
  console.log('\n📋 Adding attributes...');

  // profiles
  await createAttr(DB_ID, 'profiles', 'string', 'user_id', { size: 36, required: true });
  await createAttr(DB_ID, 'profiles', 'string', 'display_name', { size: 255, required: false });
  await createAttr(DB_ID, 'profiles', 'string', 'first_name', { size: 255, required: false });
  await createAttr(DB_ID, 'profiles', 'string', 'last_name', { size: 255, required: false });

  // charts
  await createAttr(DB_ID, 'charts', 'string', 'user_id', { size: 36, required: true });
  await createAttr(DB_ID, 'charts', 'string', 'label', { size: 50, required: true });
  await createAttr(DB_ID, 'charts', 'string', 'birth_data', { size: 65535, required: false });
  await createAttr(DB_ID, 'charts', 'string', 'chart_json', { size: 1048576, required: false });

  // events
  await createAttr(DB_ID, 'events', 'string', 'user_id', { size: 36, required: true });
  await createAttr(DB_ID, 'events', 'string', 'note', { size: 5000, required: false });
  await createAttr(DB_ID, 'events', 'string', 'mood', { size: 50, required: false });
  await createAttr(DB_ID, 'events', 'string', 'energy', { size: 50, required: false });
  await createAttr(DB_ID, 'events', 'string', 'placement_key', { size: 100, required: false });
  await createAttr(DB_ID, 'events', 'string', 'tags', { size: 255, required: false, array: true });

  // calibrations
  await createAttr(DB_ID, 'calibrations', 'string', 'user_id', { size: 36, required: true });
  await createAttr(DB_ID, 'calibrations', 'string', 'planet', { size: 50, required: true });
  await createAttr(DB_ID, 'calibrations', 'float', 'degree_offset', { required: false, default: 0 });

  // traits
  await createAttr(DB_ID, 'traits', 'string', 'user_id', { size: 36, required: true });
  await createAttr(DB_ID, 'traits', 'string', 'profile_json', { size: 1048576, required: true });

  // journey_progress
  await createAttr(DB_ID, 'journey_progress', 'string', 'user_id', { size: 36, required: true });
  await createAttr(DB_ID, 'journey_progress', 'string', 'journey_id', { size: 100, required: true });
  await createAttr(DB_ID, 'journey_progress', 'string', 'week_start', { size: 20, required: true });
  await createAttr(DB_ID, 'journey_progress', 'integer', 'step_index', { required: false, default: 0 });
  await createAttr(DB_ID, 'journey_progress', 'string', 'journal_entries', { size: 65535, required: false });

  // 4. Create indexes
  console.log('\n🔍 Creating indexes...');
  const wait = (ms) => new Promise(r => setTimeout(r, ms));
  await wait(2000); // wait for attributes to be ready

  for (const col of ['profiles', 'charts', 'events', 'calibrations', 'traits', 'journey_progress']) {
    try {
      await req('POST', `/databases/${DB_ID}/collections/${col}/indexes`, {
        key: 'user_id_idx',
        type: 'key',
        attributes: ['user_id'],
      });
    } catch { /* ignore if already exists */ }
  }

  // 5. Set permissions (any authenticated user can read/write their own docs)
  console.log('\n🔒 Setting collection permissions...');
  for (const col of collections) {
    await req('PUT', `/databases/${DB_ID}/collections/${col.id}`, {
      name: col.name,
      permissions: ['read("users")', 'create("users")', 'update("users")', 'delete("users")'],
      documentSecurity: false,
    });
  }

  console.log('\n✅ Appwrite setup complete!');
  console.log('   Database ID: ' + DB_ID);
  console.log('   Collections: profiles, charts, events, calibrations, traits, journey_progress');
  console.log('\nNext: run `npm run dev` in hygiea-v2 and sign up at http://localhost:3000/login');
}

main().catch(err => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});
