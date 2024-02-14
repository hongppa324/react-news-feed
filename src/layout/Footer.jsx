import React from "react";
import { StyledFooter } from "../styles/MyStyles";
import { FcStart } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import { VscTwitter } from "react-icons/vsc";
import { FaFacebookSquare } from "react-icons/fa";
import { SiCoffeescript } from "react-icons/si";
import { FaWaze } from "react-icons/fa";
import { LuDog } from "react-icons/lu";
import { FaReact } from "react-icons/fa";
import { GiSaxophone } from "react-icons/gi";
import { FaBookAtlas } from "react-icons/fa6";

function Footer() {
  return (
    <StyledFooter>
      <p>
        컴포넌트
        <FaReact /> 카페 : 홍승찬 사장
        <SiCoffeescript />
      </p>
      <p>
        존잘 : 남지현
        <GiSaxophone />
      </p>
      <p>
        청착아맑산 : 정보연 <LuDog />
      </p>
      <p>
        김밥과 탄산 : 성예지
        <FaWaze />
      </p>
      <p>
        공학박사 : 조연진
        <FaBookAtlas />
      </p>
      <FcStart />
      <VscGithub />
      <VscTwitter />
      <FaFacebookSquare />
    </StyledFooter>
  );
}

export default Footer;
