import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

import './plancomparison.scss';

export class PlanComparison extends Component {
  state = {
    price: 500,
    count: 5000
  };

  handleSizeChange = (e, { name, value }) => {
    console.log('name, value: ', name, value);
    this.setState({ [name]: value });

    if (value > 50000) {
      this.setState({ price: 2001 });
    } else if (value > 25000) {
      this.setState({ price: 2000 });
    } else if (value > 10000) {
      this.setState({ price: 1000 });
    } else if (value > 2500) {
      this.setState({ price: 500 });
    } else {
      this.setState({ price: 250 });
    }
  };

  render() {
    const { count } = this.state;
    return (
      <>
        <div className='comparison'>
          <table>
            <thead>
              <tr>
                <th className='tl tl2'></th>
                <th className='qbse'>FREE</th>
                <th className='qbsa'>PUBLIC SCHOOLS BY ENROLLMENT</th>
                <th className='qbo'>PRIVATE ORGANIZATION</th>
              </tr>
              <tr>
                <th></th>
                <th className='price-info'>
                  <div className='price-now'>
                    <span>$0</span>/month
                  </div>
                  <div>
                    <a href='/checkout' className='price-buy'>
                      Start <span className='hide-mobile'>Now</span>
                    </a>
                  </div>
                  <div className='price-try'>
                    <span className='hide-mobile'>&nbsp;</span>
                  </div>
                </th>
                <th className='price-info'>
                  <div className='price-now'>
                    <span>$500</span>
                    /month
                  </div>
                  <div>
                    <a href='/checkout' className='price-buy'>
                      Buy <span className='hide-mobile'>Now</span>
                    </a>
                  </div>
                  <div className='price-try'>
                    <span className='hide-mobile'>or </span>
                    <a href='/checkout'>
                      try <span className='hide-mobile'>it free</span>
                    </a>
                  </div>
                </th>
                <th className='price-info'>
                  <div className='price-now'>
                    <span>&nbsp;</span>
                    &nbsp;
                  </div>
                  <div>
                    <a href='/checkout' className='price-buy'>
                      Contact Us
                    </a>
                  </div>
                  <div className='price-try'>
                    <span className='hide-mobile'>or </span>
                    <a href='/checkout'>
                      try <span className='hide-mobile'>it free</span>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td colspan='3'>School Listing</td>
              </tr>
              <tr className='compare-row'>
                <td>School Listing</td>
                <td>
                  <span className='tickblue'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='3'>Promotional Landing Page</td>
              </tr>
              <tr>
                <td>Promotional Landing Page</td>
                <td>
                  <span className='tickblue'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='3'>SPED Graduate Outreach</td>
              </tr>
              <tr className='compare-row'>
                <td>SPED Graduate Outreach</td>
                <td></td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='3'>Download online banking</td>
              </tr>
              <tr>
                <td>Download online banking</td>
                <td>
                  <span className='tickblue'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='3'>Works on PC, Mac & mobile</td>
              </tr>
              <tr className='compare-row'>
                <td>Multi-device</td>
                <td>
                  <span className='tickblue'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
                <td>
                  <span className='tickgreen'>&#10004;</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='enrollment-selector'>
          <Form>
            <Form.Input min={0} max={50000} name='count' step={1000} onChange={this.handleSizeChange} type='range' value={count} />
          </Form>
          <div className='sliderticks'>
            <p>0</p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p>50K</p>
          </div>
          <div className='label'>Number of Students</div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlanComparison);
