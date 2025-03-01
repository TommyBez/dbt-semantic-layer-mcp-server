import { graphql } from '../../graphql/gql'
import { QueryClient } from '@tanstack/react-query'
import type { MutationCreateQueryArgs } from '../../graphql/graphql'
import { execute } from '../utils'

interface DbtGraphQLClientConfig {
  apiKey: string
  baseURL: string
  environmentId: string
}

export class DbtGraphQLClient {
  private client: QueryClient
  private environmentId: string
  constructor(config: DbtGraphQLClientConfig) {
    this.client = new QueryClient()
    this.environmentId = config.environmentId
  }

  async createQuery(
    args: Omit<MutationCreateQueryArgs, 'environmentId'>
  ): Promise<string> {
    const query = graphql(`
      mutation createQuery(
        $environmentId: BigInt!,
        $groupBy: [GroupByInput!],
        $metrics: [MetricInput!],
        $orderBy: [OrderByInput!],
        $limit: Int,
        $readCache: Boolean,
        $savedQuery: String,
        $where: [WhereInput!]
      ) {
        createQuery(
          environmentId: $environmentId,
          groupBy: $groupBy,
          metrics: $metrics,
          orderBy: $orderBy,
          limit: $limit,
          readCache: $readCache,
          savedQuery: $savedQuery,
          where: $where
        ) {
          queryId
        }
      }
    `)
    const data = await this.client.fetchQuery({
      queryKey: ['createQuery', args],
      queryFn: () =>
        execute(query, { ...args, environmentId: this.environmentId }),
    })
    return data.createQuery.queryId
  }

  async getQueryResult(queryId: string) {
    const query = graphql(`
        query getQueryResult($environmentId: BigInt!, $queryId: String!) {
          query(environmentId: $environmentId, queryId: $queryId) {
              jsonResult
              sql
              status
              error
          }
        }
      `)

    const { query: result } = await this.client.fetchQuery({
      queryKey: [
        'getQueryResult',
        { environmentId: this.environmentId, queryId },
      ],
      queryFn: () =>
        execute(query, { environmentId: this.environmentId, queryId }),
    })
    return result
  }

  /**
   * Fetch metrics.
   * @returns A list of metrics.
   */
  async fetchMetrics() {
    const query = graphql(`
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
      `)

    const data = await this.client.fetchQuery({
      queryKey: ['fetchMetrics', { environmentId: this.environmentId }],
      queryFn: () => execute(query, { environmentId: this.environmentId }),
    })
    return data.metrics
  }
}

let dbtClient: DbtGraphQLClient | null = null

export const getDbtClient = () => {
  if (!dbtClient) {
    if (!process.env.SEMANTIC_LAYER_API_KEY || !process.env.SEMANTIC_LAYER_URL || !process.env.SEMANTIC_LAYER_ENVIRONMENT_ID) {
      throw new Error('SEMANTIC_LAYER_API_KEY, SEMANTIC_LAYER_URL, and SEMANTIC_LAYER_ENVIRONMENT_ID must be set')
    }
    dbtClient = new DbtGraphQLClient({
      apiKey: process.env.SEMANTIC_LAYER_API_KEY,
      baseURL: process.env.SEMANTIC_LAYER_URL,
      environmentId: process.env.SEMANTIC_LAYER_ENVIRONMENT_ID,
    })
  }
  return dbtClient
}
