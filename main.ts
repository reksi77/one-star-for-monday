// One Star for Monday — entry program.
//
// Writes exactly one chosen one-star review of Monday, written as if
// Monday were a restaurant, to /output/entry.txt. The text is a fixed
// string: no randomness, no clock, no network, so every run produces
// byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";

// The chosen review (v2, revised): v1 ended flat ("I did not.") and never
// said the rating out loud, so the review framing was weak. v2 opens with
// the rating itself, keeps the same scene — table 4, Saturday reheated,
// billed as fresh, the server's "Enjoy your week" — and drops a word.
const ENTRY =
  "One star. Monday sat me at table 4, served Saturday reheated, billed it as fresh, and the waiter said, 'Enjoy your week.'";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 180 characters,
// at most 25 words, not only white space, and a single line. Fail loudly
// here instead of shipping an entry the scorer would refuse.
function validateEntry(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 180) {
    throw new Error(`entry must be 1-180 characters, got ${chars}`);
  }
  const words = text.trim().split(/\s+/).length;
  if (words > 25) {
    throw new Error(`entry must be at most 25 words, got ${words}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
validateEntry(ENTRY);
mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/entry.txt`, ENTRY, "utf8");
