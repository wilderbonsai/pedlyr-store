import React from 'react'
import Actions from '../pageActions'
import { Grid, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import  { createNewProduct as createProduct} from '../../../service/Moltin'
import newProduct from '../../../store/newProduct'

const Divider = styled.div`
  width: .3em;
  font-size: 1.42857143rem;
 
`

const StyledButton = styled(Button)`
  &&& { 
    background-color:white ;
    transition: all 0.3s ease;
  };
  
  &:focus{
    background-color: teal !important;
  }
  
  &:hover{
  
  }
  
  &:active{
    background-color: #01271b !important;
  }
`

const StyledCard = styled.div`
  
  width:calc(50% - 2em); 
  float:left;
  margin:1em;
  background-color:#949aa5;
  padding:5px;
  color: black;
  
`

 const processNext = async (next) => {
    const product = await createProduct()
    newProduct.id = product.data.id
    next();
}

const ButtonExampleGroup = ({next, previous}) => (
    <Actions backText="Back" nextText="Create Item" backAction={previous} nextAction={() => processNext(next)} >
      <h2>How big is the item?</h2>
      (This determines the delivery price for the buyer)
      <br/>
      <Button.Group size="massive" fluid>
      <StyledButton>S</StyledButton>
      <Divider/>
      <StyledButton>M</StyledButton>
      <Divider/>
      <StyledButton>L</StyledButton>
      <Divider/>
      <StyledButton>XL</StyledButton>
    </Button.Group>

      </Actions>
)

export default ButtonExampleGroup
