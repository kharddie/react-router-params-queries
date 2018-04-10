import { connect } from "react-redux";
import { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure } from '../actions/Categories';
import Categories from '../components/Categories';


const mapStateToProps = (state) => {
    return {
        categoriesList: state.categories.categoriesList
    };
}




const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => {
            dispatch(fetchCategories()).then((response) => {
                var categories = '';
                if ("records" in response.payload.data) {
                    categories = response.payload.data.records;
                    !response.error ? dispatch(fetchCategoriesSuccess(categories)) : dispatch(fetchCategoriesFailure(categories));

                }
                else {

                    !response.error ? dispatch(fetchCategoriesSuccess(response.payload.data)) : dispatch(fetchCategoriesFailure(response.payload.data));
                }
            })

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);





