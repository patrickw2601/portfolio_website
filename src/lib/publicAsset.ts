/** Resolve a path under `/public` for both local dev and GitHub Pages `base`. */
export function publicAsset(relativePath: string): string {
  const trimmed = relativePath.replace(/^\/+/, '')
  return `${import.meta.env.BASE_URL}${trimmed}`
}
