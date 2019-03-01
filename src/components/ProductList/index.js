import React from 'react'
import { Card, Image, Label } from 'semantic-ui-react'
import Link from 'gatsby-link'

const mapProductsToItems = (products, images) =>
  products.map(
    ({
        name,
        id,
        meta,
        relationships,
    },index) => {
      const price = meta.display_price.with_tax.formatted || null
      return {
        as: Link,
        to: `/product/${id}/`,
        childKey: id,
        image: (
          <Image>
            <img src={images[index].link.href} />
          </Image>
        ),
        header: name,
        meta: <Card.Meta style={{ color: 'dimgray' }}>{price}</Card.Meta>,
      }
    }
  )

const List = ({ products, images }) => (
  <Card.Group items={mapProductsToItems(products, images)} itemsPerRow={2} stackable />
)

export default List
