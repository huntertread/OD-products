import './ProductList.css';
import axios from 'axios';
import React from 'react';

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
    this.getProducts = this.getProducts.bind(this);
  }

  getProducts() {
    axios.get('https://onedrop.today/products.json')
      .then((results) => {
        this.setState({products: results.data.products})
      })
      .catch((err) => {
        console.error(err)
      })
  }

  componentDidMount() {
    this.getProducts();
    // get results every 60 seconds
    this.timer = setInterval(() => this.getProducts(), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div className="ProductList">
        <ul>
          {this.state.products
            .filter((product) => {
              // convert price string to number
              let convertToNum = parseInt(product.variants[0].price)
              // return any value that is greater than 0
              return convertToNum > 0.00
            })
            .sort((a, b) => {
              // sort products by price descending
              return b.variants[0].price - a.variants[0].price
            })
            .map((product, i) => {
              // map remaining results to list
              return <li key={i}>{product.title} - {product.variants[0].price}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default ProductList;
