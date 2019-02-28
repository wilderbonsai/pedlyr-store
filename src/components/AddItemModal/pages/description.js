import React from 'react'
import { Form } from 'semantic-ui-react'
import TextArea from '../../Textarea'
import Actions from '../pageActions'
const TextAreaExampleAutoHeightMinHeight = ({next, previous}) => (

    <Form size="huge">

      <Actions backText="Back" nextText="Next" backAction={previous} nextAction={next}>
        <TextArea autoHeight placeholder='Your Product Description' style={{ minHeight: 100 }} />
      </Actions>
    </Form>


)

export default TextAreaExampleAutoHeightMinHeight