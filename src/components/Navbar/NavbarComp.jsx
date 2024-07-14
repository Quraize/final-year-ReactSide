import "./NavbarStyles.css";
import Logo from "../../assets/pics/logo.png";
import { useState,  useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from 'react-bootstrap/Dropdown';
import AOS from 'aos';
import 'aos/dist/aos.css';

import {motion} from "framer-motion";
import { NavbarVariantDesktop, NavbarDivVariant} from "../Animation/AnimateVariant";
import {useMediaQuery} from "react-responsive";
import { Link } from "react-router-dom";

export default function NavbarComp() {
  //for hovering animation
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringEvolution, setIsHoveringEvolution] = useState(false);
  const [isHoveringAnalysis, setIsHoveringAnalysis] = useState(false);
  const [isHoveringConversion, setIsHoveringConversion] = useState(false);
  const [isHoveringFeature, setIsHoveringFeature] = useState(false);
  const [isHoveringSign, setIsHoveringSign] = useState(false);
  //for responsiveness
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktopOrLaptop = useMediaQuery({
      query: '(min-width: 1224px)'
    });

  //for animation on scroll
  useEffect(() => {
    AOS.init({
        duration: 1300,
        easing: 'ease-in-out-back'
    })
  }, [])

  return (
    <div>  
        <Navbar collapseOnSelect fixed="top" expand="lg" className="self-nav" as={motion.div}  variants={NavbarDivVariant} initial="initial" animate="final">
         <Container>
          <Navbar.Brand as={motion.span} variants={NavbarVariantDesktop} initial={isHoveringLogo ? "hoverInitial" : "initial" } animate={isHoveringLogo ? "hoverFinale" : "final" } onHoverStart={() => setIsHoveringLogo(true)} onHoverEnd={() => setIsHoveringLogo(false)}>
            <a href="\"><img src={Logo} alt="Voxalyze" height={60} width={60} style={{cursor: 'pointer'}}/></a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
           <Nav className="nav-content">
              <Dropdown id="dropdown-basic" className="nav-dropdown nav-dropdown-evolution" as={motion.span} variants={NavbarVariantDesktop} initial={isHoveringEvolution ? "hoverInitial" : "initial" } animate={isHoveringEvolution ? "hoverFinale" : "final" } onHoverStart={() => setIsHoveringEvolution(true)} onHoverEnd={() => setIsHoveringEvolution(false)}>
                 <Dropdown.Toggle as={"span"}>Evaluation</Dropdown.Toggle>
                  <Dropdown.Menu as={"div"} variant={"dark"} className="nav-dropdown-menu">
                    <Dropdown.Item>Summarize</Dropdown.Item>
                    <Dropdown.Item>Language Scoring</Dropdown.Item>
                    <Dropdown.Item>Topic Tagging / Keyword</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
              <Dropdown id="dropdown-basic" className="nav-dropdown nav-dropdown-analysis" as={motion.span} variants={NavbarVariantDesktop} initial={isHoveringAnalysis ? "hoverInitial" : "initial" } animate={isHoveringAnalysis ? "hoverFinale" : "final" } onHoverStart={() => setIsHoveringAnalysis(true)} onHoverEnd={() => setIsHoveringAnalysis(false)}>
                 <Dropdown.Toggle as={"span"}>Analysis</Dropdown.Toggle>
                  <Dropdown.Menu as={"div"} variant={"dark"} className="nav-dropdown-menu">
                    <Dropdown.Item>Language Detection</Dropdown.Item>
                    <Dropdown.Item href="/sentimentanalysis">Sentiment Analysis</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
              <Dropdown id="dropdown-basic" className="nav-dropdown nav-dropdown-conversion" as={motion.span} variants={NavbarVariantDesktop} initial={isHoveringConversion ? "hoverInitial" : "initial" } animate={isHoveringConversion ? "hoverFinale" : "final" } onHoverStart={() => setIsHoveringConversion(true)} onHoverEnd={() => setIsHoveringConversion(false)}>
                 <Dropdown.Toggle as={"span"}>Conversion</Dropdown.Toggle>
                  <Dropdown.Menu as={"div"} variant={"dark"} className="nav-dropdown-menu">
                    <Dropdown.Item>Translation</Dropdown.Item>
                    <Dropdown.Item href="/texttospeech">Text-to-Speech</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/texttoimage">Text-to-Image</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
              <Nav.Link className="nav-feature" as={motion.span} variants={NavbarVariantDesktop} initial={isHoveringFeature ? "hoverInitial" : "initial" } animate={isHoveringFeature ? "hoverFinale" : "final" } onHoverStart={() => setIsHoveringFeature(true)} onHoverEnd={() => setIsHoveringFeature(false)}>Features</Nav.Link>
              <Nav.Link href="#memes" className="nav-sign-up" as={motion.span} variants={NavbarVariantDesktop} initial={isHoveringSign ? "hoverInitial" : "initial" } animate={isHoveringSign ? "hoverFinale" : "final" } onMouseOver={() => setIsHoveringSign(true)} onMouseLeave={() => setIsHoveringSign(false)}>Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
