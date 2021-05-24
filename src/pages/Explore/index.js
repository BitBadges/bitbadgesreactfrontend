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

const Explore = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        first="true"
        title={"Coming Soon"}
        content={
          "This will be a page to explore how to earn different badges. Users can create advertisement pages for their badges. For now, check out the links below for a sample into how BitBadges work!"
        }
        icon="https://bitbadges.s3.amazonaws.com/badge.png"
        id="intro"
      />
      <p>
        Sample Profile -{" "}
        <a href="https://bitbadges.web.app/user/BC1YLiXsLZvrySthVJPJozLr3rMSo2BARZ4VG525bhbsAJCTvwJQJCe">
          Click Here{" "}
        </a>
        <br></br>
        Sample Badge -{" "}
        <a href="https://bitbadges.web.app/badge/QmcLBvoTY1Mq4DTCCHWXofv39HDnJeqTvGHFWpjsbNmRcc">
          Click Here
        </a>
      </p>
    </Container>
  );
};

export default Explore;
