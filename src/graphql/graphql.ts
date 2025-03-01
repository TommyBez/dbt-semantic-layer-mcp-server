/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** BigInt scalar type */
  BigInt: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](https://ecma-international.org/wp-content/uploads/ECMA-404_2nd_edition_december_2017.pdf). */
  JSON: { input: any; output: any; }
};

export enum AggregationType {
  Average = 'AVERAGE',
  Count = 'COUNT',
  CountDistinct = 'COUNT_DISTINCT',
  Max = 'MAX',
  Median = 'MEDIAN',
  Min = 'MIN',
  Percentile = 'PERCENTILE',
  Sum = 'SUM',
  SumBoolean = 'SUM_BOOLEAN'
}

export type CompileSqlResult = {
  __typename?: 'CompileSqlResult';
  queryId: Scalars['String']['output'];
  sql: Scalars['String']['output'];
};

export type CreateDimensionValuesQueryResult = {
  __typename?: 'CreateDimensionValuesQueryResult';
  queryId: Scalars['String']['output'];
};

export type CreateQueryResult = {
  __typename?: 'CreateQueryResult';
  queryId: Scalars['String']['output'];
};

export enum DatePart {
  Day = 'DAY',
  Dow = 'DOW',
  Doy = 'DOY',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Year = 'YEAR'
}

export type Dimension = {
  __typename?: 'Dimension';
  config?: Maybe<DimensionConfig>;
  description?: Maybe<Scalars['String']['output']>;
  expr?: Maybe<Scalars['String']['output']>;
  isPartition: Scalars['Boolean']['output'];
  label?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Metadata>;
  name: Scalars['String']['output'];
  qualifiedName: Scalars['String']['output'];
  queryableGranularities: Array<TimeGranularity>;
  queryableTimeGranularities: Array<Scalars['String']['output']>;
  type: DimensionType;
  typeParams?: Maybe<DimensionTypeParams>;
};

export type DimensionConfig = {
  __typename?: 'DimensionConfig';
  meta: Scalars['JSON']['output'];
};

export enum DimensionType {
  Categorical = 'CATEGORICAL',
  Time = 'TIME'
}

export type DimensionTypeParams = {
  __typename?: 'DimensionTypeParams';
  timeGranularity: TimeGranularity;
  validityParams?: Maybe<DimensionValidityParams>;
};

export type DimensionValidityParams = {
  __typename?: 'DimensionValidityParams';
  isEnd: Scalars['Boolean']['output'];
  isStart: Scalars['Boolean']['output'];
};

export type DimensionValuesQueryParams = QueryParams & {
  __typename?: 'DimensionValuesQueryParams';
  groupBy: Array<GroupByInputSpec>;
  metrics?: Maybe<Array<MetricInputSpec>>;
  type: QueryType;
};

export type Entity = {
  __typename?: 'Entity';
  config?: Maybe<EntityConfig>;
  description?: Maybe<Scalars['String']['output']>;
  expr?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role?: Maybe<Scalars['String']['output']>;
  type: EntityType;
};

export type EntityConfig = {
  __typename?: 'EntityConfig';
  meta: Scalars['JSON']['output'];
};

export enum EntityType {
  Foreign = 'FOREIGN',
  Natural = 'NATURAL',
  Primary = 'PRIMARY',
  Unique = 'UNIQUE'
}

export type EnvironmentInfo = {
  __typename?: 'EnvironmentInfo';
  dialect: SqlEngine;
};

export type Export = {
  __typename?: 'Export';
  config: ExportConfig;
  name: Scalars['String']['output'];
};

export type ExportConfig = {
  __typename?: 'ExportConfig';
  alias?: Maybe<Scalars['String']['output']>;
  exportAs: ExportDestinationType;
  schema?: Maybe<Scalars['String']['output']>;
};

export enum ExportDestinationType {
  Table = 'TABLE',
  View = 'VIEW'
}

export type FileSlice = {
  __typename?: 'FileSlice';
  content: Scalars['String']['output'];
  endLineNumber: Scalars['Int']['output'];
  filename: Scalars['String']['output'];
  startLineNumber: Scalars['Int']['output'];
};

export type GroupByInput = {
  datePart?: InputMaybe<DatePart>;
  grain?: InputMaybe<TimeGranularity>;
  name: Scalars['String']['input'];
  timeGranularity?: InputMaybe<Scalars['String']['input']>;
};

export type GroupByInputSpec = {
  __typename?: 'GroupByInputSpec';
  datePart?: Maybe<DatePart>;
  grain?: Maybe<TimeGranularity>;
  name: Scalars['String']['output'];
  timeGranularity?: Maybe<Scalars['String']['output']>;
};

export type InputMetric = {
  __typename?: 'InputMetric';
  alias?: Maybe<Scalars['String']['output']>;
  filter?: Maybe<WhereFilter>;
  name: Scalars['String']['output'];
  offsetToGrain?: Maybe<TimeGranularity>;
  offsetToGrainGranularity?: Maybe<Scalars['String']['output']>;
  offsetWindow?: Maybe<MetricTimeWindow>;
};

export type InvalidateCacheResult = {
  __typename?: 'InvalidateCacheResult';
  description: Scalars['String']['output'];
  invalidationCount: Scalars['Int']['output'];
};

export type ManifestValidationResult = {
  __typename?: 'ManifestValidationResult';
  errors: Array<Scalars['String']['output']>;
  steps: Array<ManifestValidationStep>;
};

export type ManifestValidationStep = {
  __typename?: 'ManifestValidationStep';
  description: Scalars['String']['output'];
  error?: Maybe<Scalars['String']['output']>;
  sql: Scalars['String']['output'];
  warehouseError?: Maybe<Scalars['String']['output']>;
};

export type Measure = {
  __typename?: 'Measure';
  agg: AggregationType;
  aggTimeDimension?: Maybe<Scalars['String']['output']>;
  config?: Maybe<MeasureConfig>;
  expr: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type MeasureConfig = {
  __typename?: 'MeasureConfig';
  meta: Scalars['JSON']['output'];
};

export type Metadata = {
  __typename?: 'Metadata';
  fileSlice: FileSlice;
  repoFilePath: Scalars['String']['output'];
};

export type Metric = {
  __typename?: 'Metric';
  config?: Maybe<MetricConfig>;
  description?: Maybe<Scalars['String']['output']>;
  dimensions: Array<Dimension>;
  entities: Array<Entity>;
  filter?: Maybe<WhereFilter>;
  label?: Maybe<Scalars['String']['output']>;
  measures: Array<Measure>;
  metadata?: Maybe<Metadata>;
  name: Scalars['String']['output'];
  queryableGranularities: Array<TimeGranularity>;
  queryableTimeGranularities: Array<Scalars['String']['output']>;
  requiresMetricTime: Scalars['Boolean']['output'];
  type: MetricType;
  typeParams: MetricTypeParams;
};

export type MetricConfig = {
  __typename?: 'MetricConfig';
  meta: Scalars['JSON']['output'];
};

export type MetricInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type MetricInputMeasure = {
  __typename?: 'MetricInputMeasure';
  alias?: Maybe<Scalars['String']['output']>;
  filter?: Maybe<WhereFilter>;
  name: Scalars['String']['output'];
};

export type MetricInputSpec = {
  __typename?: 'MetricInputSpec';
  alias?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type MetricQueryParams = QueryParams & {
  __typename?: 'MetricQueryParams';
  groupBy?: Maybe<Array<GroupByInputSpec>>;
  limit?: Maybe<Scalars['Int']['output']>;
  metrics: Array<MetricInputSpec>;
  orderBy?: Maybe<Array<OrderByInputSpec>>;
  readCache: Scalars['Boolean']['output'];
  savedQuery?: Maybe<Scalars['String']['output']>;
  type: QueryType;
  where?: Maybe<Array<WhereInputSpec>>;
};

export type MetricTimeWindow = {
  __typename?: 'MetricTimeWindow';
  count: Scalars['Int']['output'];
  granularity?: Maybe<TimeGranularity>;
  timeGranularity: Scalars['String']['output'];
};

export enum MetricType {
  Conversion = 'CONVERSION',
  Cumulative = 'CUMULATIVE',
  Derived = 'DERIVED',
  Ratio = 'RATIO',
  Simple = 'SIMPLE'
}

export type MetricTypeParams = {
  __typename?: 'MetricTypeParams';
  denominator?: Maybe<InputMetric>;
  expr?: Maybe<Scalars['String']['output']>;
  grainToDate?: Maybe<TimeGranularity>;
  inputMeasures: Array<MetricInputMeasure>;
  measure?: Maybe<MetricInputMeasure>;
  metrics?: Maybe<Array<InputMetric>>;
  numerator?: Maybe<InputMetric>;
  window?: Maybe<MetricTimeWindow>;
};

export type Mutation = {
  __typename?: 'Mutation';
  compileDimensionValuesSql: CompileSqlResult;
  compileSql: CompileSqlResult;
  createDimensionValuesQuery: CreateDimensionValuesQueryResult;
  /** Create a query and get the corresponding ID. That ID can be used to poll for results using the `query` query. */
  createQuery: CreateQueryResult;
  /** Create a query and wait for results. Using this mutation is not recommended unless you are certain the query will execute quickly, since you might run into timeout errors. Instead, try using the `createQuery` mutation and polling for the results using the `query` query. */
  createSynchronousQuery: QueryResult;
  invalidateCache: InvalidateCacheResult;
};


export type MutationCompileDimensionValuesSqlArgs = {
  environmentId: Scalars['BigInt']['input'];
  groupBy: Array<GroupByInput>;
  metrics?: InputMaybe<Array<MetricInput>>;
};


export type MutationCompileSqlArgs = {
  environmentId: Scalars['BigInt']['input'];
  groupBy?: InputMaybe<Array<GroupByInput>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  metrics?: InputMaybe<Array<MetricInput>>;
  orderBy?: InputMaybe<Array<OrderByInput>>;
  readCache?: InputMaybe<Scalars['Boolean']['input']>;
  savedQuery?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<WhereInput>>;
};


export type MutationCreateDimensionValuesQueryArgs = {
  environmentId: Scalars['BigInt']['input'];
  groupBy: Array<GroupByInput>;
  metrics?: InputMaybe<Array<MetricInput>>;
};


export type MutationCreateQueryArgs = {
  environmentId: Scalars['BigInt']['input'];
  groupBy?: InputMaybe<Array<GroupByInput>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  metrics?: InputMaybe<Array<MetricInput>>;
  orderBy?: InputMaybe<Array<OrderByInput>>;
  readCache?: InputMaybe<Scalars['Boolean']['input']>;
  savedQuery?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<WhereInput>>;
};


export type MutationCreateSynchronousQueryArgs = {
  environmentId: Scalars['BigInt']['input'];
  groupBy?: InputMaybe<Array<GroupByInput>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  metrics?: InputMaybe<Array<MetricInput>>;
  orderBy?: InputMaybe<Array<OrderByInput>>;
  pageNum?: Scalars['Int']['input'];
  readCache?: InputMaybe<Scalars['Boolean']['input']>;
  savedQuery?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<WhereInput>>;
};


export type MutationInvalidateCacheArgs = {
  environmentId: Scalars['BigInt']['input'];
};

export type OrderByInput = {
  descending?: Scalars['Boolean']['input'];
  groupBy?: InputMaybe<GroupByInput>;
  metric?: InputMaybe<MetricInput>;
};

export type OrderByInputSpec = {
  __typename?: 'OrderByInputSpec';
  descending: Scalars['Boolean']['output'];
  groupBy?: Maybe<GroupByInputSpec>;
  metric?: Maybe<MetricInputSpec>;
};

export enum PandasJsonOrient {
  Columns = 'COLUMNS',
  Index = 'INDEX',
  Records = 'RECORDS',
  Split = 'SPLIT',
  Table = 'TABLE',
  Values = 'VALUES'
}

export type Query = {
  __typename?: 'Query';
  dimensions: Array<Dimension>;
  entities: Array<Entity>;
  environmentInfo: EnvironmentInfo;
  measures: Array<Measure>;
  metrics: Array<Metric>;
  metricsForDimensions: Array<Metric>;
  query: QueryResult;
  queryableGranularities: Array<TimeGranularity>;
  queryableTimeGranularities: Array<Scalars['String']['output']>;
  savedQueries: Array<SavedQuery>;
};


export type QueryDimensionsArgs = {
  environmentId: Scalars['BigInt']['input'];
  metrics: Array<MetricInput>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEntitiesArgs = {
  environmentId: Scalars['BigInt']['input'];
  metrics: Array<MetricInput>;
};


export type QueryEnvironmentInfoArgs = {
  environmentId: Scalars['BigInt']['input'];
};


export type QueryMeasuresArgs = {
  environmentId: Scalars['BigInt']['input'];
  metrics: Array<MetricInput>;
};


export type QueryMetricsArgs = {
  environmentId: Scalars['BigInt']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMetricsForDimensionsArgs = {
  dimensions: Array<GroupByInput>;
  environmentId: Scalars['BigInt']['input'];
};


export type QueryQueryArgs = {
  environmentId: Scalars['BigInt']['input'];
  pageNum?: Scalars['Int']['input'];
  queryId: Scalars['String']['input'];
};


export type QueryQueryableGranularitiesArgs = {
  environmentId: Scalars['BigInt']['input'];
  metrics: Array<MetricInput>;
};


export type QueryQueryableTimeGranularitiesArgs = {
  environmentId: Scalars['BigInt']['input'];
  metrics: Array<MetricInput>;
};


export type QuerySavedQueriesArgs = {
  environmentId: Scalars['BigInt']['input'];
};

export type QueryParams = {
  type: QueryType;
};

export type QueryResult = {
  __typename?: 'QueryResult';
  arrowResult?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  errorType?: Maybe<Scalars['String']['output']>;
  jsonResult?: Maybe<Scalars['String']['output']>;
  manifestValidationResult?: Maybe<ManifestValidationResult>;
  params?: Maybe<QueryParams>;
  queryId: Scalars['String']['output'];
  sql?: Maybe<Scalars['String']['output']>;
  status: QueryStatus;
  totalPages?: Maybe<Scalars['Int']['output']>;
};


export type QueryResultJsonResultArgs = {
  encoded?: Scalars['Boolean']['input'];
  orient?: PandasJsonOrient;
};

export enum QueryStatus {
  Compiled = 'COMPILED',
  Failed = 'FAILED',
  LogOnly = 'LOG_ONLY',
  Pending = 'PENDING',
  Running = 'RUNNING',
  Successful = 'SUCCESSFUL'
}

export enum QueryType {
  DimensionValues = 'DIMENSION_VALUES',
  Metric = 'METRIC'
}

export type SavedQuery = {
  __typename?: 'SavedQuery';
  description?: Maybe<Scalars['String']['output']>;
  exports: Array<Export>;
  label?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Metadata>;
  name: Scalars['String']['output'];
  queryParams: SavedQueryQueryParams;
};

export type SavedQueryGroupByParam = {
  __typename?: 'SavedQueryGroupByParam';
  datePart?: Maybe<DatePart>;
  grain?: Maybe<TimeGranularity>;
  name: Scalars['String']['output'];
  timeGranularity?: Maybe<Scalars['String']['output']>;
};

export type SavedQueryMetricParam = {
  __typename?: 'SavedQueryMetricParam';
  name: Scalars['String']['output'];
};

export type SavedQueryQueryParams = {
  __typename?: 'SavedQueryQueryParams';
  groupBy: Array<SavedQueryGroupByParam>;
  metrics: Array<SavedQueryMetricParam>;
  where?: Maybe<WhereFilter>;
};

export enum SqlEngine {
  Bigquery = 'BIGQUERY',
  Databricks = 'DATABRICKS',
  Duckdb = 'DUCKDB',
  Postgres = 'POSTGRES',
  Redshift = 'REDSHIFT',
  Snowflake = 'SNOWFLAKE',
  Trino = 'TRINO'
}

export enum TimeGranularity {
  Day = 'DAY',
  Hour = 'HOUR',
  Microsecond = 'MICROSECOND',
  Millisecond = 'MILLISECOND',
  Minute = 'MINUTE',
  Month = 'MONTH',
  Nanosecond = 'NANOSECOND',
  Quarter = 'QUARTER',
  Second = 'SECOND',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type WhereFilter = {
  __typename?: 'WhereFilter';
  whereSqlTemplate: Scalars['String']['output'];
};

export type WhereInput = {
  sql: Scalars['String']['input'];
};

export type WhereInputSpec = {
  __typename?: 'WhereInputSpec';
  sql: Scalars['String']['output'];
};

export type CreateQueryMutationVariables = Exact<{
  environmentId: Scalars['BigInt']['input'];
  groupBy?: InputMaybe<Array<GroupByInput> | GroupByInput>;
  metrics?: InputMaybe<Array<MetricInput> | MetricInput>;
  orderBy?: InputMaybe<Array<OrderByInput> | OrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  readCache?: InputMaybe<Scalars['Boolean']['input']>;
  savedQuery?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<WhereInput> | WhereInput>;
}>;


export type CreateQueryMutation = { __typename?: 'Mutation', createQuery: { __typename?: 'CreateQueryResult', queryId: string } };

export type GetQueryResultQueryVariables = Exact<{
  environmentId: Scalars['BigInt']['input'];
  queryId: Scalars['String']['input'];
}>;


export type GetQueryResultQuery = { __typename?: 'Query', query: { __typename?: 'QueryResult', jsonResult?: string | null, sql?: string | null, status: QueryStatus, error?: string | null } };

export type GetMetricsQueryVariables = Exact<{
  environmentId: Scalars['BigInt']['input'];
}>;


export type GetMetricsQuery = { __typename?: 'Query', metrics: Array<{ __typename?: 'Metric', name: string, description?: string | null, dimensions: Array<{ __typename?: 'Dimension', name: string, label?: string | null, queryableGranularities: Array<TimeGranularity>, queryableTimeGranularities: Array<string>, type: DimensionType }>, measures: Array<{ __typename?: 'Measure', name: string, agg: AggregationType, aggTimeDimension?: string | null, expr: string }> }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any> | undefined) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const CreateQueryDocument = new TypedDocumentString(`
    mutation createQuery($environmentId: BigInt!, $groupBy: [GroupByInput!], $metrics: [MetricInput!], $orderBy: [OrderByInput!], $limit: Int, $readCache: Boolean, $savedQuery: String, $where: [WhereInput!]) {
  createQuery(
    environmentId: $environmentId
    groupBy: $groupBy
    metrics: $metrics
    orderBy: $orderBy
    limit: $limit
    readCache: $readCache
    savedQuery: $savedQuery
    where: $where
  ) {
    queryId
  }
}
    `) as unknown as TypedDocumentString<CreateQueryMutation, CreateQueryMutationVariables>;
export const GetQueryResultDocument = new TypedDocumentString(`
    query getQueryResult($environmentId: BigInt!, $queryId: String!) {
  query(environmentId: $environmentId, queryId: $queryId) {
    jsonResult
    sql
    status
    error
  }
}
    `) as unknown as TypedDocumentString<GetQueryResultQuery, GetQueryResultQueryVariables>;
export const GetMetricsDocument = new TypedDocumentString(`
    query getMetrics($environmentId: BigInt!) {
  metrics(environmentId: $environmentId) {
    name
    description
    dimensions {
      name
      label
      queryableGranularities
      queryableTimeGranularities
      type
    }
    measures {
      name
      agg
      aggTimeDimension
      expr
    }
  }
}
    `) as unknown as TypedDocumentString<GetMetricsQuery, GetMetricsQueryVariables>;