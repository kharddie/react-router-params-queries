import React from "react";
import Article from "../components/Article";
import ProductsContainer from "../container/ProductsContainer"

export default class Featured extends React.Component {
  render() {
    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
            <div class="well text-center">
              <ProductsContainer/>
            </div>
          </div>
        </div> 
      </div>
    );
  }
}
