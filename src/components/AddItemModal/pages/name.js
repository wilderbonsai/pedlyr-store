import React from 'react'
import { Form } from 'formsy-semantic-ui-react';
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

  submitForm = () => {
    if(this.ref && this.ref.form)  this.refs.form.submit()
  }

  render() {
    const {next,previous} = this.props
    return (
        <Form ref="form" onValidSubmit={ () => this.processNext(next) }>
          <Actions backText="Cancel" nextText="Next" backAction={previous} nextAction={this.submitForm} >
            <Input name="name"
                   defaultValue={newProduct.name}
                   autoFocus
                   onChange={this.handleChange}
                   size='huge'
                   fluid
                   placeholder='Your new item name'
                   required
            />
          </Actions>
        </Form>
    )
  }
}


export default InputExampleFluid