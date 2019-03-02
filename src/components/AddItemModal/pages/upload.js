import React from 'react'
import Dropzone from 'react-dropzone'
import classNames from 'classnames'
import styled from 'styled-components'
import FormData from 'form-data'
import { uploadProductImage } from '../../../service/Moltin'

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
  onDrop = async (acceptedFiles, rejectedFiles) => {

    // Do something with files
    acceptedFiles.forEach(async function(file) {
        await uploadProductImage(file)
    })

  }

  render() {
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