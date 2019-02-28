import React from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import styled from 'styled-components';
import AddItemModal from '../AddItemModal'

const Tab = styled.a`
  position:fixed;
  padding-left:-50px;
  z-index:100;
  left:5;
  padding:10px;
  background-color: black;
  color:white;
  cursor:pointer;
  margin-left:-50px;
  padding-left:60px;
`

const StyledPusher = styled(Sidebar.Pusher)`
  overflow: unset;
`


const fixed = styled(Segment)`
  display:flex;
  flex-direction:column;
`
class SidebarExampleVisible extends React.Component {

  state = {
    visible: true,
    animation: 'push',
    direction: 'right',
    addItemModal: false,
  }

  openAddItemModal = () => {
    this.setState({addItemModal:true})
  }

  handleModalClose = () => {
    this.setState({addItemModal:false})
  }

  hideMenu = ()  => {
    const { visible } = this.state
    this.setState({visible:!visible})
  }

  render() {
    const { children } = this.props
    const {visible, addItemModal} = this.state
    return (
        <div>
        <Sidebar.Pushable style={{transform:'none'}} >
          <Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible={visible} width='thin' style={{position:'fixed'}}>
            <Menu.Item as='a' onClick={this.openAddItemModal}>
              <Icon name='plus'/>
              New Item
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='shipping'/>
              Orders
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='settings'/>
              Edit Store
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='lightning'/>
              Upgrades
            </Menu.Item>

          </Sidebar>

          <Sidebar.Pusher style={{overflow:'unset'}} >
            <fixed>
            <AddItemModal open={addItemModal} onClose={this.handleModalClose}/>
            <Tab onClick={this.hideMenu}>Admin<br/>
              Actions ></Tab>
            {children}
            </fixed>
          </Sidebar.Pusher>

        </Sidebar.Pushable>

          </div>
    )
  }

}

export default SidebarExampleVisible