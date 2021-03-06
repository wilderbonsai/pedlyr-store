import React from 'react'
import { Form } from 'formsy-semantic-ui-react';
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


  submitForm = () => {
    if(this.ref && this.ref.form)  this.refs.form.submit()
  }

  render() {
    const { next, previous} = this.props;
    return (
        <Form size="huge" onValidSubmit={ () => this.processNext(next) }>
          <Actions backText="Back" nextText="Next" backAction={previous} nextAction={this.submitForm}>
            <TextArea
                name="description"
                defaultValue={newProduct.description}
                onChange={this.handleChange}autoHeight
                placeholder='Your Product Description'
                style={{ minHeight: 100 }}
                required
            />
          </Actions>
        </Form>
    )
  }
}

export default TextAreaExampleAutoHeightMinHeight