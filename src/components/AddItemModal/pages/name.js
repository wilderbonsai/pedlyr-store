import React from 'react'
import { Icon } from 'semantic-ui-react'
import  Input  from '../../Input'
import Actions from '../pageActions'


const processNext = (next) => {

  next()
}

const InputExampleFluid = ({next, previous}) => {
  return (
      <div>
        <Actions backText="Cancel" nextText="Next" backAction={previous} nextAction={() => processNext(next)} >
          <Input autoFocus size='huge' fluid  placeholder='Your new item name' />
        </Actions>
      </div>
  )
}


export default InputExampleFluid