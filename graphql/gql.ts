/* eslint-disable */
import * as types from './graphql.js';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n      mutation createQuery(\n        $environmentId: BigInt!,\n        $groupBy: [GroupByInput!],\n        $metrics: [MetricInput!],\n        $orderBy: [OrderByInput!],\n        $limit: Int,\n        $readCache: Boolean,\n        $savedQuery: String,\n        $where: [WhereInput!]\n      ) {\n        createQuery(\n          environmentId: $environmentId,\n          groupBy: $groupBy,\n          metrics: $metrics,\n          orderBy: $orderBy,\n          limit: $limit,\n          readCache: $readCache,\n          savedQuery: $savedQuery,\n          where: $where\n        ) {\n          queryId\n        }\n      }\n    ": typeof types.CreateQueryDocument,
    "\n        query getQueryResult($environmentId: BigInt!, $queryId: String!) {\n          query(environmentId: $environmentId, queryId: $queryId) {\n              jsonResult\n              sql\n              status\n              error\n          }\n        }\n      ": typeof types.GetQueryResultDocument,
    "\n        query getMetrics($environmentId: BigInt!) {\n          metrics(environmentId: $environmentId) {\n            name\n            description\n            dimensions {\n              name\n              label\n              queryableGranularities\n              queryableTimeGranularities\n              type\n            }\n            measures {\n              name\n              agg\n              aggTimeDimension\n              expr\n            }\n          }\n        }\n      ": typeof types.GetMetricsDocument,
};
const documents: Documents = {
    "\n      mutation createQuery(\n        $environmentId: BigInt!,\n        $groupBy: [GroupByInput!],\n        $metrics: [MetricInput!],\n        $orderBy: [OrderByInput!],\n        $limit: Int,\n        $readCache: Boolean,\n        $savedQuery: String,\n        $where: [WhereInput!]\n      ) {\n        createQuery(\n          environmentId: $environmentId,\n          groupBy: $groupBy,\n          metrics: $metrics,\n          orderBy: $orderBy,\n          limit: $limit,\n          readCache: $readCache,\n          savedQuery: $savedQuery,\n          where: $where\n        ) {\n          queryId\n        }\n      }\n    ": types.CreateQueryDocument,
    "\n        query getQueryResult($environmentId: BigInt!, $queryId: String!) {\n          query(environmentId: $environmentId, queryId: $queryId) {\n              jsonResult\n              sql\n              status\n              error\n          }\n        }\n      ": types.GetQueryResultDocument,
    "\n        query getMetrics($environmentId: BigInt!) {\n          metrics(environmentId: $environmentId) {\n            name\n            description\n            dimensions {\n              name\n              label\n              queryableGranularities\n              queryableTimeGranularities\n              type\n            }\n            measures {\n              name\n              agg\n              aggTimeDimension\n              expr\n            }\n          }\n        }\n      ": types.GetMetricsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation createQuery(\n        $environmentId: BigInt!,\n        $groupBy: [GroupByInput!],\n        $metrics: [MetricInput!],\n        $orderBy: [OrderByInput!],\n        $limit: Int,\n        $readCache: Boolean,\n        $savedQuery: String,\n        $where: [WhereInput!]\n      ) {\n        createQuery(\n          environmentId: $environmentId,\n          groupBy: $groupBy,\n          metrics: $metrics,\n          orderBy: $orderBy,\n          limit: $limit,\n          readCache: $readCache,\n          savedQuery: $savedQuery,\n          where: $where\n        ) {\n          queryId\n        }\n      }\n    "): typeof import('./graphql.js').CreateQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query getQueryResult($environmentId: BigInt!, $queryId: String!) {\n          query(environmentId: $environmentId, queryId: $queryId) {\n              jsonResult\n              sql\n              status\n              error\n          }\n        }\n      "): typeof import('./graphql.js').GetQueryResultDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n        query getMetrics($environmentId: BigInt!) {\n          metrics(environmentId: $environmentId) {\n            name\n            description\n            dimensions {\n              name\n              label\n              queryableGranularities\n              queryableTimeGranularities\n              type\n            }\n            measures {\n              name\n              agg\n              aggTimeDimension\n              expr\n            }\n          }\n        }\n      "): typeof import('./graphql.js').GetMetricsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
