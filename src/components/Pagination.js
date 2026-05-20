import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { colors } from '../tokens'

const PaginationWrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 720px;
  padding: 28px 16px 8px;
  margin: 1.5rem auto 2rem;
  gap: 12px;

  @media (max-width: 564px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${colors.primary};
  color: ${colors.white} !important;
  padding: 11px 18px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85em;
  letter-spacing: 0.03em;
  text-decoration: none !important;
  transition: background 220ms ease, transform 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    background: #142634;
    transform: translateY(-2px);
    box-shadow: 0 12px 22px -12px rgba(36, 62, 80, 0.4);
    text-decoration: none !important;
  }

  @media (max-width: 564px) {
    justify-content: center;
    width: 100%;
  }
`

const PrevBtn = styled(Link)`
  ${buttonBase}
  order: 1;

  &::before {
    content: '←';
    font-size: 1.05em;
    transition: transform 220ms ease;
  }

  &:hover::before {
    transform: translateX(-4px);
  }

  @media (max-width: 564px) {
    order: 2;
  }
`

const NextBtn = styled(Link)`
  ${buttonBase}
  order: 3;

  &::after {
    content: '→';
    font-size: 1.05em;
    transition: transform 220ms ease;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`

const Spacer = styled.span`
  display: block;
  flex: 0 0 auto;
  min-width: 160px;
  order: ${({ $side }) => ($side === 'previous' ? 1 : 3)};

  @media (max-width: 564px) {
    display: none;
  }
`

const PageInfo = styled.span`
  order: 2;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 0.85em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.textLight};

  @media (max-width: 564px) {
    order: 1;
    text-align: center;
  }
`

const Pagination = ({ currentPage, nbPages }) => {
  const previousUrl = currentPage === 2 ? '/blog/' : `/pages/${currentPage - 1}/`

  return (
    <PaginationWrapper>
      {currentPage !== 1 ? (
        <PrevBtn to={previousUrl}>Nowsze posty</PrevBtn>
      ) : (
        <Spacer $side="previous" />
      )}

      <PageInfo>
        Strona {currentPage} z {nbPages}
      </PageInfo>

      {currentPage < nbPages ? (
        <NextBtn to={`/pages/${currentPage + 1}/`}>Starsze posty</NextBtn>
      ) : (
        <Spacer $side="next" />
      )}
    </PaginationWrapper>
  )
}

export default Pagination
