import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import styled from 'styled-components'

const Back = styled.div`
  color:white;
  font-size:15px;
  float:left;
  
  &:hover {
    cursor:pointer
  }
`


const NextButton = styled(Button)`
  margin-top:10px;
`

const Container = styled.div`

`
const PageActions = ({children, backText, backAction, nextText, nextAction}) => {
  return (
      <div>
        <Back onClick={backAction}>
          <Icon name='chevron left' positive={false}/>{backText}
        </Back>
        <br style={{clear:"both"}} />
        {children}
        <NextButton float="right" size="big"  color="teal" style={{marginTop:'10px', borderRadius:'0px'}} fluid  onClick={nextAction}>
          {nextText}
        </NextButton>
      </div>
  )
}

export default PageActions