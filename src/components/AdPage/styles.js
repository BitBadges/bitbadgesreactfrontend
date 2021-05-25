import styled from "styled-components";

export const PortfolioPage = styled.section`
  position: relative;
  padding: 1rem 0 0rem;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 5.5rem 0 3rem;
  }
`;

export const Content = styled.p`
  padding: 0.75rem 0.4rem 0.75rem;
`;

export const ContentWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    max-width: 100%;
  }
`;
