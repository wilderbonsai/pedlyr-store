import React from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import styled from 'styled-components'
import { uploadProductImage } from '../../../service/Moltin'
import newProduct from '../../../store/newProduct'

const StyledDropzone = styled.div`
  .dropzone {
    padding:20px;
    border:4px dashed;
    border-color:white;
    transition: all 0.5s ease;
  }
  
  .dropzone.dropzone--isActive {
    border-color:#1ed29a !important;
  }
`
class Upload extends React.Component {
  state = {
    images:[],
    mainImageIndex: -1
  }


  onDrop = async (acceptedFiles, rejectedFiles) => {
    console.log(newProduct)
    const self = this;
    // Do something with files
    var index = -1;
    acceptedFiles.forEach(async function(file) {
      try {
        var main = false
        if(self.state.mainImageIndex === -1) {
          main = true
        }
        index++
        console.log(newProduct.id)
        const response = await uploadProductImage(file, newProduct.id, main)
        self.setState(state => {
          const images = [...state.images, response.data];
          return {
            images,
          };
        });
        self.setState({mainImageIndex:index})
      } catch(error) {
        console.log(error)
      }
    })
  }


  render() {
    console.log(newProduct)
    const { images } = this.state;
    return (
        <Dropzone onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
                <StyledDropzone>
                <div
                    {...getRootProps()}
                    className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                >
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                        <p>Drop files here...</p> :
                        <p>Try dropping some files here, or click to select files to upload.</p>
                  }
                </div>
                </StyledDropzone>
            )
          }}
        </Dropzone>
    );
  }
}


export default Upload