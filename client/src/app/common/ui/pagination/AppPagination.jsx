import React from 'react';

const AppPagination = config => {
  state = {
    activePage: config.activePage || 1,
    boundaryRange: config.boundaryRange || 0,
    siblingRange: config.siblingRange || 2,
    showEllipsis: config.showEllipsis || true,
    showFirstAndLastNav: config.showFirstAndLastNav || false,
    showPreviousAndNextNav: config.showPreviousAndNextNav || true,
    totalPages: config.totalPages || 0
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage });
  };

  const { activePage, boundaryRange, siblingRange, showEllipsis, showFirstAndLastNav, showPreviousAndNextNav, totalPages } = this.state;

  return (
    totalPages > 1 && (
      <Pagination
        className='questions'
        pointing
        secondary
        activePage={activePage}
        boundaryRange={boundaryRange}
        onPageChange={this.handlePaginationChange}
        size='mini'
        siblingRange={siblingRange}
        totalPages={totalPages}
        ellipsisItem={showEllipsis ? undefined : null}
        firstItem={showFirstAndLastNav ? undefined : null}
        lastItem={showFirstAndLastNav ? undefined : null}
        prevItem={showPreviousAndNextNav ? undefined : null}
        nextItem={showPreviousAndNextNav ? undefined : null}
      />
    )
  );
};

export default AppPagination;
