import { TextArea } from 'formsy-semantic-ui-react'
import styled from 'styled-components'

const StyledTextArea = styled(TextArea)`
    &&& textarea { border-radius: 0px !important; }
    &&& label { 
      display:none
    }
`

export default StyledTextArea