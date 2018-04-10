import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({ collapsed });
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const featuredClass = location.pathname === "/" ? "active" : "";
    const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
      <a class="navbar-brand" href="#">Logo</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
          <div class={"collapse navbar-collapse " + navClass} id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class={"nav-item " + featuredClass}>
                <IndexLink class="nav-link" to="/" onClick={this.toggleCollapse.bind(this)}>Featured</IndexLink>
              </li>
              <li class={"nav-item " + archivesClass}>
                <Link class="nav-link" to="archives" onClick={this.toggleCollapse.bind(this)}>Archives</Link>
              </li>
              <li class={"nav-item " + settingsClass}>
                <Link class="nav-link" to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
              </li>
            </ul>
          </div>

      </nav>

</div>

    );
  }
}
