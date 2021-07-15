import { lazy } from 'react';

const ContactFrom = lazy(() => import('../../components/ContactForm'));
const ContentBlock = lazy(() => import('../../components/ContentBlock'));
const MiddleBlock = lazy(() => import('../../components/MiddleBlock'));
const Container = lazy(() => import('../../common/Container'));
const ScrollToTop = lazy(() => import('../../common/ScrollToTop'));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        first="true"
        title={'Welcome to BitBadges!'}
        content={
          'BitBadges is a platform that allows BitClout users to issue NFT badges to other BitClout users! Issue badges to others, advertise how to earn your badge, and show off the badges you have earned!'
        }
        icon="./img/icons/logo.png"
        id="intro"
      />
      <ContentBlock
        type="left"
        title={'Explore Badges'}
        content={
          'Explore badges currently being offered by other users! Complete whatever task they want you to do and claim your badge! Badges can be offered for premium content access, awards, diplomas, certifications, memberships, anything!'
        }
        icon="https://bitbadges.s3.amazonaws.com/explore.png"
        button={{ title: 'Explore', href: '/explore' }}
        id="about"
      />
      <ContentBlock
        type="right"
        title={'Issue a badge!'}
        content={
          "Let's get started! Issue a badge by clicking the button below. Badges can be issued to any BitClout user and for any purpose. Start by issuing a badge with BitBadges as the recipient and title it 'My First Badge'!"
        }
        button={{ title: 'Issue a badge!', href: '/issue' }}
        icon="https://bitbadges.s3.amazonaws.com/MyFirstBadge.PNG"
      />
      <ContentBlock
        type="left"
        title={'Advertise your badge!'}
        content={
          'Have an idea in mind for a badge? Advertise to other users by posting on your BitClout!' // by clicking the button below
        }
        button={{
          title: 'Advertise your badge!',
          href: 'https://www.bitclout.com',
        }} //"/issuead"
        icon="https://bitbadges.s3.amazonaws.com/officialcloutbadge.png"
      />

      <ContentBlock
        type="right"
        title={'Vision and the Future'}
        content={
          'BitBadges intends to be a completely open source and community driven project. BitBadges creator coins will be given out to those who help maintain the ecosystem and innovate upon it. For more info, view documentation by clicking button below or join the discord at discord.gg/TJMaEd9bar'
        }
        button={{
          title: 'Documentation',
          href: 'https://bitbadges.github.io',
        }}
        icon="./img/icons/logo.png"
        id="mission"
      />
    </Container>
  );
};

export default Home;
