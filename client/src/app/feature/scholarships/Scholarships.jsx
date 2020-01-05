import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';
import { openModal } from '../../common/ui/modal/ModalActions';

const scholarshipList = [
  {
    title: 'Alabama Student Grant Program',
    amount: '$1,200',
    deadline: 'Varies',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/alabama-student-grant-program'
  },
  {
    title: 'Bethesda Auxiliary Scholarships',
    amount: '$3,000',
    deadline: '05/17/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/bethesda-auxiliary-scholarships'
  },
  {
    title:
      'Bethesda Lutheran Communities Lutheran Student Scholastic & Service Scholarship',
    amount: '$30,000',
    deadline: '05/18/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/bethesda-lutheran-communities-lutheran-student-scholastic-and-service-scholarship'
  },
  {
    title: 'Bright Futures Scholarship for Early Childhood Teachers',
    amount: '$1,000',
    deadline: '06/09/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/bright-futures-scholarship-for-early-childhood-teachers'
  },
  {
    title: 'Cameron Impact Scholarship',
    amount: '$50,000',
    deadline: '09/13/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/cameron-impact-scholarship'
  },
  {
    title: 'Christa McAuliffe Teacher Incentive Program',
    amount: '$5,000',
    deadline: '06/04/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/christa-mcauliffe-teacher-incentive-program'
  },
  {
    title: 'CSUB Benjamin Schneider Memorial Scholarship',
    amount: 'Varies',
    deadline: '11/30/2019',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/csub-benjamin-schneider-memorial-scholarship'
  },
  {
    title: 'Davis-Blackford Families Scholarship',
    amount: '$1,000',
    deadline: '02/14/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/davis-blackford-families-scholarship'
  },
  {
    title: 'Dr Barbara Odom-Wesley Spirit of Achievement Scholarship',
    amount: '$3,000',
    deadline: '02/17/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/dr-barbara-odom-wesley-spirit-of-achievement-scholarship'
  },
  {
    title: 'Fulgham-Fulghum Family Scholarship',
    amount: '$1,000',
    deadline: '04/15/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/fulgham-fulghum-family-scholarship'
  },
  {
    title: 'Gill-Elliott Scholarship',
    amount: '$2,000',
    deadline: '03/15/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/gill-elliott-scholarship'
  },
  {
    title: 'GRCF John T. and Frances J. Maghielse Scholarship',
    amount: 'Varies',
    deadline: '03/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/grcf-john-t-and-frances-j-maghielse-scholarship'
  },
  {
    title: 'GRCF Roger and Jacquelyn Vander Laan Family Scholarship',
    amount: 'Varies',
    deadline: '03/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/grcf-roger-and-jacquelyn-vander-laan-family-scholarship'
  },
  {
    title: 'Irene Palko Scholarship Fund',
    amount: '$1,000',
    deadline: '02/14/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/irene-palko-scholarship-fund'
  },
  {
    title: 'James F. Reville Scholarship',
    amount: '$3,000',
    deadline: '01/13/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/james-f-reville-scholarship'
  },
  {
    title: 'Joseph T. Weingold Scholarship for Special Education Students',
    amount: '$3,000',
    deadline: '01/21/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/joseph-t-weingold-scholarship-for-special-education-students'
  },
  {
    title: 'Kent R. Smith Fund',
    amount: '$1,000',
    deadline: '05/30/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/kent-r-smith-fund'
  },
  {
    title: 'Lillian Kitchen and Zella Kitchen Challis Scholarship',
    amount: '$2,000',
    deadline: '03/15/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/lillian-kitchen-and-zella-kitchen-challis-scholarship'
  },
  {
    title: 'Madeline Maurer Scholarship',
    amount: '$1,000',
    deadline: '05/30/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/madeline-maurer-scholarship'
  },
  {
    title: 'Mike Lozano Scholarship',
    amount: '$2,500',
    deadline: '02/10/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/mike-lozano-scholarship'
  },
  {
    title: 'NAJA Graduate Scholarship Program',
    amount: 'Varies',
    deadline: '02/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/naja-graduate-scholarship-program'
  },
  {
    title: 'Olivia M. Marquart Scholarships',
    amount: '$2,500',
    deadline: '03/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/olivia-m-marquart-scholarships'
  },
  {
    title: 'Pancholi Scholarship for Nevada Educators',
    amount: '$2,000',
    deadline: '12/13/2019',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/pancholi-scholarship-for-nevada-educators'
  },
  {
    title: 'Paraprofessional Teacher Preparation Grant Program',
    amount: '$7,500',
    deadline: 'Varies',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/paraprofessional-teacher-preparation-grant-program'
  },
  {
    title: 'Pepsi-Cola Bottling of Eastern Oregon Scholarship',
    amount: '$1,000',
    deadline: '02/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/pepsi-cola-bottling-of-eastern-oregon-scholarship'
  },
  {
    title: 'Samuel Huntington Public Service Award',
    amount: '$15,000',
    deadline: '01/17/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/samuel-huntington-public-service-award'
  },
  {
    title: 'Save a Life Scholarship',
    amount: '$1,500',
    deadline: '10/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/save-a-life-scholarship'
  },
  {
    title: 'T.E.A.C.H. Early Childhood Minnesota Scholarship Programs',
    amount: 'Varies',
    deadline: 'Varies',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/t-e-a-c-h-early-childhood-minnesota-scholarship-programs'
  },
  {
    title: 'TEACH Grant',
    amount: '$4,000',
    deadline: 'Varies',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/teach-grant'
  },
  {
    title: 'Teacher.org Inspire Our Future Scholarship',
    amount: '$500',
    deadline: '04/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/teacher-org-inspire-our-future-scholarship'
  },
  {
    title: 'Tennessee Christa McAuliffe Scholarship',
    amount: '$500',
    deadline: '04/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/tennessee-christa-mcauliffe-scholarship'
  },
  {
    title:
      'The Brown Medical and Educational (MAE) Foundation Teaching Scholarship',
    amount: '$1,000',
    deadline: '04/30/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/the-brown-medical-and-educational-mae-foundation-teaching-scholarship'
  },
  {
    title: 'The Quell Bridge the Gap Scholarship',
    amount: '$2,000',
    deadline: '04/15/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/the-quell-bridge-the-gap-scholarship'
  },
  {
    title: 'The Robert Noyce Scholarship',
    amount: '$30,000',
    deadline: '01/12/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/the-robert-noyce-scholarship'
  },
  {
    title: 'Two Ten Higher Education Scholarship',
    amount: '$16,000',
    deadline: '04/19/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/two-ten-higher-education-scholarship'
  },
  {
    title: 'UCT Scholarship Program',
    amount: '$2,500',
    deadline: '11/15/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/uct-scholarship-program'
  },
  {
    title: 'Ups for Downs Katie MacDonald Memorial Scholarship',
    amount: '$2,500',
    deadline: '04/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/ups-for-downs-katie-macdonald-memorial-scholarship'
  },
  {
    title: 'Virginia Teaching Scholarship Loan Program (VTSLP)',
    amount: '$10,000',
    deadline: 'Varies',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/virginia-teaching-scholarship-loan-program-vtslp'
  },
  {
    title: 'Washington HECB American Indian Endowed Scholarship',
    amount: '$2,000',
    deadline: '02/01/2020',
    link:
      'https://www.scholarships.com/financial-aid/college-scholarships/scholarship-directory/academic-major/special-education/washington-hecb-american-indian-endowed-scholarship'
  }
];

export class Scholarships extends Component {
  handleApply = () => {
    if (this.props.auth.authenticated) {
      this.props.openModal('ScholarshipModal', { scholarshipId: 'teacher' });
    } else {
      this.props.openModal('UnauthModal');
    }
  };

  handleSocialClick = type => {
    const url =
      window.location.protocol +
      '//' +
      window.location.host +
      '/scholarships/teacher';
    if (type === 'twitter') {
      window.open(
        `https://twitter.com/intent/tweet?text=SPEDxchange:%202020%20Special%20Education%20Teacher%20Scholarship%20$1,000&amp;url=${url}`,
        'twitter-share-dialog',
        'width=600,height=480'
      );
    }
    if (type === 'linkedin') {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&amp;url=${url}&amp;title=Special%20Education%20Teacher%20Scholarship%20$1,000`,
        'linkedin-share-dialog',
        'width=600,height=480'
      );
    }
    if (type === 'facebook') {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        'facebook-share-dialog',
        'width=600,height=480'
      );
    }
  };

  setEmailLink = () => {
    const url =
      window.location.protocol +
      '//' +
      window.location.host +
      '/scholarships/teacher';
    return `mailto:?subject=2020%20Special%20Education%20Teacher%20Scholarship%20$1,000&body=I thought you might be interested in reading this SPED Talk article.%0D%0A%0D%0A2020%20Special%20Education%20Teacher%20Scholarship%20$1,000%0D%0A${url}%0D%0A%0D%0A`.replace(
      / /g,
      '%20'
    );
  };

  render() {
    return (
      <>
        <div className='resources'>
          <div>
            <h5 className='section-head mb-3'>SPEDxchange Scholarships</h5>
            <div className='article-wrap'>
              <div className='article'>
                <div>
                  <div>
                    <img
                      src='/assets/img/scholarship.png'
                      alt='Special Education Teacher Scholarship'
                    />
                  </div>
                </div>
                <div className='article-figure'>
                  <div className='share'>SHARE</div>
                  <Icon
                    link
                    circular
                    name='twitter'
                    onClick={() => this.handleSocialClick('twitter')}
                  />
                  <Icon
                    link
                    circular
                    name='linkedin'
                    onClick={() => this.handleSocialClick('linkedin')}
                  />
                  <Icon
                    link
                    circular
                    name='facebook'
                    onClick={() => this.handleSocialClick('facebook')}
                  />
                  <a href={this.setEmailLink()}>
                    <Icon link circular name='envelope outline' />
                  </a>
                </div>
                <h1 className='text-primary my-2'>
                  <strong>
                    2020 Special Education Teacher Scholarship -{' '}
                    <small>$</small>1,000
                  </strong>
                </h1>
                <p>
                  SPEDxchange is offering a $1,000 scholarship for undergraduate
                  or graduate students that are interested in working with
                  special needs students.
                </p>
                <p>
                  This award is for undergraduate or graduate students that are
                  pursuing a degree in folowing special education or a related
                  fields:
                </p>
                <p>
                  <strong>Special Education Teacher</strong>
                  <br />
                  <strong>Special Education Diagnosticians</strong>
                  <br />
                  <strong>Teachers of the Deaf and Hard of Hearing</strong>
                  <br />
                  <strong>Teachers of the Visually Impaired</strong>
                </p>
                <p>Applications will be accepted until September 15, 2020.</p>
                <p>
                  <em>
                    <strong>
                      Winner will be announced on October 15, 2020.
                    </strong>
                  </em>
                </p>
                <Button
                  color='green'
                  className='mb-3'
                  onClick={this.handleApply}
                >
                  Apply Today!
                </Button>
              </div>
            </div>
          </div>
          <hr className='my-3' />
          <div className='pt-3'>
            <h5 className='section-head purple mb-3'>More Scholarship Links</h5>
            {scholarshipList &&
              scholarshipList.map((item, idx) => (
                <div key={idx.toString()} className='mb-3'>
                  <a
                    href={item.link}
                    title={item.title}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {item.title}
                  </a>
                  <div>
                    Award: <strong>{item.amount}</strong>
                  </div>
                  <div>
                    Deadline: <strong>{item.deadline}</strong>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}

const mapState = state => ({
  auth: state.auth
});

const actions = {
  openModal
};

export default withRouter(connect(mapState, actions)(Scholarships));
