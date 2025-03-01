const apiDocs = "dbt Cloud APIsSemantic Layer APIsGraphQL\nGraphQL\n\nGraphQL (GQL) is an open-source query language for APIs. It offers a more efficient and flexible approach compared to traditional RESTful APIs.\n\nWith GraphQL, users can request specific data using a single query, reducing the need for many server round trips. This improves performance and minimizes network overhead.\n\nGraphQL has several advantages, such as self-documenting, having a strong typing system, supporting versioning and evolution, enabling rapid development, and having a robust ecosystem. These features make GraphQL a powerful choice for APIs prioritizing flexibility, performance, and developer productivity.\n\ndbt Semantic Layer GraphQL API​\n\nThe dbt Semantic Layer GraphQL API allows you to explore and query metrics and dimensions. Due to its self-documenting nature, you can explore the calls conveniently through a schema explorer.\n\nThe schema explorer URLs vary depending on your deployment region. Use the following table to find the right link for your region:\n\nDeployment type\tSchema explorer URL\nNorth America multi-tenant\thttps://semantic-layer.cloud.getdbt.com/api/graphql\nEMEA multi-tenant\thttps://semantic-layer.emea.dbt.com/api/graphql\nAPAC multi-tenant\thttps://semantic-layer.au.dbt.com/api/graphql\nSingle tenant\thttps://semantic-layer.YOUR_ACCESS_URL/api/graphql\n\nReplace YOUR_ACCESS_URL with your specific account prefix followed by the appropriate Access URL for your region and plan.\nMulti-cell\thttps://YOUR_ACCOUNT_PREFIX.semantic-layer.REGION.dbt.com/api/graphql\n\nReplace YOUR_ACCOUNT_PREFIX with your specific account identifier and REGION with your location, which could be us1.dbt.com.\n\nExample\n\nIf your Single tenant access URL is ABC123.getdbt.com, your schema explorer URL will be https://semantic-layer.ABC123.getdbt.com/api/graphql.\n\ndbt Partners can use the Semantic Layer GraphQL API to build an integration with the dbt Semantic Layer.\n\nNote that the dbt Semantic Layer API doesn't support ref to call dbt objects. Instead, use the complete qualified table name. If you're using dbt macros at query time to calculate your metrics, you should move those calculations into your Semantic Layer metric definitions as code.\n\nRequirements to use the GraphQL API​\nA dbt Cloud project on dbt v1.6 or higher\nMetrics are defined and configured\nA dbt Cloud service token with \"Semantic Layer Only” and \"Metadata Only\" permissions\nYour dbt project is configured and connected to a data platform\nUsing the GraphQL API​\n\nIf you're a dbt user or partner with access to dbt Cloud and the dbt Semantic Layer, you can setup and test this API with data from your own instance by configuring the Semantic Layer and obtaining the right GQL connection parameters described in this document.\n\nRefer to Get started with the dbt Semantic Layer for more info.\n\nAuthentication​\n\nAuthentication uses a dbt Cloud service account tokens passed through a header as follows. To explore the schema, you can enter this information in the \"header\" section.\n\n{\"Authorization\": \"Bearer <SERVICE TOKEN>\"}\n\n\nEach GQL request also requires a dbt Cloud environmentId. The API uses both the service token in the header and environmentId for authentication.\n\nMetadata calls​\nFetch data platform dialect​\n\nIn some cases in your application, it may be useful to know the dialect or data platform that's internally used for the dbt Semantic Layer connection (such as if you are building where filters from a user interface rather than user-inputted SQL).\n\nThe GraphQL API has an easy way to fetch this with the following query:\n\n{\n  environmentInfo(environmentId: BigInt!) {\n    dialect\n  }\n}\n\nFetch available metrics​\nmetrics(environmentId: BigInt!): [Metric!]!\n\nFetch available dimensions for metrics​\ndimensions(\n  environmentId: BigInt!\n  metrics: [MetricInput!]!\n): [Dimension!]!\n\nFetch available granularities given metrics​\n\nNote: This call for queryableGranularities returns only queryable granularities for metric time - the primary time dimension across all metrics selected.\n\nqueryableGranularities(\n  environmentId: BigInt!\n  metrics: [MetricInput!]!\n): [TimeGranularity!]!\n\n\nYou can also get queryable granularities for all other dimensions using the dimensions call:\n\n{\n  dimensions(environmentId: BigInt!, metrics:[{name:\"order_total\"}]) {\n    name\n    queryableGranularities # --> [\"DAY\", \"WEEK\", \"MONTH\", \"QUARTER\", \"YEAR\"]\n  }\n}\n\n\nYou can also optionally access it from the metrics endpoint:\n\n{\n  metrics(environmentId: BigInt!) {\n    name\n    dimensions {\n      name\n      queryableGranularities\n    }\n  }\n}\n\nFetch measures​\n{\n  measures(environmentId: BigInt!, metrics: [{name:\"order_total\"}]) {\n    name\n    aggTimeDimension\n  }\n}\n\n\naggTimeDimension tells you the name of the dimension that maps to metric_time for a given measure. You can also query measures from the metrics endpoint, which allows you to see what dimensions map to metric_time for a given metric:\n\n{\n  metrics(environmentId: BigInt!) {\n    measures {\n      name\n      aggTimeDimension\n    }\n  }\n}\n\nFetch available metrics given a set of dimensions​\nmetricsForDimensions(\n  environmentId: BigInt!\n  dimensions: [GroupByInput!]!\n): [Metric!]!\n\nMetric types​\nMetric {\n  name: String!\n  description: String\n  type: MetricType!\n  typeParams: MetricTypeParams!\n  filter: WhereFilter\n  dimensions: [Dimension!]!\n  queryableGranularities: [TimeGranularity!]!\n}\n\nMetricType = [SIMPLE, RATIO, CUMULATIVE, DERIVED]\n\nMetric type parameters​\nMetricTypeParams {\n  measure: MetricInputMeasure\n  inputMeasures: [MetricInputMeasure!]!\n  numerator: MetricInput\n  denominator: MetricInput\n  expr: String\n  window: MetricTimeWindow\n  grainToDate: TimeGranularity\n  metrics: [MetricInput!]\n}\n\nDimension types​\nDimension {\n  name: String!\n  description: String\n  type: DimensionType!\n  typeParams: DimensionTypeParams\n  isPartition: Boolean!\n  expr: String\n  queryableGranularities: [TimeGranularity!]!\n}\n\nDimensionType = [CATEGORICAL, TIME]\n\nList saved queries​\n{\nsavedQueries(environmentId: 200532) {\n  name\n  description\n  label\n  queryParams {\n    metrics {\n      name\n    }\n    groupBy {\n      name\n      grain\n      datePart\n    }\n    where {\n      whereSqlTemplate\n    }\n  }\n}\n}\n\nQuerying​\n\nWhen querying for data, either a groupBy or a metrics selection is required. The following section provides examples of how to query metrics:\n\nCreate dimension values query\nCreate metric query\nFetch query result\nCreate dimension values query​\n\nmutation createDimensionValuesQuery(\n  environmentId: BigInt!\n  metrics: [MetricInput!]\n  groupBy: [GroupByInput!]!\n): CreateDimensionValuesQueryResult!\n\n\nCreate metric query​\ncreateQuery(\n  environmentId: BigInt!\n  metrics: [MetricInput!]!\n  groupBy: [GroupByInput!] = null\n  limit: Int = null\n  where: [WhereInput!] = null\n  order: [OrderByInput!] = null\n): CreateQueryResult\n\nMetricInput {\n  name: String!\n  alias: String!\n}\n\nGroupByInput {\n  name: String!\n  grain: TimeGranularity = null\n}\n\nWhereInput {\n  sql: String!\n}\n\nOrderByinput { # -- pass one and only one of metric or groupBy\n  metric: MetricInput = null\n  groupBy: GroupByInput = null\n  descending: Boolean! = false\n}\n\nFetch query result​\nquery(\n  environmentId: BigInt!\n  queryId: String!\n): QueryResult!\n\n\nThe GraphQL API uses a polling process for querying since queries can be long-running in some cases. It works by first creating a query with a mutation, `createQuery, which returns a query ID. This ID is then used to continuously check (poll) for the results and status of your query. The typical flow would look as follows:\n\nKick off a query\nmutation {\n  createQuery(\n    environmentId: 123456\n    metrics: [{name: \"order_total\"}]\n    groupBy: [{name: \"metric_time\"}]\n  ) {\n    queryId  # => Returns 'QueryID_12345678'\n  }\n}\n\nPoll for results\n{\n  query(environmentId: 123456, queryId: \"QueryID_12345678\") {\n    sql\n    status\n    error\n    totalPages\n    jsonResult\n    arrowResult\n  }\n}\n\nKeep querying 2. at an appropriate interval until status is FAILED or SUCCESSFUL\nOutput format and pagination​\nOutput format​\n\nBy default, the output is in Arrow format. You can switch to JSON format using the following parameter. However, due to performance limitations, we recommend using the JSON parameter for testing and validation. The JSON received is a base64 encoded string. To access it, you can decode it using a base64 decoder. The JSON is created from pandas, which means you can change it back to a dataframe using pandas.read_json(json, orient=\"table\"). Or you can work with the data directly using json[\"data\"], and find the table schema using json[\"schema\"][\"fields\"]. Alternatively, you can pass encoded:false to the jsonResult field to get a raw JSON string directly.\n\n{\n  query(environmentId: BigInt!, queryId: Int!, pageNum: Int! = 1) {\n    sql\n    status\n    error\n    totalPages\n    arrowResult\n    jsonResult(orient: PandasJsonOrient! = TABLE, encoded: Boolean! = true)\n  }\n}\n\n\nThe results default to the table but you can change it to any pandas supported value.\n\nPagination​\n\nBy default, we return 1024 rows per page. If your result set exceeds this, you need to increase the page number using the pageNum option.\n\nRun a Python query​\n\nThe arrowResult in the GraphQL query response is a byte dump, which isn't visually useful. You can convert this byte data into an Arrow table using any Arrow-supported language. Refer to the following Python example explaining how to query and decode the arrow result:\n\nimport base64\nimport pyarrow as pa\nimport time\n\nheaders = {\"Authorization\":\"Bearer <token>\"}\nquery_result_request = \"\"\"\n{\n  query(environmentId: 70, queryId: \"12345678\") {\n    sql\n    status\n    error\n    arrowResult\n  }\n}\n\"\"\"\n\nwhile True:\n  gql_response = requests.post(\n    \"https://semantic-layer.cloud.getdbt.com/api/graphql\",\n    json={\"query\": query_result_request},\n    headers=headers,\n  )\n  if gql_response.json()[\"data\"][\"status\"] in [\"FAILED\", \"SUCCESSFUL\"]:\n    break\n  # Set an appropriate interval between polling requests\n  time.sleep(1)\n\n\"\"\"\ngql_response.json() => \n{\n  \"data\": {\n    \"query\": {\n      \"sql\": \"SELECT\\n  ordered_at AS metric_time__day\\n  , SUM(order_total) AS order_total\\nFROM semantic_layer.orders orders_src_1\\nGROUP BY\\n  ordered_at\",\n      \"status\": \"SUCCESSFUL\",\n      \"error\": null,\n      \"arrowResult\": \"arrow-byte-data\"\n    }\n  }\n}\n\"\"\"\n\ndef to_arrow_table(byte_string: str) -> pa.Table:\n  \"\"\"Get a raw base64 string and convert to an Arrow Table.\"\"\"\n  with pa.ipc.open_stream(base64.b64decode(byte_string)) as reader:\n    return pa.Table.from_batches(reader, reader.schema)\n\n\narrow_table = to_arrow_table(gql_response.json()[\"data\"][\"query\"][\"arrowResult\"])\n\n# Perform whatever functionality is available, like convert to a pandas table.\nprint(arrow_table.to_pandas())\n\"\"\"\norder_total  ordered_at\n          3  2023-08-07\n        112  2023-08-08\n         12  2023-08-09\n       5123  2023-08-10\n\"\"\"\n\nAdditional create query examples​\n\nThe following section provides query examples for the GraphQL API, such as how to query metrics, dimensions, where filters, and more:\n\nQuery metric alias\nQuery with a time grain\nQuery multiple metrics and multiple dimensions\nQuery a categorical dimension on its own\nQuery with a where filter\nQuery with order\nQuery with limit\nQuery saved queries\nQuery with just compiling SQL\nQuery metric alias​\nmutation {\n  createQuery(\n    environmentId: \"123\"\n    metrics: [{name: \"metric_name\", alias: \"metric_alias\"}]\n  ) {\n    ...\n  }\n}\n\nQuery with a time grain​\nmutation {\n  createQuery(\n    environmentId: \"123\"\n    metrics: [{name: \"order_total\"}]\n    groupBy: [{name: \"metric_time\", grain: MONTH}] \n  ) {\n    queryId\n  }\n}\n\n\nNote that when using granularity in the query, the output of a time dimension with a time grain applied to it always takes the form of a dimension name appended with a double underscore and the granularity level - {time_dimension_name}__{DAY|WEEK|MONTH|QUARTER|YEAR}. Even if no granularity is specified, it will also always have a granularity appended to it and will default to the lowest available (usually daily for most data sources). It is encouraged to specify a granularity when using time dimensions so that there won't be any unexpected results with the output data.\n\nQuery multiple metrics and multiple dimensions​\nmutation {\n  createQuery(\n    environmentId: \"123\"\n    metrics: [{name: \"food_order_amount\"}, {name: \"order_gross_profit\"}]\n    groupBy: [{name: \"metric_time\", grain: MONTH}, {name: \"customer__customer_type\"}]\n  ) {\n    queryId\n  }\n}\n\nQuery a categorical dimension on its own​\nmutation {\n  createQuery(\n    environmentId: \"123\"\n    groupBy: [{name: \"customer__customer_type\"}]\n  ) {\n    queryId\n  }\n}\n\nQuery with a where filter​\n\nThe where filter takes a list argument (or a string for a single input). Depending on the object you are filtering, there are a couple of parameters:\n\nDimension() — Used for any categorical or time dimensions. For example, Dimension('metric_time').grain('week') or Dimension('customer__country').\n\nEntity() — Used for entities like primary and foreign keys, such as Entity('order_id').\n\nNote: If you prefer a where clause with a more explicit path, you can optionally use TimeDimension() to separate categorical dimensions from time ones. The TimeDimension input takes the time dimension and optionally the granularity level. TimeDimension('metric_time', 'month').\n\nmutation {\n  createQuery(\n    environmentId: \"123\"\n    metrics:[{name: \"order_total\"}]\n    groupBy:[{name: \"customer__customer_type\"}, {name: \"metric_time\", grain: month}]\n    where:[{sql: \"{{ Dimension('customer__customer_type') }} = 'new'\"}, {sql:\"{{ Dimension('metric_time').grain('month') }} > '2022-10-01'\"}]\n    ) {\n     queryId\n    }\n}\n\n\nFor both TimeDimension(), the grain is only required in the where filter if the aggregation time dimensions for the measures and metrics associated with the where filter have different grains.\n\nExample​\n\nFor example, consider this semantic model and metric configuration, which contains two metrics that are aggregated across different time grains. This example shows a single semantic model, but the same goes for metrics across more than one semantic model.\n\nsemantic_model:\n  name: my_model_source\n\ndefaults:\n  agg_time_dimension: created_month\n  measures:\n    - name: measure_0\n      agg: sum\n    - name: measure_1\n      agg: sum\n      agg_time_dimension: order_year\n  dimensions:\n    - name: created_month\n      type: time\n      type_params:\n        time_granularity: month\n    - name: order_year\n      type: time\n      type_params:\n        time_granularity: year\n\nmetrics:\n  - name: metric_0\n    description: A metric with a month grain.\n    type: simple\n    type_params:\n      measure: measure_0\n  - name: metric_1\n    description: A metric with a year grain.\n    type: simple\n    type_params:\n      measure: measure_1\n\n\nAssuming the user is querying metric_0 and metric_1 together, the following are valid or invalid filters:\n\nExample\n\t\nFilter\n\n✅\nValid filter\t\"{{ TimeDimension('metric_time', 'year') }} > '2020-01-01'\"\n❌\nInvalid filter\t\"{{ TimeDimension('metric_time') }} > '2020-01-01'\"\n\nMetrics in the query are defined based on measures with different grains.\n❌\nInvalid filter\t\"{{ TimeDimension('metric_time', 'month') }} > '2020-01-01'\"\n\nmetric_1 is not available at a month grain.\nMulti-hop joins​\n\nIn cases where you need to query across multiple related tables (multi-hop joins), use the entity_path argument to specify the path between related entities. The following are examples of how you can define these joins:\n\nIn this example, you're querying the location_name dimension but specifying that it should be joined using the order_id field.\n{{Dimension('location__location_name', entity_path=['order_id'])}}\n\nIn this example, the salesforce_account_owner dimension is joined to the region field, with the path going through salesforce_account.\n{{ Dimension('salesforce_account_owner__region',['salesforce_account']) }}\n\nQuery with order​\nmutation {\n  createQuery(\n    environmentId: \"123\"\n    metrics: [{name: \"order_total\"}]\n    groupBy: [{name: \"metric_time\", grain: MONTH}] \n    orderBy: [{metric: {name: \"order_total\"}}, {groupBy: {name: \"metric_time\", grain: MONTH}, descending:true}]\n  ) {\n    queryId\n  }\n}\n\nQuery with limit​\nmutation {\n  createQuery(\n    environmentId: \"123\"\n    metrics: [{name:\"food_order_amount\"}, {name: \"order_gross_profit\"}]\n    groupBy: [{name:\"metric_time\", grain: MONTH}, {name: \"customer__customer_type\"}]\n    limit: 10 \n  ) {\n    queryId\n  }\n}\n\nQuery saved queries​\n\nThis takes the same inputs as the createQuery mutation, but includes the field savedQuery. You can use this for frequently used queries.\n\nmutation {\n  createQuery(\n    environmentId: \"123\"\n    savedQuery: \"new_customer_orders\"\n  ) {\n    queryId\n  }\n}\n\nA NOTE ON QUERYING SAVED QUERIES\n\nWhen querying saved queries,you can use parameters such as where, limit, order, compile, and so on. However, keep in mind that you can't access metric or group_by parameters in this context. This is because they are predetermined and fixed parameters for saved queries, and you can't change them at query time. If you would like to query more metrics or dimensions, you can build the query using the standard format.\n\nQuery with just compiling SQL​\n\nThis takes the same inputs as the createQuery mutation.\n\nmutation {\n  compileSql(\n    environmentId: \"123\"\n    metrics: [{name:\"food_order_amount\"} {name:\"order_gross_profit\"}]\n    groupBy: [{name:\"metric_time\", grain: MONTH}, {name:\"customer__customer_type\"}]\n  ) {\n    sql\n  }\n}\n\nTags:Semantic LayerAPIs\nEdit this page\nLast updated on Feb 3, 2025"

export const encodedApiDocs = Buffer.from(apiDocs).toString('base64')