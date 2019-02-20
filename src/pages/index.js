/* eslint-disable */

import React from 'react'
import get from 'lodash/get'
import { Image, Header } from 'semantic-ui-react'
import Helmet from 'react-helmet'
import ProductList from '../components/ProductList'
import logo from '../images/ill-short-dark.svg'

class StoreIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const products = get(this, 'props.data.allMoltinProduct.edges')
    console.log(products)
    let listedProducts = []
    if(products){
      console.log()
      listedProducts = products.filter(
          v => v.node.includedData.main_image
      )
    }

    return (
      <div>
        <Helmet title={siteTitle} />
        <Header as="h3" icon textAlign="center" style={{ marginBottom: '2em' }}>
          <Header.Content style={{ width: '60%', margin: '0 auto' }}>
            <Image src={logo} alt={'logo'}/>
          </Header.Content>
        </Header>
        <ProductList products={listedProducts} />
      </div>
    )
  }
}

export default StoreIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMoltinProduct {
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
            stock {
              level
            }
          }
          includedData {
            main_image {
              id
              link {
                href
              }
            }
          }
          mainImage {
            childImageSharp {
              sizes(maxWidth: 600) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
  }
`
