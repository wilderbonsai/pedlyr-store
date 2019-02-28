import React from 'react'
import { Icon, Label } from 'semantic-ui-react'
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

  render() {
    const { next ,previous } = this.props
    return (
        <div>
          <Actions backText="Back" nextText="Next" backAction={previous} nextAction={() => this.processNext(next)} >
            <Input defaultValue={newProduct.price} onChange={(e) => this.handleChange(e)} size='huge' fluid min="1" step="1" placeholder='Your Selling Price' labelPosition='right' type='number' >
              <Label basic>€</Label>
              <input />
            </Input>
          </Actions>
        </div>
    )
  }
}





export default InputExampleFluid