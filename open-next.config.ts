import { defineCloudflareConfig } from "@opennextjs/cloudflare"

// No ISR on this site (no revalidate / generateStaticParams / unstable_cache),
// so no incremental cache bucket.
export default defineCloudflareConfig({})
