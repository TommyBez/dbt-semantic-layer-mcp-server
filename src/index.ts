import { LiteMCP } from "litemcp";
import { encodedApiDocs } from './docs'

const server = new LiteMCP('dbt-semantic-layer-mcp', '0.1.0')

if(!process.env.SEMANTIC_LAYER_API_KEY) {
  throw new Error('SEMANTIC_LAYER_API_KEY is not set')
}
if(!process.env.SEMANTIC_LAYER_URL) {
  throw new Error('SEMANTIC_LAYER_URL is not set')
}
if(!process.env.SEMANTIC_LAYER_ENVIRONMENT_ID) {
  throw new Error('SEMANTIC_LAYER_ENVIRONMENT_ID is not set')
}


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


  

  server.start({
    transportType: "sse",
    sse: {
      endpoint: "/sse",
      port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    },
  });