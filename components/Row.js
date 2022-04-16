import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Row.module.css";
import { motion, useMotionValue } from "framer-motion";
import { months, isMonthIncluded } from "../utils";

const Row = ({ currentMonth, currentYear, isMonth }) => {
  const mWidth = useMotionValue(200);
  const x = useMotionValue(0);
  const leftRef = useRef(null);
  const rigthRef = useRef(null);
  const container = useRef(null);
  const [firstMonth, setFirstMonth] = useState(null);
  const [prcF, setPrcF] = useState(null);
  const [prcL, setPrcL] = useState(null);
  const [secondMonth, setSecondMonth] = useState(null);
  const handleClick_Resize = (e, info) => {
    mWidth.set(mWidth.get() + info.delta.x);
  };
  const handleLeftClick = (e, info) => {
    mWidth.set(mWidth.get() - info.delta.x);
    x.set(x.get() + info.delta.x);
  };
  const getSelected = () => {
    const xV = x.get();
    const w = mWidth.get();
    const col = 107;
    const numberSpacesX = (parseInt(xV / col) - 1) * 5;
    const numberSpacesTotal = (parseInt((xV + w) / col) - 1) * 5;
    const firstMonth =
      ((xV - numberSpacesX) / col) % 1 > 0.06
        ? Math.ceil((xV - numberSpacesX) / col)
        : Math.floor((xV - numberSpacesX) / col);
    const lastMonth =
      ((xV + w - numberSpacesTotal) / col) % 1 > 0.06
        ? Math.ceil((xV + w - numberSpacesTotal) / col)
        : Math.floor((xV + w - numberSpacesTotal) / col);
    console.log(
      ((xV - numberSpacesX) / col).toFixed(2),
      mWidth.get(),
      Math.ceil(((xV - numberSpacesX) / col).toFixed(2)),
      firstMonth,
      months[firstMonth - 1],
      parseInt((xV + w) / col) - 1,
      ((xV + w - numberSpacesTotal) / col) % 1,
      months[lastMonth - 1]
    );
    setPrcL(((xV + w - numberSpacesTotal) / col) % 1);
    setPrcF(((xV - numberSpacesX) / col) % 1);
    setFirstMonth(months[firstMonth - 1 < 0 ? 0 : firstMonth - 1]);
    setSecondMonth(months[lastMonth - 1]);
  };
  useEffect(() => {
    if (isMonthIncluded(currentMonth, firstMonth, secondMonth)) {
      if (currentMonth == firstMonth) {
        if (prcF > 0.06) x.set(container.current.offsetWidth * prcF);
        else x.set(0);
        if (months.indexOf(currentMonth) < months.indexOf(secondMonth)) {
          mWidth.set(container.current.offsetWidth);
        } else if (currentMonth == secondMonth)
          mWidth.set(container.current.offsetWidth * prcL);
      } else if (currentMonth == secondMonth) {
        x.set(0);
        mWidth.set(container.current.offsetWidth * prcL);
      } else {
        x.set(0);
        mWidth.set(container.current.offsetWidth);
      }
    } else {
      mWidth.set(0);
    }
  }, [isMonth, currentMonth]);
  return (
    <div
      className={styles.container}
      ref={container}
      onDoubleClick={() => {
        mWidth.set(100);
      }}
      onClick={getSelected}
    >
      <motion.div
        drag="x"
        dragConstraints={container}
        style={{
          display: "flex",
          width: "fit-content",
          position: "relative",
          x,
        }}
        dragElastic={false}
        dragMomentum={false}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <motion.div
            className={styles.timeLine}
            style={{ width: mWidth }}
            onDoubleClick={() => mWidth.set(0)}
          >
            <div
              className={styles.leftDragContainer}
              style={{ width: mWidth > 0 ? 0 : 20, height: "100%" }}
              ref={leftRef}
              onClick={getSelected}
            >
              <motion.div
                className={styles.leftDrag}
                drag="x"
                style={{
                  maxWidth: 20,
                  width: mWidth > 0 ? 0 : 20,
                  height: "100%",
                }}
                dragConstraints={leftRef}
                onDrag={handleClick_Resize}
                dragElastic={0}
                dragMomentum={false}
              />
            </div>
            <div
              className={styles.rightDragContainer}
              style={{ width: mWidth > 0 ? 0 : 20, height: "100%" }}
              ref={rigthRef}
              onClick={getSelected}
            >
              <motion.div
                className={styles.leftDrag}
                drag="x"
                style={{
                  maxWidth: 20,
                  width: mWidth > 0 ? 0 : 20,
                  height: "100%",
                }}
                dragConstraints={rigthRef}
                onDrag={handleLeftClick}
                dragElastic={false}
                dragMomentum={false}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
export default Row;
