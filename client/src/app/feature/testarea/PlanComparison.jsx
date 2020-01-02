import React, { Component } from 'react';
import { connect } from 'react-redux';

import './plancomparison.scss';

export class PlanComparison extends Component {
  render() {
    return (
      <>
        <div className='comparison'>
          <table>
            <thead>
              <tr>
                <th className='tl tl2'></th>
                <th className='qbse'>Self-Employed & Freelance</th>
                <th colspan='3' className='qbo'>
                  Small businesses that need accounting, invoicing or payroll
                </th>
              </tr>
              <tr>
                <th className='tl'></th>
                <th className='compare-heading'>Self-Employed</th>
                <th className='compare-heading'>Simple Start</th>
                <th className='compare-heading'>Essentials</th>
                <th className='compare-heading'>Plus</th>
              </tr>
              <tr>
                <th></th>
                <th className='price-info'>
                  <div className='price-was'>Was £6.00</div>
                  <div className='price-now'>
                    <span>
                      £4<span className='price-small'>.20</span>
                    </span>{' '}
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
                  <div className='price-was'>Was £7.00</div>
                  <div className='price-now'>
                    <span>
                      £5<span className='price-small'>.60</span>
                    </span>{' '}
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
                  <div className='price-was'>Was £15.00</div>
                  <div className='price-now'>
                    <span>
                      £10<span className='price-small'>.50</span>
                    </span>{' '}
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
                  <div className='price-was'>Was £25.00</div>
                  <div className='price-now'>
                    <span>
                      £15<span className='price-small'>.00</span>
                    </span>{' '}
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td colspan='4'>Seperate business from personal spending</td>
              </tr>
              <tr className='compare-row'>
                <td>Seperate business/personal</td>
                <td>
                  <span className='tickblue'>✔</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Estimate tax payments</td>
              </tr>
              <tr>
                <td>Estimate tax payments</td>
                <td>
                  <span className='tickblue'>✔</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Track deductible mileage</td>
              </tr>
              <tr className='compare-row'>
                <td>Track deductible mileage</td>
                <td>
                  <span className='tickblue'>✔</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Download online banking</td>
              </tr>
              <tr>
                <td>Download online banking</td>
                <td>
                  <span className='tickblue'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Works on PC, Mac & mobile</td>
              </tr>
              <tr className='compare-row'>
                <td>Multi-device</td>
                <td>
                  <span className='tickblue'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Create invoices & estimates</td>
              </tr>
              <tr>
                <td>Create invoices & estimates</td>
                <td></td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Manage VAT</td>
              </tr>
              <tr className='compare-row'>
                <td>Manage VAT</td>
                <td></td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Run payroll</td>
              </tr>
              <tr>
                <td>Run payroll</td>
                <td></td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Number of users</td>
              </tr>
              <tr className='compare-row'>
                <td>Number of users</td>
                <td className='tickblue'>1 user</td>
                <td className='tickgreen'>1 user</td>
                <td className='tickgreen'>3 users</td>
                <td className='tickgreen'>5 users</td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Manage bills & payments</td>
              </tr>
              <tr>
                <td>Manage bills & payments</td>
                <td></td>
                <td></td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Handle multiple currencies</td>
              </tr>
              <tr className='compare-row'>
                <td>Handle multiple currencies</td>
                <td></td>
                <td></td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Create budgets</td>
              </tr>
              <tr>
                <td>Create budgets</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Track employee time</td>
              </tr>
              <tr className='compare-row'>
                <td>Track employee time</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td colspan='4'>Stock control</td>
              </tr>
              <tr>
                <td>Stock control</td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <span className='tickgreen'>✔</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlanComparison);
