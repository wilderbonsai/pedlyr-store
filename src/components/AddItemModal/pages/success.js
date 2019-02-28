import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import ButtonDivider from '../../ButtonDivider'

const processNext = (next) => {

  next()
}



const success = ({next, end}) => {
  return (
        <div>
        <h2>Congratulations!</h2>
        Your item is successfuly created and is available for purchase through your store?
        <br/>
        <h2>Would you like to upload any photos for this new item now?
       </h2>
          (You can also do this later from your item's page)
        <Button.Group size="massive" fluid>
          <Button onClick={end}>No</Button>
          <ButtonDivider/>
          <Button onClick={next}>Yes</Button>
        </Button.Group>
        </div>
  )
}


export default success