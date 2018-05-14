import React from "react";

import Article from "../components/Article";

export default class AboutUs extends React.Component {
  render() {
    const { query } = this.props.location;
    const { params } = this.props;
    const { article } = params;
    const { date, filter } = query;

    const Articles = [
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
      "Fake Article",
      "Partial Article",
      "American Article",
      "Mexican Article",
    ].map((title, i) => <Article key={i} title={title} />);

    return (
      <div>
        <h1>AboutUs</h1>
        <div class="row">
          <div class="col-12">
            <p className="font-weight-bold">Find out how to volunteer in your local community and give your time to help others.  </p>

            <h3>What is it?  </h3>
            <p> Anyone can volunteer. It can be very rewarding and is a great way to:</p>
            <ul>
              <li>meet new people</li>
              <li>gain new or use existing skills</li>
              <li>get experience</li>
              <li>make a big difference to your community</li>
            </ul>
            <p>
              There are lots of easy ways to give your time to help others – from having a cup of tea with an elderly neighbour, to helping out in your local area or making a regular commitment to volunteer with a charity or community group.
           </p>
            <h3>  How can to get involved?</h3>
            <ul>
              <li> Start by telling us about your request. Mention when and where (in person or online) you need it done. Post any task you need from gardening, cleaning s – for free! There's no obligation assign anyone.</li>
              <li>Take a look at profiles and reviews to pick the best volunteer for your request. When you accept an offer you can call or text the volunteer for more detail. </li>
            </ul>
            <p>We are committed to supporting, enabling and celebrating volunteering in all its diversity. Volunteering is someone spending time, unpaid, doing something that aims to benefit the environment or someone who they're not closely related to. Volunteering must be a choice freely made by each individual. </p>
          </div>
        </div>
      </div>
    );
  }
}
