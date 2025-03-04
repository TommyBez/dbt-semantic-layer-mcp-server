import type { TypedDocumentString } from '../graphql/graphql'

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  if (!process.env.SEMANTIC_LAYER_URL) {
    throw new Error('SEMANTIC_LAYER_URL must be set')
  }
  if (!process.env.SEMANTIC_LAYER_API_KEY) {
    throw new Error('SEMANTIC_LAYER_API_KEY must be set')
  }

  const response = await fetch(process.env.SEMANTIC_LAYER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      Authorization: `Bearer ${process.env.SEMANTIC_LAYER_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const {data} = await response.json()

  return data as TResult
}
