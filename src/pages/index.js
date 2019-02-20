/* eslint-disable */

import React from 'react'
import get from 'lodash/get'
import { Image, Header } from 'semantic-ui-react'
import Helmet from 'react-helmet'
import ProductList from '../components/ProductList'
import logo from '../images/ill-short-dark.svg'
const MoltinGateway = require(`@moltin/sdk`).gateway

class StoreIndex extends React.Component {

  constructor() {
    super()
    this.state = {
      products: [],
      images:[]
    }
  }
  async componentDidMount() {
    const products = await MoltinGateway({
      client_id: process.env.MOLTIN_CLIENT_ID,
    })
    .Products.Filter({eq:{brand:{id:process.env.MOLTIN_BRAND_ID}}}).With(['main_images'])
    .All()


    if(products.data) {
      this.setState({products:products.data, images:products.included.main_images})
    }


  }

  render() {
    const { products, images } = this.state
    console.log(products, 'products')
    console.log(images, 'images');
    const siteTitle = 'test'
    // const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    // const products = get(this, 'props.data.allMoltinProduct.edges')
    let listedProducts = []
    if(products){

      listedProducts = products.filter(
          v => v.relationships.main_image
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
        <ProductList products={listedProducts} images={images}/>
      </div>
    )
  }
}

export default StoreIndex

// export const pageQuery = graphql`
//   query IndexQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMoltinProduct {
//       edges {
//         node {
//           originalId
//           name
//           description
//           meta {
//             display_price {
//               with_tax {
//                 amount
//                 currency
//                 formatted
//               }
//             }
//             stock {
//               level
//             }
//           }
//           includedData {
//             main_image {
//               id
//               link {
//                 href
//               }
//             }
//           }
//           mainImage {
//             childImageSharp {
//               sizes(maxWidth: 600) {
//                 ...GatsbyImageSharpSizes
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
