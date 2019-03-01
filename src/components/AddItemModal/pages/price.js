import React from 'react'
import { Label } from 'semantic-ui-react'
import { Form } from 'formsy-semantic-ui-react';
import  Input  from '../../Input'
import Actions from '../pageActions'
import newProduct from '../../../store/newProduct'

class InputExampleFluid extends React.Component {

  state = {
    price: newProduct.price
  }

  processNext = (next) => {
    newProduct.price = this.state.price
    next()
  }

  handleChange = (e) => {
    this.setState({price:e.target.value})
  }

  submitForm = () => {
    if(this.ref && this.ref.form) this.refs.form.submit()
  }


  render() {
    const { next ,previous } = this.props
    return (
        <Form ref="form" onValidSubmit={ () => this.processNext(next) }>
          <Actions backText="Back" nextText="Next" backAction={previous} nextAction={this.submitForm} >
            <Input
                name="price"
                defaultValue={newProduct.price}
                onChange={(e) => this.handleChange(e)}
                size='huge'
                fluid min="1"
                step="1"
                placeholder='Your Selling Price'
                labelPosition='right'
                type='number' >
              <Label basic>€</Label>
              <input />
            </Input>
          </Actions>
        </Form>
    )
  }
}





export default InputExampleFluid