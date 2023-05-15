import React from 'react';

import Styles from './index.module.css';

type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

const Pagination = (props: PaginationProps) => {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={Styles.paginator}>
      <button
        className={Styles.arrow}
        type="button"
        onClick={handlePrevPageClick}
        disabled={disable.left}
        data-testid="pagination-prev-button"
      >
        {'<'}
      </button>
      {nav && (
        <span className={Styles.navigation} data-testid="pagination-navigation">
          {nav.current} / {nav.total}
        </span>
      )}
      <button
        className={Styles.arrow}
        type="button"
        onClick={handleNextPageClick}
        disabled={disable.right}
        data-testid="pagination-next-button"
      >
        {'>'}
      </button>
    </div>
  );
};

export default React.memo(Pagination);
