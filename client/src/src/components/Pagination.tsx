import React from 'react';
import styled from 'styled-components';
import LeftIcon from '../assets/icons/Left.png';
import RightIcon from '../assets/icons/Right.png';

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding-bottom: 0;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? '#23242b' : 'transparent')};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 4px 12px;
  margin: 0 4px;
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  cursor: pointer;
  transition: background 0.2s;
  outline: none;
  &:hover {
    background: #23242b;
  }
`;

const Ellipsis = styled.span`
  color: #fff;
  margin: 0 8px;
  font-size: 1rem;
`;

const Arrow = styled.span`
  color: #fff;
  font-size: 1rem;
  margin: 0 4px;
  opacity: 0.7;
`;

const ArrowImg = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin: 0 4px;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <PaginationWrapper>
      <Arrow as="button" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={{ opacity: currentPage === 1 ? 0.3 : 1, background: 'none', border: 'none', cursor: currentPage === 1 ? 'default' : 'pointer', display: 'flex', alignItems: 'center' }}>
        <ArrowImg src={LeftIcon} alt="Previous" /> Previous
      </Arrow>
      {getPages().map((page, idx) =>
        page === '...'
          ? <Ellipsis key={idx}>...</Ellipsis>
          : <PageButton key={page} active={page === currentPage} onClick={() => onPageChange(Number(page))}>{page}</PageButton>
      )}
      <Arrow as="button" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={{ opacity: currentPage === totalPages ? 0.3 : 1, background: 'none', border: 'none', cursor: currentPage === totalPages ? 'default' : 'pointer', display: 'flex', alignItems: 'center' }}>
        Next <ArrowImg src={RightIcon} alt="Next" />
      </Arrow>
    </PaginationWrapper>
  );
};

export default Pagination; 