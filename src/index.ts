import { LiteMCP } from "litemcp";
import { encodedApiDocs, apiDocs } from './docs'
import { getDbtClient } from "./lib/dbt/client";
import { z } from "zod";

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

const dbtClient = getDbtClient()


  server.addTool({
    name: 'get_documentation',
    description: 'Get help about the semantic layer API. EVERY TIME you get an error, invoke this tool to get more information about how to use the semantic layer.',
    parameters: z.object({}),
    execute: async () => {
      return {
        content: [{ type: "text", text: apiDocs }],
        isError: false,
      };
    }
  })

  server.addTool({
    name: 'fetch_metrics',
    description: 'Fetches metrics from the semantic layer. ' +
      'Use this to get a list of metrics available in the semantic layer with their description and dimensions. ' +
      'Invoke this tool prior to creating a query to get a list of metrics to use in the query.',
      parameters: z.object({}),
    execute: async () => {
      const results = await dbtClient.fetchMetrics();
      return {
        content: [{ type: "text", text: JSON.stringify(results) }],
        isError: false,
      };
    }
  })
  
  server.addTool({
    name: 'create_query',
    description: 'Creates a query to the semantic layer. ' +
      'Use this tool to create a query to the semantic layer. ' +
      'Returns the query id which can be used to fetch the results of the query.',
    parameters: z.object({
      metrics: z.array(z.object({ name: z.string() })),
      groupBy: z.array(z.object({ name: z.string() })),
      where: z.array(z.object({ sql: z.string() })),
      limit: z.number(),
      orderBy: z.array(z.object({
        descending: z.boolean(),
        groupBy: z.object({ name: z.string() }),
        metric: z.object({ name: z.string() }),
      })),
    }),
    execute: async (args) => {
      const results = await dbtClient.createQuery(args);
      return {
        content: [{ type: "text", text: JSON.stringify(results) }],
        isError: false,
      };
    }
  })
  
  server.addTool({
    name: 'fetch_query_result',
    description: 'Fetches the results of a query from the semantic layer. You have to poll this tool until the query status is SUCCESSFUL.',
    parameters: z.object({
      queryId: z.string(),
    }),
    execute: async (args) => {
      const results = await dbtClient.getQueryResult(args.queryId);
      return {
        content: [{ type: "text", text: JSON.stringify(results) }],
        isError: results.error ? true : false,
      };
    }
  })
  

  server.start({
    transportType: "stdio"
  });