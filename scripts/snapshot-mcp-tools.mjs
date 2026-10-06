// Refreshes data/mcp-tools.json from each MCP server's own tools/list.
//
// Every server needs auth, so each source is opt-in:
//   - remote servers: set MCP_URL_<ID> to your personal MCP URL (token included,
//     however that server takes it), plus MCP_TOKEN_<ID> for bearer-token servers.
//   - local stdio servers: spawned from the sibling repo when it's checked out.
// Anything unset or unreachable keeps its last snapshot, so this never fails a build.

import { readFile, writeFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client"
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio"

const SNAPSHOT = new URL("../data/mcp-tools.json", import.meta.url)
const SIBLING = (path) => new URL(`../../${path}`, import.meta.url).pathname

const SOURCES = {
  controlledchaos: { remote: "CONTROLLEDCHAOS" },
  chaospatch: { remote: "CHAOSPATCH" },
  kindling: { remote: "KINDLING" },
  tangle: { remote: "TANGLE" },
  threadnotes: { remote: "THREADNOTES" },
  "loose-change": { remote: "LOOSE_CHANGE" },
  folio: { remote: "FOLIO" },
  "personal-context": { remote: "PERSONAL_CONTEXT" },
  libralex: { remote: "LIBRALEX" },
  scribecat: { remote: "SCRIBECAT" },
  vertex: { remote: "VERTEX" },
  "chaoslingua-lite": { remote: "CHAOSLINGUA_LITE" },
  chaoslimba: {
    // Its db module exits without a connection string, but the pool never connects
    // for tools/list, so a placeholder is enough.
    stdio: {
      command: "node",
      args: [SIBLING("chaoslimba-mcp-server/dist/index.js")],
      env: { CHAOSLIMBA_DATABASE_URL: "postgres://snapshot@localhost/unused" },
    },
  },
}

const transportFor = (source) => {
  if (source.stdio) {
    if (!existsSync(source.stdio.args[0])) return { skip: "repo not built here" }
    return {
      transport: new StdioClientTransport({
        ...source.stdio,
        env: { PATH: process.env.PATH ?? "", ...source.stdio.env },
        stderr: "ignore",
      }),
    }
  }
  const url = process.env[`MCP_URL_${source.remote}`]
  if (!url) return { skip: `MCP_URL_${source.remote} not set` }
  const token = process.env[`MCP_TOKEN_${source.remote}`]
  return {
    transport: new StreamableHTTPClientTransport(new URL(url), {
      requestInit: token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
    }),
  }
}

const listTools = async (transport) => {
  const client = new Client({ name: "adhdesigns-mcp-snapshot", version: "1.0.0" })
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("timed out after 20s")), 20_000))
  try {
    await Promise.race([client.connect(transport), timeout])
    const { tools } = await Promise.race([client.listTools(), timeout])
    return tools.map((t) => ({ name: t.name, description: (t.description ?? "").trim() }))
  } finally {
    await client.close().catch(() => {})
  }
}

const main = async () => {
  const snapshot = JSON.parse(await readFile(SNAPSHOT, "utf8"))
  // Local calendar date (en-CA formats as YYYY-MM-DD).
  const today = new Date().toLocaleDateString("en-CA")
  let refreshed = 0
  let changed = 0

  for (const [id, source] of Object.entries(SOURCES)) {
    const { transport, skip } = transportFor(source)
    if (skip) {
      console.log(`· ${id}: kept snapshot (${skip})`)
      continue
    }
    try {
      const tools = await listTools(transport)
      if (tools.length === 0) throw new Error("server returned no tools")
      refreshed++
      // Only touch the file when a server's tools actually changed, so builds don't dirty it.
      if (JSON.stringify(snapshot[id]?.tools) !== JSON.stringify(tools)) {
        snapshot[id] = { capturedAt: today, tools }
        changed++
      }
      console.log(`✓ ${id}: ${tools.length} tools`)
    } catch (err) {
      console.warn(`! ${id}: kept snapshot (${err instanceof Error ? err.message : String(err)})`)
    }
  }

  if (changed > 0) await writeFile(SNAPSHOT, `${JSON.stringify(snapshot, null, 2)}\n`)
  console.log(`MCP snapshot: ${refreshed} checked live (${changed} changed), ${Object.keys(SOURCES).length - refreshed} kept.`)
}

main().catch((err) => {
  console.warn(`MCP snapshot skipped: ${err instanceof Error ? err.message : String(err)}`)
})
