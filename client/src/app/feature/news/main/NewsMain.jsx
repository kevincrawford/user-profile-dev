import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { loadArticles } from '../newsActions';
import { openModal } from '../../../common/ui/modal/ModalActions';
import Loading from '../../../common/ui/loading/Loading';

const mapState = state => ({
  articles: state.news.articles,
  loading: state.async.loading,
  loadingName: state.async.elementName
});

const actions = {
  loadArticles,
  openModal
};

class NewsMain extends Component {
  componentDidMount() {
    this.props.loadArticles();
    if (this.props.match.params.token) {
      this.props.openModal('ResetModal', { token: this.props.match.params.token });
    }
  }

  createImageSrc = (uid, name) => {
    return `https://spedxchange.s3.us-east-2.amazonaws.com/news/${uid}/${name}-cover.jpg`;
  };

  handleArticleClick(article) {
    this.props.history.push({ pathname: `/news/${article.uid}/${article.slug}` });
  }

  render() {
    const { articles, loading, loadingName } = this.props;
    if (loadingName === 'loadArticles' && loading) return <Loading />;
    return (
      <>
        <div className='flex-box-wrap'>
          {articles &&
            articles.map(article => (
              <div key={article._id} className='column-3' onClick={() => this.handleArticleClick(article)}>
                <div>
                  <img src={this.createImageSrc(article.uid, article.photoURL)} alt={article.photoURL} />
                </div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <hr />
                <div>
                  <Icon color='teal' fitted name='tag' />
                  <span>{article.category.text}</span>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default connect(mapState, actions)(withRouter(NewsMain));
