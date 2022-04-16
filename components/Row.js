import React, { useEffect, useRef } from "react";
import styles from "../styles/Row.module.css";
import { motion, useMotionValue } from "framer-motion";
import { months } from "../utils";

const Row = ({ currentMonth, currentYear, isMonth }) => {
  const mWidth = useMotionValue(0);
  const x = useMotionValue(0);
  const leftRef = useRef(null);
  const rigthRef = useRef(null);
  const container = useRef(null);
  const [selectedMonths, setSelectedMonths] = React.useState([]);
  const [beforeChange, setBeforeChange] = React.useState({});
  const [handleLastFirst, setHandleLastFirst] = React.useState({
    last: 0,
    first: 0,
  });
  const [isCreated, setIsCreated] = React.useState(false);
  const handleClick_Resize = (e, info) => {
    mWidth.set(mWidth.get() + info.delta.x);
  };
  const handleLeftClick = (e, info) => {
    mWidth.set(mWidth.get() - info.delta.x);
    x.set(x.get() + info.delta.x);
  };
  const getSelected = () => {
    console.log(x.get() / 107, mWidth.get() / 107);
    const selectedMonths = [];
    "."
      .repeat(Math.ceil(mWidth.get() / 107))
      .split("")
      .map((e, i) => {
        console.log((mWidth.get() / 107) % 1, mWidth.get() / 107, i);
        selectedMonths.push(months[Math.ceil(x.get() / 107) + i]);
      });

    setHandleLastFirst({
      first: ((x.get() / 107) % 1) * 100,
      last: ((mWidth.get() / 107) % 1) * 100,
    });
    setSelectedMonths(selectedMonths);
  };
  useEffect(() => {
    if (isMonth) {
      if (!beforeChange.x)
        setBeforeChange({ x: x.get(), mWidth: mWidth.get() });
      if (selectedMonths.includes(currentMonth)) {
        x.set(0);
        mWidth.set(container.current.offsetWidth);
        console.log(selectedMonths, currentMonth);
      } else {
        x.set(0);
        mWidth.set(0);
      }
    } else if (isCreated) {
      x.set(beforeChange.x);
      mWidth.set(beforeChange.mWidth);
      setBeforeChange({});
    }
  }, [isMonth]);
  useEffect(() => {
    if (selectedMonths.includes(currentMonth)) {
      if (
        selectedMonths.indexOf(currentMonth) == 0 ||
        selectedMonths.indexOf(currentMonth) == selectedMonths.length - 1
      ) {
        if (selectedMonths.indexOf(currentMonth) == 0) {
          console.log(
            (container.current.offsetWidth / 100) * handleLastFirst.first,
            handleLastFirst
          );
          x.set((container.current.offsetWidth / 100) * handleLastFirst.first);
          mWidth.set(
            (container.current.offsetWidth / 100) *
              (100 - handleLastFirst.first)
          );
          console.log(
            "---->",
            (container.current.offsetWidth / 100) *
              (100 - handleLastFirst.first),
            (container.current.offsetWidth / 100) * handleLastFirst.first
          );
        } else {
          x.set(0);
          mWidth.set(
            (container.current.offsetWidth / 100) * handleLastFirst.first
          );
        }
      } else {
        x.set(0);
        mWidth.set(container.current.offsetWidth);
      }
      console.log(selectedMonths, currentMonth);
    } else {
      x.set(0);
      mWidth.set(0);
    }
  }, [currentMonth]);
  return (
    <div
      className={styles.container}
      ref={container}
      onDoubleClick={() => {
        mWidth.set(100);
        setIsCreated(true);
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
