import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { loadReCaptcha } from 'react-recaptcha-v3';
import { UserCanAsk } from './common/ui/auth/AuthWrapper';
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminRedir } from './common/ui/auth/AuthGuard';
import ModalManager from './common/ui/modal/ModalManager';
import NavBar from './common/ui/nav/navBar/NavBar';
import SideBar from './common/ui/nav/sideBar/SideBar';
import QuestionDashboard from './feature/question/dashboard/QuestionDashboard';
import HomePage from './feature/home/HomePage';
import QuestionDetail from './feature/question/questionDetail/QuestionDetail';
import SearchBar from './feature/search/searchBar/SearchBar';
import Appfooter from './common/ui/footer/AppFooter';
import NavMobile from './common/ui/nav/navMobile/NavMobile';
import NewsMain from './feature/news/main/NewsMain';
import NewsArticle from './feature/news/article/NewsArticle';
import QuestionForm from './feature/question/questionForm/QuestionForm';
import QuestionCategoryPage from './feature/question/categories/QuestionCategoryPage';
import Scholarships from './feature/scholarships/Scholarships';
import ScholarshipTeacher from './feature/scholarships/ScholarshipTeacher';
import Resources from './feature/resources/Resources';
import About from './feature/about/About';
import Jobs from './feature/jobs/Jobs';
import ProfilePage from './feature/profile/ProfilePage';
import Report from './feature/report/Report';

// import Admin from './feature/admin/Admin';
import AdminJobList from './feature/admin/component/jobs/AdminJobList';
import AdminJobForm from './feature/admin/component/jobs/AdminJobForm';
import AdminLanding from './feature/admin/AdminLanding';

import LoginForm from './common/ui/auth/login/LoginForm';

const mapState = state => ({
  auth: state.auth,
  nav: state.nav
});

// Need to apply the hocs here to avoid applying them inside the render method
const Login = userIsNotAuthenticatedRedir(LoginForm);
const Profile = userIsAuthenticatedRedir(ProfilePage);
const AdminMain = userIsAuthenticatedRedir(userIsAdminRedir(AdminJobList));
const AdminJob = userIsAuthenticatedRedir(userIsAdminRedir(AdminJobForm));
const ReportMain = userIsAuthenticatedRedir(userIsAdminRedir(Report));

class App extends Component {
  componentDidMount() {
    loadReCaptcha('6LdfOb8UAAAAAJg87yIa2NJwxwP8ZkJJg18XGG1M');
    // this.onRouteChanged();
  }

  /*
   * KEEP THIS TO MOVE ALL 
   * ROUTE CHANGE FUNCTION
   * TO APP LEVEL
   * 

  componentDidUpdate(prevProps) {
    console.log('App: componentDidUpdate: props: ', this.props);
    console.log('App: componentDidUpdate: prevProps: ', prevProps);
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log('App: onRouteChanged: ', this.props.location.pathname);
  }
 */
  render() {
    // console.log('App: nav: ', this.props.nav);
    // console.log('App: props: ', this.props);
    const pathName = this.props.location.pathname.split('/')[1] || 'home';
    // console.log('pathName: ', pathName);
    return (
      <>
        <ModalManager />
        <Route exact path='/' component={HomePage} />
        <Route
          path='/(.+)'
          render={() => (
            <>
              <NavBar />
              <SearchBar />
              <Container className={`main ${pathName}`}>
                <div className='content'>
                  <Switch key={this.props.location.key}>
                    <Route path='/login' component={Login} />
                    <Route exact path='/questions' component={QuestionDashboard} />
                    <Route path='/questions/:uid/:slug' component={QuestionDetail} />
                    <Route path='/categories' component={QuestionCategoryPage} />
                    <Route path={['/ask', '/ask/:id', '/ask/:uid/:slug']} component={UserCanAsk(QuestionForm)} />
                    <Route exact path='/news' component={NewsMain} />
                    <Route path='/news/:uid/:slug' component={NewsArticle} />
                    <Route exact path='/scholarships' component={Scholarships} />
                    <Route exact path='/scholarships/teacher' component={ScholarshipTeacher} />
                    <Route path='/resources' component={Resources} />
                    <Route path='/about' component={About} />
                    <Route path='/jobs' component={Jobs} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/postjob' component={AdminLanding} />
                    <Route exact path='/admin' component={AdminMain} />
                    <Route path='/admin/job/:id' component={AdminJob} />
                    <Route exact path='/spedxchange-reports' component={ReportMain} />
                  </Switch>
                </div>
              </Container>
              <NavMobile />
              <Appfooter auth={this.props.auth} />
              {this.props.nav.isSideBarOpen && <SideBar />}
            </>
          )}
        />
      </>
    );
  }
}

export default withRouter(connect(mapState)(App));
