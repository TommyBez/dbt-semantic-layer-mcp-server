import { LiteMCP } from "litemcp";
import { getDbtClient } from "./lib/dbt/client";
import { z } from "zod";

const server = new LiteMCP('dbt-semantic-layer-mcp', '0.1.2')

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
    description: 'Get a comprehensive user guide on how to use the dbt Semantic Layer MCP Server tools. Use this tool to understand the available tools, their parameters, and see workflow examples.',
    parameters: z.object({}),
    execute: async () => {
      return {
        content: [{ type: "text", text: `# Guide: Using the dbt Semantic Layer MCP Server Tools

This guide explains how to use the dbt Semantic Layer MCP Server, which exposes the dbt Semantic Layer GraphQL API as a set of convenient tools for MCP clients.

## Available Tools

The dbt Semantic Layer MCP Server exposes the following tools:

### 1. \`get_documentation\`

This tool provides comprehensive documentation about the dbt Semantic Layer MCP Server.

**When to use**: Use this tool whenever you need help understanding the API or when you encounter errors.

**Example usage**:
\`\`\`
get_documentation
\`\`\`

**Returns**: Detailed documentation about the dbt Semantic Layer MCP Server, including available tools, their parameters, and workflow examples.

### 2. \`fetch_metrics\`

This tool retrieves all available metrics from your dbt Semantic Layer.

**When to use**: Use this tool before creating a query to understand what metrics are available and their associated dimensions.

**Example usage**:
\`\`\`
fetch_metrics
\`\`\`

**Returns**: A JSON object containing all available metrics, their descriptions, dimensions, and measures.

### 3. \`create_query\`

This tool creates a query to the dbt Semantic Layer.

**When to use**: Use this tool to query metrics and dimensions from your dbt Semantic Layer.

**Parameters**:
- \`metrics\`: An array of metric objects, each with a \`name\` property
- \`groupBy\`: An array of dimension objects, each with a \`name\` property
- \`where\`: An array of filter objects, each with an \`sql\` property
- \`limit\`: A number to limit the results
- \`orderBy\`: An array of ordering objects, each with \`descending\`, \`groupBy\`, and \`metric\` properties

**Example usage**:
\`\`\`
create_query({
  metrics: [{ name: "order_total" }],
  groupBy: [{ name: "metric_time" }],
  where: [{ sql: "{{ Dimension('metric_time') }} > '2023-01-01'" }],
  limit: 100,
  orderBy: [{ 
    descending: true, 
    metric: { name: "order_total" } 
  }]
})
\`\`\`

**Returns**: A query ID that can be used to fetch the results.

### 4. \`fetch_query_result\`

This tool fetches the results of a query from the dbt Semantic Layer.

**When to use**: Use this tool after creating a query to retrieve the results. You need to poll this tool until the query status is \`SUCCESSFUL\`.

**Parameters**:
- \`queryId\`: The ID of the query to fetch results for

**Example usage**:
\`\`\`
fetch_query_result({ queryId: "QueryID_12345678" })
\`\`\`

**Returns**: A JSON object containing the query results, status, and any errors.

## Workflow Examples

### Basic Workflow: Querying a Single Metric

1. **Fetch available metrics**:
   \`\`\`
   fetch_metrics
   \`\`\`

2. **Create a query for a specific metric**:
   \`\`\`
   create_query({
     metrics: [{ name: "order_total" }],
     groupBy: [{ name: "metric_time", grain: "MONTH" }],
     limit: 10
   })
   \`\`\`

3. **Fetch the query results** (using the query ID returned from the previous step):
   \`\`\`
   fetch_query_result({ queryId: "QueryID_12345678" })
   \`\`\`

4. **Poll for results** until the status is \`SUCCESSFUL\`:
   \`\`\`
   fetch_query_result({ queryId: "QueryID_12345678" })
   \`\`\`

### Advanced Workflow: Multiple Metrics with Filters and Ordering

1. **Fetch available metrics**:
   \`\`\`
   fetch_metrics
   \`\`\`

2. **Create a complex query**:
   \`\`\`
   create_query({
     metrics: [
       { name: "order_total" },
       { name: "customer_count" }
     ],
     groupBy: [
       { name: "metric_time", grain: "MONTH" },
       { name: "customer__customer_type" }
     ],
     where: [
       { sql: "{{ Dimension('customer__customer_type') }} = 'new'" },
       { sql: "{{ Dimension('metric_time') }} > '2023-01-01'" }
     ],
     limit: 100,
     orderBy: [
       { 
         descending: true, 
         metric: { name: "order_total" } 
       }
     ]
   })
   \`\`\`

3. **Fetch and poll for results**:
   \`\`\`
   fetch_query_result({ queryId: "QueryID_12345678" })
   \`\`\`

## Best Practices

1. **Always fetch metrics first**: Before creating a query, use \`fetch_metrics\` to understand what metrics and dimensions are available.

2. **Use appropriate time grains**: When querying time dimensions, always specify a grain (e.g., \`DAY\`, \`WEEK\`, \`MONTH\`, \`QUARTER\`, \`YEAR\`).

3. **Poll for results**: The dbt Semantic Layer API is asynchronous. After creating a query, you need to poll for results until the status is \`SUCCESSFUL\`.

4. **Handle errors**: Always check for errors in the query results. If you encounter an error, use \`get_documentation\` to understand how to fix it.

5. **Use filters efficiently**: Use the \`where\` parameter to filter your results and reduce the amount of data processed.

## Troubleshooting

If you encounter errors:

1. **Verify metric and dimension names**: Make sure the metric and dimension names in your queries match exactly what's returned by \`fetch_metrics\`.

2. **Check your SQL syntax**: When using filters, ensure your SQL syntax is correct.

3. **Consult the documentation**: Use \`get_documentation\` to understand the API better.

4. **Check query status**: If a query is taking a long time, check its status with \`fetch_query_result\`. It might be still processing or have failed.

## Conclusion

The dbt Semantic Layer MCP Server provides a convenient way to interact with the dbt Semantic Layer GraphQL API through MCP clients. By following this guide, you should be able to effectively query your metrics and dimensions, enabling powerful data analysis directly from your AI assistant.` }],

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
      server.logger.info('results', { results})
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