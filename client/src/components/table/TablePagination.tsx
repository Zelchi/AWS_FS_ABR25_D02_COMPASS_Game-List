import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowIcon from "@/assets/icons/arrow.svg?react";
import { useGlobal } from "@/contexts/globalContext";
import { useLocation } from "react-router-dom";

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? "#23242b" : "transparent")};
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 4px 12px;
  margin: 0 4px;
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
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

const Arrow = styled.button<{ disabled?: boolean }>`
  color: #fff;
  font-size: 1rem;
  margin: 0 4px;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 0.7)};
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
`;

export const PaginationButtons = () => {
    const { page, setPage, pagination } = useGlobal();
    const totalPages = pagination.totalPages;
    const location = useLocation();

    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        setPage(1); 
    }, [location]);

    useEffect(() => {
        const timer = setTimeout(() => setShowButtons(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const getPages = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages - 1, totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, 2, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }
        return pages;
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
            setPage(newPage);
        }
    };

    if (!showButtons) return null;

    return (
        <PaginationWrapper>
            <Arrow
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
            >
                <ArrowIcon style={{ transform: "rotate(180deg)" }} />
            </Arrow>
            {getPages().map((p, idx) =>
                p === "..." ? (
                    <Ellipsis key={idx}>...</Ellipsis>
                ) : (
                    <PageButton
                        key={p}
                        $active={p === page}
                        onClick={() => handlePageChange(Number(p))}
                    >
                        {p}
                    </PageButton>
                )
            )}
            <Arrow
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
            >
                <ArrowIcon />
            </Arrow>
        </PaginationWrapper>
    );
}