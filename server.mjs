import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const port = Number.parseInt(process.env.PORT ?? "14100", 10);
const host = process.env.HOST ?? "0.0.0.0";
const root = path.resolve("dist");
const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

async function fileInfo(filePath) {
  try {
    const info = await stat(filePath);
    return info.isFile() ? info : null;
  } catch {
    return null;
  }
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    const pathname = decodeURIComponent(url.pathname).replaceAll("\\", "/");
    const requestedPath = path.resolve(root, `.${pathname}`);
    const insideRoot = requestedPath === root || requestedPath.startsWith(`${root}${path.sep}`);

    if (!insideRoot) {
      response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Forbidden");
      return;
    }

    let filePath = pathname === "/" ? path.join(root, "index.html") : requestedPath;
    let info = await fileInfo(filePath);

    if (!info) {
      const acceptsHtml = (request.headers.accept ?? "").includes("text/html");
      if (!acceptsHtml && path.extname(pathname)) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("Not Found");
        return;
      }
      filePath = path.join(root, "index.html");
      info = await fileInfo(filePath);
    }

    if (!info) throw new Error("Production build not found. Run npm run build first.");

    const extension = path.extname(filePath).toLowerCase();
    const isHashedAsset = pathname.startsWith("/assets/");
    response.writeHead(200, {
      "Content-Type": mimeTypes.get(extension) ?? "application/octet-stream",
      "Content-Length": info.size,
      "Cache-Control": isHashedAsset
        ? "public, max-age=31536000, immutable"
        : extension === ".html"
          ? "no-cache"
          : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    });

    if (request.method === "HEAD") response.end();
    else createReadStream(filePath).pipe(response);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Internal Server Error");
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the old website window first.`);
  } else {
    console.error(error);
  }
  process.exit(1);
});

server.listen(port, host, () => {
  console.log(`KOWA TRADING production website is running at http://localhost:${port}/`);
  console.log("Keep this window open. Press Ctrl+C to stop the website.");
});
