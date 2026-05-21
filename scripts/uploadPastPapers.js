/**
 * Upload AS Level Edexcel past papers to Supabase Storage
 * Run: node scripts/uploadPastPapers.js
 * Output: src/data/pastPapers.js
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// ─── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://yhlhtrcfysuvsfchqzxo.supabase.co";
// Use service role key for uploads (get from Supabase dashboard → Settings → API)
const SERVICE_ROLE_KEY_PATH = path.join(__dirname, "supabase-service-key.txt");
const SOURCE_DIR = "/Users/akashagrawal/Desktop/platform-past-paper-content";
const OUTPUT_FILE = path.join(__dirname, "../src/data/pastPapers.js");
const BUCKET = "past-papers";

// ─── Check service key ─────────────────────────────────────────────────────────
if (!fs.existsSync(SERVICE_ROLE_KEY_PATH)) {
  console.error(`
❌  Supabase service role key not found.

To fix:
  1. Go to https://supabase.com/dashboard/project/zdlvedduzamfujdngnxr/settings/api
  2. Copy the "service_role" key (under Project API Keys)
  3. Save it as a plain text file: scripts/supabase-service-key.txt
  4. Run this script again
`);
  process.exit(1);
}

const SERVICE_ROLE_KEY = fs.readFileSync(SERVICE_ROLE_KEY_PATH, "utf8").trim();
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ─── Folder map ────────────────────────────────────────────────────────────────
const FOLDERS = {
  pure: {
    qp: path.join(SOURCE_DIR, "as-level-papers-pure"),
    ma: path.join(SOURCE_DIR, "as-level-pure-solutions"),
    ms: path.join(SOURCE_DIR, "marking-schemes-pure"),
  },
  applied: {
    qp: path.join(SOURCE_DIR, "as-level-papers-stats-mech"),
    ma: path.join(SOURCE_DIR, "as-level-stats-solutions"),
    ms: path.join(SOURCE_DIR, "marking-schemes-stats"),
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function parseYear(filename) {
  const m = filename.match(/(\w+)\s+(\d{4})/);
  return m ? { month: m[1], year: parseInt(m[2]) } : null;
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (error) throw new Error(`Could not create bucket: ${error.message}`);
    console.log(`  ✅ Created bucket: ${BUCKET}`);
  }
}

async function uploadFile(localPath, storagePath) {
  const fileBuffer = fs.readFileSync(localPath);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType: "application/pdf",
      upsert: true,
    });
  if (error) throw new Error(`Upload failed for ${storagePath}: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function uploadFolder(localDir, storagePrefix, label) {
  const files = fs.readdirSync(localDir).filter(f => f.endsWith(".pdf"));
  const results = [];
  for (const filename of files) {
    const parsed = parseYear(filename);
    if (!parsed) continue;
    const storagePath = `${storagePrefix}/${filename.replace(/ /g, "_")}`;
    process.stdout.write(`  Uploading ${label} ${parsed.year} — ${filename} ... `);
    const url = await uploadFile(path.join(localDir, filename), storagePath);
    console.log("✅");
    results.push({ ...parsed, url, filename });
  }
  return results;
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🚀 Uploading past papers to Supabase Storage...\n");

  await ensureBucket();

  const output = { pure: [], stats: [], mechanics: [] };

  // ── Pure Maths ──────────────────────────────────────────────────────────────
  console.log("📐 Pure Mathematics");
  const pureQPs = await uploadFolder(FOLDERS.pure.qp, "pure/qp", "Pure QP");
  const pureMAs = await uploadFolder(FOLDERS.pure.ma, "pure/ma", "Pure MA");
  const pureMSs = await uploadFolder(FOLDERS.pure.ms, "pure/ms", "Pure MS");

  const pureYears = [...new Set(pureQPs.map(f => f.year))].sort((a, b) => b - a);
  for (const year of pureYears) {
    output.pure.push({
      year,
      month: pureQPs.find(f => f.year === year)?.month || "June",
      qp: pureQPs.find(f => f.year === year)?.url || null,
      ma: pureMAs.find(f => f.year === year)?.url || null,
      ms: pureMSs.find(f => f.year === year)?.url || null,
    });
  }

  // ── Stats + Mechanics ───────────────────────────────────────────────────────
  console.log("\n📊 Statistics & ⚙️  Mechanics");
  const appliedQPs = await uploadFolder(FOLDERS.applied.qp, "applied/qp", "Applied QP");
  const appliedMAs = await uploadFolder(FOLDERS.applied.ma, "applied/ma", "Applied MA");
  const appliedMSs = await uploadFolder(FOLDERS.applied.ms, "applied/ms", "Applied MS");

  const find = (arr, year, type) => {
    if (type === "stats")     return arr.find(f => f.year === year && /stats/i.test(f.filename))?.url;
    if (type === "mechanics") return arr.find(f => f.year === year && /mech/i.test(f.filename))?.url;
    return arr.find(f => f.year === year && !/stats|mech/i.test(f.filename))?.url; // combined (2018)
  };

  const appliedYears = [...new Set(appliedQPs.map(f => f.year))].sort((a, b) => b - a);
  for (const year of appliedYears) {
    const month = appliedQPs.find(f => f.year === year)?.month || "June";

    const statsQP = find(appliedQPs, year, "stats") || find(appliedQPs, year, "combined");
    if (statsQP) {
      output.stats.push({
        year, month,
        qp: statsQP,
        ma: find(appliedMAs, year, "stats") || find(appliedMAs, year, "combined"),
        ms: find(appliedMSs, year, "stats") || find(appliedMSs, year, "combined"),
      });
    }

    const mechQP = find(appliedQPs, year, "mechanics");
    if (mechQP) {
      output.mechanics.push({
        year, month,
        qp: mechQP,
        ma: find(appliedMAs, year, "mechanics"),
        ms: find(appliedMSs, year, "mechanics"),
      });
    }
  }

  // ── Write output file ───────────────────────────────────────────────────────
  const js = `// Auto-generated by scripts/uploadPastPapers.js — do not edit manually
export const PAST_PAPERS = ${JSON.stringify(output, null, 2)};
`;
  fs.writeFileSync(OUTPUT_FILE, js);

  console.log(`\n✅  All done! URLs saved to src/data/pastPapers.js`);
  console.log(`   Pure:      ${output.pure.length} years`);
  console.log(`   Stats:     ${output.stats.length} years`);
  console.log(`   Mechanics: ${output.mechanics.length} years`);
  process.exit(0);
}

main().catch(err => { console.error("\n❌", err.message); process.exit(1); });
