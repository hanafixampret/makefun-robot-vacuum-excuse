import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "That spot pays rent now. I don't evict tenants.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");
  const roundTrip = readFileSync(target, "utf8");
  if (roundTrip !== ENTRY) {
    throw new Error("round-trip mismatch");
  }
  if (ENTRY !== ENTRY.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (ENTRY.length < 1 || ENTRY.length > 140 || ENTRY.trim().length === 0) {
    throw new Error("entry fails the 1-140 character gate");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

main();
