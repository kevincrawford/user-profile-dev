import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import AuthReducer from '../common/ui/auth/AuthReducer';
import NavReducer from '../common/ui/nav/navReducer';
import ContactReducer from '../common/ui/contact/actions/contactReducer';
import SearchReducer from '../common/ui/nav/searchBar/searchReducer';
import ModalReducer from '../common/ui/modal/ModalReducer';
import AsyncReducer from '../common/actions/async/asyncReducer';
import TagInput from '../common/ui/form/actions/tagInputReducer';
import CategoryReducer from '../common/actions/category/categoryReducer';
import QuestionReducer from '../feature/question/questionReducer';
import NewsReducer from '../feature/news/newsReducer';
import QuestionFormReducer from '../feature/question/questionForm/actions/questionFormReducer';
import JobsReducer from '../feature/jobs/actions/jobsReducer';
import AccountReducer from '../feature/account/accountReducer';
import DashboardReducer from '../feature/dashboard/DashboardReducer';
import AdminReducer from '../feature/admin/AdminReducer';

const rootReducer = combineReducers({
  toastr: ToastrReducer,
  async: AsyncReducer,
  auth: AuthReducer,
  modals: ModalReducer,
  form: FormReducer,
  nav: NavReducer,
  search: SearchReducer,
  questions: QuestionReducer,
  news: NewsReducer,
  category: CategoryReducer,
  questionForm: QuestionFormReducer,
  tagInput: TagInput,
  jobs: JobsReducer,
  contact: ContactReducer,
  account: AccountReducer,
  dashboard: DashboardReducer,
  admin: AdminReducer
});

export default rootReducer;
