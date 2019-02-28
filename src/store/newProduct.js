import { store } from 'react-easy-state'

// use 'clock' instead of 'this' in the store methods to make them passable as callbacks
const newProduct = store({
  name:'',
  description:'',
  price:'',
  size:''
})

export default newProduct;

