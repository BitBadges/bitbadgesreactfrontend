import { lazy } from 'react';

import IntroContent from '../../content/IntroContent.json';
import MiddleBlockContent from '../../content/MiddleBlockContent.json';
import AboutContent from '../../content/AboutContent.json';
import MissionContent from '../../content/MissionContent.json';
import ProductContent from '../../content/ProductContent.json';
import ContactContent from '../../content/ContactContent.json';

const ContactFrom = lazy(() => import('../../components/ContactForm'));
const ContentBlock = lazy(() => import('../../components/ContentBlock'));
const MiddleBlock = lazy(() => import('../../components/MiddleBlock'));
const Container = lazy(() => import('../../common/Container'));
const ScrollToTop = lazy(() => import('../../common/ScrollToTop'));

const Explore = () => {
  return (
    <Container>
      <ScrollToTop />
      <MiddleBlock
        first="true"
        title={'Coming Soon'}
        icon="developer.svg"
        content={'For now, check out the BitBadges docs at bitbadges.github.io'}
        id="intro"
      />
    </Container>
  );
};

export default Explore;
