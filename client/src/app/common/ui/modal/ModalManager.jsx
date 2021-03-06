import React from 'react';
import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ResetModal from './ResetModal';
import UnauthModal from './UnauthModal';
import AskQuestionModal from './AskQuestionModal';
import ContactModal from './ContactModal';
import ScholarshipModal from './ScholarshipModal';
import ProfileAboutModal from '../../../feature/profile/components/modal/ProfileAboutModal';
import AdminJobModal from '../../../feature/admin/component/jobs/AdminJobModal';

const modalLookup = {
  LoginModal,
  RegisterModal,
  ResetModal,
  UnauthModal,
  AskQuestionModal,
  ContactModal,
  ScholarshipModal,
  ProfileAboutModal,
  AdminJobModal
};

const mapState = state => ({
  currentModal: state.modals
});

const ModalManager = ({ currentModal }) => {
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <span>{renderedModal}</span>;
};

export default connect(mapState)(ModalManager);
