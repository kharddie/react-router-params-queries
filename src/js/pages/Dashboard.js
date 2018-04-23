import React from "react";
import ProductsContainer from "../containers/ProductsContainer";

export default class Dashboard extends React.Component {
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
