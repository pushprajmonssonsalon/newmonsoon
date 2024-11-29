import { useState } from "react";
import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LOCAL_IMAGES from "../utils/localImages";
import useWindowDimensions from "../../hooks/WindowDimension";

const Header = () => {
  const { width } = useWindowDimensions();
  const [backgroundcolor, setBackgroundcolor] = useState(true);
  const navigate = useNavigate();
  const loactiondata = useLocation();
  const { pathname } = loactiondata;
  // 
  const onpressgallery = () => {
    navigate("/gallery");
  };

  const salonfinder = () => {
    navigate("/salonfinder");
  };

  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />;
  const [shownav, setShowNav] = useState(false);
  // 
  const onpresshamburger = () => {
    setShowNav(!shownav);
  };
  
  document.addEventListener("scroll", function () {
    const { scrollY } = window;
    const navbar = document.getElementById("listcontainer");
    if (navbar && scrollY > 150 && width > 600) {
      setBackgroundcolor(true);
      navbar.style.padding = "10px 7px";
    } else if (scrollY < 150 && width > 600) {
      navbar.style.padding = "16px 16px";
      setBackgroundcolor(false);
    }
  });
  return (
    <div className="GlobalContainter">
      <div
        className={`listMainContainer ${
          pathname.includes("bookAppointment") && "bookappointmentHeader "
        } ${
          pathname.includes("bookAppointment") && backgroundcolor
            ? "bookappointmentBackground "
            : ""
        }`}
        id="listcontainer"
      >
        <Link to={"/"}>
          <div className="applogo">
            <img
              src={LOCAL_IMAGES.APP_LOGO}
              alt="Applogo"
              loading="lazy"
              style={{ height: "100%", width: "100%", marginTop: "1px" }}
            />
          </div>
        </Link>

        <div className={shownav ? "desktop" : "mobile"}>
          <ul className="listname ">
            <li id="headerlist" onClick={() => onpresshamburger()}>
              <Link
                to={"/"}
                className={`booktext ${
                  pathname.includes("bookAppointment") &&
                  "bookappointTextcolor "
                } ${
                  pathname.includes("bookAppointment") &&
                  backgroundcolor &&
                  "bookappointmenttextscroll "
                }`}
              >
                Home
              </Link>
            </li>

            <li onClick={() => onpresshamburger()}>
              <Link
                className={`booktext ${
                  pathname.includes("bookAppointment") &&
                  "bookappointTextcolor "
                } ${
                  pathname.includes("bookAppointment") &&
                  backgroundcolor &&
                  "bookappointmenttextscroll "
                }`}
                to={"/franchise"}
              >
                {" "}
                Franchise
              </Link>
            </li>

            <li id="media">
              <div style={{ display: "flex" }} className="mediaicontext">
                <span
                  //  className="mediatext"
                  className={`booktext ${
                    pathname.includes("bookAppointment") && "bookappointmedia "
                  } ${
                    pathname.includes("bookAppointment") &&
                    backgroundcolor &&
                    "bookappointmenttextscroll "
                  }`}
                  onClick={() => {
                    onpressgallery();
                  }}
                >
                  Gallery
                </span>
              </div>
            </li>
            <li className="mobileviewmedia" onClick={onpresshamburger}>
              <div style={{ display: "flex" }} className="mediaicontext">
                <span
                  style={{ color: "black", fontSize: "18px" }}
                  onClick={() => {
                    onpressgallery();
                  }}
                >
                  Gallery
                </span>
              </div>
            </li>
            <li onClick={onpresshamburger}>
              <Link
                to={"/about"}
                className={`booktext ${
                  pathname.includes("bookAppointment") &&
                  "bookappointTextcolor "
                } ${
                  pathname.includes("bookAppointment") &&
                  backgroundcolor &&
                  "bookappointmenttextscroll "
                }`}
              >
                AboutUs
              </Link>
            </li>
            <li onClick={onpresshamburger}>
              <Link
                to={"/bookAppointment"}
                className={`booktext ${
                  pathname.includes("bookAppointment") &&
                  "bookappointTextcolor "
                } ${
                  pathname.includes("bookAppointment") &&
                  backgroundcolor &&
                  "bookappointmenttextscroll "
                }`}
              >
                Book Appointment
              </Link>
            </li>

            <li className="salonfinder">
              {/* <div > */}
              <p
                style={{
                  color: "#FFFFFF",
                  fontSize: "17px",
                  fontWeight: "500",
                }}
                onClick={() => {
                  salonfinder();
                  onpresshamburger();
                }}
              >
                Salon Finder{" "}
              </p>

              <LocationOnOutlinedIcon
                style={{ color: "#ffff", height: 19, width: 20 }}
              />
              {/* </div> */}
            </li>
          </ul>
        </div>

        <div className="menu_icon" onClick={onpresshamburger}>
          <img
            src="https://icon-library.com/images/white-menu-icon/white-menu-icon-0.jpg"
            alt="hamburger"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
