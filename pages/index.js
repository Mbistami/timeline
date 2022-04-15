import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion, useMotionValue } from "framer-motion";
import React, { useState, useCallback, useRef } from "react";
import Row from "../components/Row";
import { Menu } from "@mui/material";
import Dropdown from "../components/Dropdown";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";

export default function Home() {
  const [isDown, setIsDown] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.topSide}>
          <div className={styles.topSideControls}>
            <div>
              <Dropdown
                dropdownText="Year"
                showIcon
                handleClick={handleClick}
                open={open}
              />
            </div>
            <div className={styles.navigationButton}>
              <div style={{ cursor: "pointer" }}>
                <ArrowBackIos fontSize="10px" />
              </div>
              <div>
                <p className={styles.navigationButtonText}>2022</p>
              </div>
              <div style={{ cursor: "pointer" }}>
                <ArrowForwardIos fontSize="10px" />
              </div>
            </div>
            <div style={{ width: "20%" }}>
              <Dropdown dropdownText="Project Modules (Default)" />
            </div>
            <div className={styles.topSideButton}>Save</div>
          </div>
          <div style={{ alignItems: "center", display: "flex" }}>
            <Dropdown dropdownText="Timelines" variant="green" />
          </div>
        </div>
        <div className={styles.bottomSide}>
          <div className={styles.innerLeftSide}>
            <p>test</p>
          </div>
          <div className={styles.innerRightSide}>
            <div className={styles.innerHeaderYear}>
              <p>2022</p>
            </div>
            <div className={styles.innerHeaderMonths}>
              <div>
                <p>Jan</p>
              </div>
              <div>
                <p>Feb</p>
              </div>
              <div>
                <p>Mar</p>
              </div>
              <div>
                <p>Apr</p>
              </div>
              <div>
                <p>May</p>
              </div>
              <div>
                <p>Jun</p>
              </div>
              <div>
                <p>Jul</p>
              </div>
              <div>
                <p>Aug</p>
              </div>
              <div>
                <p>Sep</p>
              </div>
              <div>
                <p>Oct</p>
              </div>
              <div>
                <p>Nov</p>
              </div>
              <div>
                <p>Dec</p>
              </div>
            </div>
            <div
              style={{ display: "flex", gap: "5px", flexDirection: "column" }}
              className={styles.rows}
            >
              {"."
                .repeat(11)
                .split("")
                .map((dot, index) => (
                  <Row key={index} />
                ))}
            </div>
          </div>
        </div>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <p>TEXT</p>
        </Menu>
      </div>
    </div>
  );
}
