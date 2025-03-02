# dbt Semantic Layer MCP Server

[![smithery badge](https://smithery.ai/badge/@TommyBez/dbt-semantic-layer-mcp)](https://smithery.ai/server/@TommyBez/dbt-semantic-layer-mcp)

A Model-Connector-Presenter (MCP) server for seamlessly querying the dbt Semantic Layer through Claude Desktop and other compatible AI assistants.

## What is the dbt Semantic Layer?

The [dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/dbt-sl) is a powerful feature that allows you to define metrics once in your dbt project and reuse them consistently across your entire data stack. It provides:

- A single source of truth for business metrics
- Consistent metric definitions across all data tools
- Simplified access to complex metrics for all team members

## About This Project

This MCP server acts as a bridge between AI assistants (like Claude) and the dbt Semantic Layer, enabling you to:

- Query metrics directly through natural language conversations
- Explore available metrics and their definitions
- Analyze data with dimensional breakdowns and filters
- Visualize results within your AI assistant interface

## Features

- 🔍 **Metric Discovery**: Browse and search available metrics in your dbt Semantic Layer
- 📊 **Query Creation**: Generate and execute semantic queries through natural language
- 🧮 **Data Analysis**: Filter, group, and order metrics for deeper insights
- 📈 **Result Visualization**: Display query results in an easy-to-understand format

## Prerequisites

- A dbt Cloud account with Semantic Layer enabled
- API access to your dbt Cloud instance
- Node.js (v14 or later)

## Installation

### Via Smithery (Recommended)

The easiest way to install is via [Smithery](https://smithery.ai/server/@TommyBez/dbt-semantic-layer-mcp):

```bash
npx -y @smithery/cli install @TommyBez/dbt-semantic-layer-mcp --client claude
```

## Usage

Once installed and configured, you can interact with the dbt Semantic Layer directly from Claude Desktop:

1. Ask about available metrics: "What metrics are available in my dbt Semantic Layer?"
2. Query specific metrics: "Show me monthly revenue for the last quarter grouped by product category"
3. Analyze trends: "What's the week-over-week growth in user signups?"

## Troubleshooting

If you encounter issues:

- Verify your API credentials are correct
- Ensure your dbt Cloud project has Semantic Layer enabled
- Check that your metrics are properly defined in your dbt project

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [dbt Labs](https://www.getdbt.com/) for creating the dbt Semantic Layer
- [Smithery](https://smithery.ai/) for the MCP server framework
