import "./NavbarStyles.css";
import Logo from "../../assets/pics/logo.png";
import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { NavbarVariantDesktop, NavbarDivVariant } from "../Animation/AnimateVariant";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // FontAwesome icon for Sign Out
import { signOut } from "../../store/slices/SignInSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NavbarComp() {
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringEvolution, setIsHoveringEvolution] = useState(false);
  const [isHoveringAnalysis, setIsHoveringAnalysis] = useState(false);
  const [isHoveringConversion, setIsHoveringConversion] = useState(false);
  const [isHoveringSignOut, setIsHoveringSignOut] = useState(false); // Hover state for Sign Out
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  

  useEffect(() => {
    AOS.init({
      duration: 1300,
      easing: "ease-in-out-back",
    });
  }, []);

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin"); // Redirect to the Sign In page
  };

  return (
    <div>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        className="self-nav"
        as={motion.div}
        variants={NavbarDivVariant}
        initial="initial"
        animate="final"
      >
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand
            as={motion.span}
            variants={NavbarVariantDesktop}
            initial={isHoveringLogo ? "hoverInitial" : "initial"}
            animate={isHoveringLogo ? "hoverFinale" : "final"}
            onHoverStart={() => setIsHoveringLogo(true)}
            onHoverEnd={() => setIsHoveringLogo(false)}
          >
            <a href="\">
              <img
                src={Logo}
                alt="Voxalyze"
                height={60}
                width={60}
                style={{ cursor: "pointer" }}
              />
            </a>
          </Navbar.Brand>

          {/* Navbar Toggle for Mobile */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            {/* Navbar Items */}
            <Nav className="nav-content">
              <Dropdown
                id="dropdown-basic"
                className="nav-dropdown nav-dropdown-evolution"
                as={motion.span}
                variants={NavbarVariantDesktop}
                initial={isHoveringEvolution ? "hoverInitial" : "initial"}
                animate={isHoveringEvolution ? "hoverFinale" : "final"}
                onHoverStart={() => setIsHoveringEvolution(true)}
                onHoverEnd={() => setIsHoveringEvolution(false)}
              >
                <Dropdown.Toggle as={"span"}>Evaluation</Dropdown.Toggle>
                <Dropdown.Menu as={"div"} variant={"dark"} className="nav-dropdown-menu">
                  <Dropdown.Item href="/summarization">Summarize</Dropdown.Item>
                  <Dropdown.Item href="/scoring">Topic Tagging / Keyword</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown
                id="dropdown-basic"
                className="nav-dropdown nav-dropdown-analysis"
                as={motion.span}
                variants={NavbarVariantDesktop}
                initial={isHoveringAnalysis ? "hoverInitial" : "initial"}
                animate={isHoveringAnalysis ? "hoverFinale" : "final"}
                onHoverStart={() => setIsHoveringAnalysis(true)}
                onHoverEnd={() => setIsHoveringAnalysis(false)}
              >
                <Dropdown.Toggle as={"span"}>Analysis</Dropdown.Toggle>
                <Dropdown.Menu as={"div"} variant={"dark"} className="nav-dropdown-menu">
                  <Dropdown.Item href="/languagedetect">Language Detection/Score</Dropdown.Item>
                  <Dropdown.Item href="/sentimentanalysis">Sentiment Analysis</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown
                id="dropdown-basic"
                className="nav-dropdown nav-dropdown-conversion"
                as={motion.span}
                variants={NavbarVariantDesktop}
                initial={isHoveringConversion ? "hoverInitial" : "initial"}
                animate={isHoveringConversion ? "hoverFinale" : "final"}
                onHoverStart={() => setIsHoveringConversion(true)}
                onHoverEnd={() => setIsHoveringConversion(false)}
              >
                <Dropdown.Toggle as={"span"}>Conversion</Dropdown.Toggle>
                <Dropdown.Menu as={"div"} variant={"dark"} className="nav-dropdown-menu">
                  <Dropdown.Item href="/texttospeech">Text-to-Speech</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/texttoimage">Text-to-Image</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Sign Out Icon */}
              <motion.div
                className="nav-signout"
                variants={NavbarVariantDesktop}
                initial={isHoveringSignOut ? "hoverInitial" : "initial"}
                animate={isHoveringSignOut ? "hoverFinale" : "final"}
                onHoverStart={() => setIsHoveringSignOut(true)}
                onHoverEnd={() => setIsHoveringSignOut(false)}
                onClick={handleSignOut}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: isHoveringSignOut ? "#1976d2" : "#000", // Hover color change
                  fontSize: "20px",
                  marginLeft: "20px",
                  marginTop: "10px",
                  marginRight:"40px"
                }}
              >
                <FaSignOutAlt /> {/* FontAwesome Sign Out Icon */}
              </motion.div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
