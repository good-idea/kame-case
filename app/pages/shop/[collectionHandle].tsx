import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ShopifyCollection } from '../../src/types'
import { ssrClient, App, ShopView } from '../../src/views'
import { definitely } from '../../src/utils'

interface ShopProps {
  activeCollectionHandle: string
}

const Shop = ({ activeCollectionHandle }: ShopProps) => {
  return <ShopView activeCollectionHandle={activeCollectionHandle} />
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { collectionHandle } = ctx.params
  if (typeof collectionHandle !== 'string') {
    throw new Error(
      `Collection handle param was not a string: [${collectionHandle.join(
        ', ',
      )}]`,
    )
  }
  const StaticApp = (
    <App>
      <ShopView activeCollectionHandle={collectionHandle} />
    </App>
  )

  await getDataFromTree(StaticApp)
  const apolloCache = ssrClient.extract()

  return {
    props: { activeCollectionHandle: collectionHandle, apolloCache },
    revalidate: 60,
  }
}

/**
 * Static Paths
 */

const pageHandlesQuery = gql`
  query ProductHandlesQuery {
    allShopifyCollection(
      where: { shopifyId: { neq: null }, archived: { neq: true } }
    ) {
      archived
      _id
      shopifyId
      handle
    }
  }
`

interface CollectionsResponse {
  allShopifyCollection: ShopifyCollection[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await ssrClient.query<CollectionsResponse>({
    query: pageHandlesQuery,
  })

  const collections = definitely(result?.data?.allShopifyCollection)

  const paths = collections
    .filter((collection) => Boolean(collection.handle))
    .map((collection) => ({ params: { collectionHandle: collection.handle } }))

  return {
    paths,
    fallback: true,
  }
}

export default Shop