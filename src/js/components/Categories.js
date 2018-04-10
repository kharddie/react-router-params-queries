import React from "react";

class Categories extends React.Component {

    componentWillMount() {
       // this.props.fetchCategories();
    }

    renderPosts(categories) {
        return categories.map((categories) => {
            return (
                <span>{categories.category_name} ({categories.category_id}) {categories.description + categories.price + categories.description}</span>
            );
        });
    }

    render() {
        const { categories, loading, error } = this.props.categoriesList;



        if (loading) {
            return <div className="container"><h1>categories</h1><h3>Loading...</h3></div>
        } else if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }

        return (
            <div className="container">
                <h1>Posts</h1>
                <ul className="list-group">
                    {this.renderPosts(categoriesList)}
                </ul>
            </div>
        );
    }
}
    
    

export default Categories;