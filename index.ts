import { LiteMCP } from "litemcp";
import { encodedApiDocs } from './docs/index.js'

const server = new LiteMCP('dbt-semantic-layer-mcp', '0.1.0')

server.addResource({
    uri: 'file:///docs.txt',
    name: 'documentation',
    description: 'Semantic Layer GraphQL API documentation. IMPORTANT: Read this prior to make any query',
    mimeType: 'application/octet-stream',
    load: async () => {
      return {
        blob: encodedApiDocs
      }
    }
  })