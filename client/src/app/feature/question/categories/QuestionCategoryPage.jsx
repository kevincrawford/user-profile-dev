import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadQuestionCategories } from '../../../common/actions/category/categoryActions';
import Loading from '../../../common/ui/loading/Loading';
import { Button } from 'semantic-ui-react';

class QuestionCategoryPage extends Component {
  componentDidMount() {
    this.props.loadQuestionCategories();
  }
  render() {
    const { loading, categories } = this.props;
    if (loading) return <Loading />;
    return (
      <div className='question-categories flex-box-wrap'>
        {categories &&
          categories.map(category => (
            <div key={category._id} className='column-3'>
              <h5>{category.text}</h5>
              <p>{category.description}</p>
              {category.questionCount !== 0 && (
                <div className='mt-3'>
                  <Button
                    color='green'
                    size='mini'
                    content=''
                    icon='question'
                    label={{
                      basic: true,
                      color: 'green',
                      pointing: 'left',
                      content: `${category.questionCount} Questions`
                    }}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
}

const mapState = state => ({
  categories: state.category.questionCategories,
  loading: state.async.loading
});

const actions = {
  loadQuestionCategories
};

export default connect(mapState, actions)(withRouter(QuestionCategoryPage));
