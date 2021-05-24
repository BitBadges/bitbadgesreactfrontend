import { lazy } from "react";

import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";

const ContactFrom = lazy(() => import("../../components/ContactForm"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        first="true"
        title={"Welcome to BitBadges!"}
        content={
          "BitBadges is a platform that allows BitClout users to issue badges to other BitClout users! This fosters more interaction between a creator and their audience."
        }
        icon="developer.svg"
        id="intro"
      />
      <ContentBlock
        type="left"
        title={"How It Works"}
        content={
          "There are two main parts to BitBadges -- 1) the issuing of badges and 2) showcasing your portfolio. Badges can be issued by any user and to any user for any purpose, but once a badge is issued, it is permanent and can't be changed. Badges have an optional start and end date which can be used to prove validity of the badge. This could be useful for let's say a gym membership. The other aspect of BitBadges is a portfolio. User's can showcase the badges they have earned on their BitBadges profile page. You can have many different sections on your portfolio if you want -- for example, you may have an education page where you showcase your diploma badges and an athletics page where you showcase the triathlon you just completed!"
        }
        icon="waving.svg"
      />
      <ContentBlock
        type="right"
        title={"Future Use Cases"}
        content={
          "We believe that BitBadges can help build the next era of social media. Badges can be used for any purpose, but here are a couple use cases we are excited about -- 1) creators issuing access tokens to premium content such as a private message group or a concert, and 2) entities such as universities or companies can offer certification of completion of classes or trainings through a badge."
        }
        icon="graphs.svg"
        id="about"
      />
      <ContentBlock
        type="left"
        title={"Vision"}
        content={
          "BitBadges intends to be a completely open source and community driven project. BitBadges is not a company, just code and a community."
        }
        icon="product-launch.svg"
        id="mission"
      />

      <ContactFrom
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
