import React from 'react'
import { Icon } from 'semantic-ui-react'
import  Input  from '../../Input'
import Actions from '../pageActions'
import newProduct from 'store/newProduct'

const processNext = (next) => {

  next()
}


class InputExampleFluid extends React.Component {
  state = {
    name: newProduct.name
  }

  processNext = (next) => {
    newProduct.name = this.state.name
    next()
  }

  handleChange = (e) => {
    this.setState({name:e.target.value})
  }

  render() {
    const {next,previous} = this.props
    return (
        <div>
          <Actions backText="Cancel" nextText="Next" backAction={previous} nextAction={() => this.processNext(next)} >
            <Input defaultValue={newProduct.name} autoFocus onChange={this.handleChange} size='huge' fluid  placeholder='Your new item name' />
          </Actions>
        </div>
    )
  }
}


export default InputExampleFluid