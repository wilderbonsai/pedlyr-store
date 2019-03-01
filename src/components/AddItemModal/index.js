import React from 'react'
import { Button, Header, Icon, Image, Modal, Transition } from 'semantic-ui-react'
import Name from './pages/name'
import Description from './pages/description'
import Price from './pages/price'
import Size from './pages/size'
import Success from './pages/success'
import Upload from './pages/upload'
import { Wizard, Steps, Step } from 'react-albus';
import { Line } from 'rc-progress';

class ModalExampleScrollingContent extends React.Component {

  ANIMATION_DURATION = 500;

  state = {
    open: false,
    visible: false
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.open !== prevProps.open) {
      this.setState({open:this.props.open, visible:this.props.open});
    }
  }

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({visible:false})
    setTimeout(onClose, this.ANIMATION_DURATION)
  }

  renderWizard = ({step, steps}) => {
      return (
          <div>

            <Steps>
                <Step
                  id="name"
                  render={({ next }) => (
                  <Upload next={next} previous={this.handleClose}/>

                  )}
                />
                <Step
                  id="description"
                  render={({ next, previous }) => (
                      <Description next={next} previous={previous} />
                )}
                />
                <Step
                id="price"
                render={({ next, previous }) => (
                    <Price next={next} previous={previous} />
                )}
                />
              <Step
                  id="size"
                  render={({ next, previous }) => (
                      <Size next={next} previous={previous} />
                  )}
              />
              <Step
                  id="success"
                  render={({ next, previous }) => (
                      <Success next={next} end={this.handleClose} />
                  )}
              />
              <Step
                  id="success"
                  render={({ next, previous }) => (
                      <Success next={next} end={this.handleClose} />
                  )}
              />
              <Step
                  id="upload"
                  render={({ next, previous }) => (
                      <Upload next={next} end={this.handleClose} />
                  )}
              />
          </Steps>
            {(steps.indexOf(step) + 1) <= 4 &&
              <Line
                  strokeColor="#0fc177"
                  percent={(steps.indexOf(step) + 1) / 4 * 100}
                  className="pad-b"
              />
            }
          </div>
      )
  }




  render() {
    const { open, visible } = this.state
    return(
        <Transition visible={visible} animation='scale' duration={this.ANIMATION_DURATION}>
        <Modal open={open} closeOnDimmerClick={false} closeOnEscape basic size="tiny" scrolling
               onClose={this.handleClose}  >
          <Modal.Header></Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <div style={{width:'100%'}}>
              <Wizard
                  render={({ step, steps }) => this.renderWizard({step, steps})}
              >
              </Wizard>
                </div>
            </Modal.Description>
          </Modal.Content>

        </Modal>
          </Transition>
    )
  }
}



export default ModalExampleScrollingContent
