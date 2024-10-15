import { Box, Grid } from "@mui/material";
import React from "react";
import "./subfooter.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { BsInstagram } from "react-icons/bs";
import { GrYoutube } from "react-icons/gr";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BiLogoPinterest } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import LOCAL_IMAGES from "../utils/localImages";

import {SiFacebook} from 'react-icons/si'

export default function SubFooter() {
  return (
    <Box sx={{ backgroundColor: "#000000" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "85px",
            width: "240px",
          }}
        >
          <img
            src={LOCAL_IMAGES.APP_LOGO}
            alt="Applogo"
            style={{ height: "100%", width: "100%", marginTop: "1px" }}
          />
        </div> */}
      </div>
      {/* <Grid > */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul className="listcontainer">
          <Link to={"corporateEvent"}>
            <li>Corporate Event</li>
          </Link>
          <Link to={"/contactus"}>
            <li>Contact Us</li>
          </Link>
          <Link to="'/bookAppointment'">
            <li>Book An Appointment</li>
          </Link>
          <Link to={"/franchise"}>
            <li>Franchise</li>
          </Link>
        </ul>
      </div>
      {/* </Grid> */}
      <Box
        sx={{ display: "flex", justifyContent: "center", flexDirection: "row" ,}}
      >
        <ul className="iconcontainer">
          {/* <Link to={'https://www.facebook.com/monsoonsalon/'}> */}
          <a href="https://www.facebook.com/monsoonsalon/">
            <li id="facebook">
              {" "}
              <SiFacebook fontSize={33}
              style={{color:'white'}}
             />
            </li>
          </a>

          <a href="https://www.instagram.com/monsoonsalon/">
            <li>
              {" "}
              <BsInstagram fontSize={32} onMouseOver={(target)=>target.style } 
              style={{color:'white'}}
              />
            </li>
          </a>
          <a href="https://www.youtube.com/user/monsoonsalon"
              style={{color:'white'}}
              >
            <li>
              {" "}
              <GrYoutube fontSize={35} />
            </li>
          </a>
          <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fmonsoonsalon"
              style={{color:'white'}}
              >
            <li>
              <AiFillTwitterCircle fontSize={35} 
              style={{color:'white'}}
              />
            </li>
          </a>
          <a href="https://in.pinterest.com/monsoonsalon/">
            <li>
              <BiLogoPinterest fontSize={35} 
              style={{color:'white'}}
              />
            </li>
          </a>
          <a href="">
            <li>
              <FaLinkedin fontSize={32}
              style={{color:'white'}}
              />
            </li>
          </a>
        </ul>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul className="listcontainerprivacy">
          {/* <li>Blog</li> */}
          <li>Carrer</li>
          <li>Privacy</li>
        </ul>
      </div>
    </Box>
  );
}
