// src/components/Footer/styles.js
import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #f8f8f8;
  padding: 2rem 0;
`;

export const AppLogo = styled.img`
  width: 120px;
  height: auto;
`;

export const FooterContent = styled.p`
  margin-top: 1rem;
  font-size: 14px;
  color: #666;
  max-width: 300px;
`;

export const FooterLinkItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const FooterListItem = styled.div`
  min-width: 150px;
`;

export const FooterTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const FooterLink = styled.a`
  font-size: 14px;
  color: #444;
  text-decoration: none;
  margin-bottom: 0.4rem;

  &:hover {
    text-decoration: underline;
    color: #000;
  }
`;

export const FooterLogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

export const LogoContainer = styled.div`
  margin-bottom: 1rem;
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #999;
  flex-wrap: wrap;
`;

export const FooterBottomLinkDiv = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 1rem;
`;
