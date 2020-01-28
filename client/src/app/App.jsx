import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { loadReCaptcha } from 'react-recaptcha-v3';
import { UserIsAuthenticated, UserIsAdmin } from './common/ui/auth/AuthWrapper';
import ModalManager from './common/ui/modal/ModalManager';
import NavBar from './common/ui/nav/navBar/NavBar';
import SideBar from './common/ui/nav/sideBar/SideBar';
import QuestionDashboard from './feature/question/dashboard/QuestionDashboard';
import HomePage from './feature/home/HomePage';
import QuestionDetail from './feature/question/questionDetail/QuestionDetail';
import UserDashboard from './feature/user/userDashboard/UserDashboard';
import UserDetail from './feature/user/userDetail/UserDetail';
import SettingsDashboard from './feature/user/settings/SettingsDashboard';
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
import Tags from './feature/tags/Tags';
import People from './feature/people/People';
import Jobs from './feature/jobs/Jobs';
import ProfilePage from './feature/profile/ProfilePage';

import Admin from './feature/admin/Admin';
import AdminJobEdit from './feature/admin/component/jobs/AdminJobEdit';

// import AccountForm from './feature/account/component/AccountForm';
// import CheckoutStore from './feature/testarea/CheckoutStore';
// import SelectPlan from './feature/testarea/SelectPlan';
import PlanSelector from './feature/testarea/PlanSelector';
import TestComponent from './feature/testarea/TestComponent';
import TestForms from './feature/testarea/TestForms';
import SiteForms from './feature/testarea/SiteForms';
import Dashboard from './feature/dashboard/Dashboard';
import ScholarshipReview from './feature/dashboard/component/ScholarshipReview';

const mapState = state => ({
  auth: state.auth,
  nav: state.nav
});

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
                    <Route exact path='/questions' component={QuestionDashboard} />
                    <Route path='/questions/:uid/:slug' component={QuestionDetail} />
                    <Route path='/categories' component={QuestionCategoryPage} />
                    <Route path={['/ask', '/ask/:id', '/ask/:uid/:slug']} component={UserIsAuthenticated(QuestionForm)} />
                    <Route exact path='/user' component={UserIsAuthenticated(UserDashboard)} />
                    <Route path='/profile/:id' component={UserIsAuthenticated(UserDetail)} />
                    <Route exact path='/settings' component={UserIsAuthenticated(SettingsDashboard)} />
                    <Route exact path='/news' component={NewsMain} />
                    <Route path='/news/:uid/:slug' component={NewsArticle} />
                    <Route exact path='/scholarships' component={Scholarships} />
                    <Route exact path='/scholarships/teacher' component={ScholarshipTeacher} />
                    <Route path='/resources' component={Resources} />
                    <Route path='/about' component={About} />
                    <Route path='/tags' component={Tags} />
                    <Route path='/people' component={People} />
                    <Route path='/jobs' component={Jobs} />
                    <Route path='/profile' component={UserIsAuthenticated(ProfilePage)} />
                    <Route exact path='/dashboard' component={UserIsAuthenticated(Dashboard)} />
                    <Route path='/dashboard/scholarship-review/:scholarshipName' component={UserIsAuthenticated(ScholarshipReview)} />
                    <Route exact path='/testarea' component={TestComponent} />
                    <Route exact path='/testform' component={TestForms} />
                    <Route exact path='/siteform' component={SiteForms} />
                    <Route exact path='/checkout' component={PlanSelector} />
                    <Route exact path='/admin' component={UserIsAdmin(Admin)} />
                    <Route path='/admin/job/:id' component={UserIsAdmin(AdminJobEdit)} />
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
