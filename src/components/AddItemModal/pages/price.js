import React from 'react'
import { Icon, Label } from 'semantic-ui-react'
import  Input  from '../../Input'
import Actions from '../pageActions'


const processNext = (next) => {

  next()
}

const InputExampleFluid = ({next, previous}) => {
  return (
      <div>
        <Actions backText="Back" nextText="Next" backAction={previous} nextAction={() => processNext(next)} >
          <Input size='huge' fluid  placeholder='Your Selling Price' labelPosition='right' type='text' >
            <Label basic>€</Label>
            <input />
            <Label>.00</Label>
          </Input>
        </Actions>
      </div>
  )
}


export default InputExampleFluid