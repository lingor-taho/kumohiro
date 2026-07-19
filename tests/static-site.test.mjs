import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("build emits the static application shell and assets", async () => {
  const html = await readFile(new URL("dist/index.html", root), "utf8");
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /KOWA TRADING/);
  assert.match(html, /\/assets\/[^\"]+\.js/);
  assert.match(html, /\/assets\/[^\"]+\.css/);
});

test("build includes the moon textures and page backgrounds", async () => {
  const backgrounds = await readdir(new URL("dist/backgrounds/", root));
  for (const filename of [
    "nasa-moon-color-4k.webp",
    "nasa-moon-height.webp",
    "about.png",
    "projects.png",
    "contact.png",
  ]) {
    assert.ok(backgrounds.includes(filename), `${filename} is missing`);
    await access(new URL(`dist/backgrounds/${filename}`, root));
  }
});
