/* eslint-disable */
import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import Layout from 'layouts'

class ProductPageTemplate extends React.PureComponent {
  render() {
    const productInfo = get(this, 'props.data.allMoltinProduct')
    const data = productInfo.edges[0].node
    const slug = data.slug
    const image = get(data, 'includedData.main_image.link.href')
    const sizes = get(data, 'mainImage.childImageSharp.sizes')
    const product = {
      ...data,
      id: data.originalId,
      image,
      mainImage: data.mainImage,
      header: data.name,
      meta: data.meta,
      sku: data.sku,
    }

    if(!sizes) return null

    return (
      <div>
        <Layout {...this.props}>
        <Helmet title={slug}>
          <title></title>
          <meta name="description" content="Nested component" />
          <meta property="og:title" content={data.name} />
        </Helmet>
        <ProductSummary {...product} />
        </Layout>
      </div>
    )
  }
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($originalId: String!) {
    allMoltinProduct(filter: { originalId: { eq: $originalId } }) {
      edges {
        node {
          originalId
          name
          description
          meta {
            display_price {
              with_tax {
                amount
                currency
                formatted
              }
            }
          }
          includedData {
            main_image {
              link {
                href
              }
            }
          }
          mainImage {
            childImageSharp {
              sizes(maxWidth: 400) {
                ...GatsbyImageSharpSizes
              }
            }
          }
          slug
          sku
        }
      }
    }
  }
`
