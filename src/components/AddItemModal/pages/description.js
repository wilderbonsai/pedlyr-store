import React from 'react'
import { Form } from 'semantic-ui-react'
import TextArea from '../../Textarea'
import Actions from '../pageActions'
import newProduct from '../../../store/newProduct'

class TextAreaExampleAutoHeightMinHeight extends React.Component {
  state = {
    description: newProduct.description
  }

  processNext = (next) => {
    newProduct.description = this.state.description
    next()
  }

  handleChange = (e) => {
    this.setState({description:e.target.value})
  }


  render() {
    const { next, previous} = this.props;
    return (
        <Form size="huge">
          <Actions backText="Back" nextText="Next" backAction={previous} nextAction={() => this.processNext(next)}>
            <TextArea defaultValue={newProduct.description} onChange={this.handleChange}autoHeight placeholder='Your Product Description' style={{ minHeight: 100 }} />
          </Actions>
        </Form>
    )
  }
}

export default TextAreaExampleAutoHeightMinHeight