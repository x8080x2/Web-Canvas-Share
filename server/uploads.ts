import path from "path";

export function getUploadsDir() {
  const configured = process.env.UPLOADS_DIR;
  if (configured && configured.trim().length > 0) {
    return path.resolve(configured);
  }
  return path.resolve(process.cwd(), "uploads");
}

