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
    const nm_spaces = 5 * months.indexOf(currentMonth);
    const nm_months = 107 * months.indexOf(currentMonth);
    console.log(x.get() / 107, mWidth.get() / 107);
    if (!isMonth) {
      const selectedMonths = [];
      const xPos = x.get() / 107;
      "."
        .repeat(Math.ceil(mWidth.get() / 107))
        .split("")
        .map((e, i) => {
          console.log(
            (mWidth.get() / 107) % 1,
            mWidth.get() / 107,
            (xPos + mWidth.get() / 107 + 0.1) % 1,
            Math.floor(xPos + mWidth.get() / 107 + 0.1),
            Math.ceil(mWidth.get() / 107) - 1,
            i
          );
          if (i == 0) {
            console.log("PUSHING", i, Math.floor(x.get() / 107) + i);
            selectedMonths.push(months[Math.floor(x.get() / 107) + i]);
          }
          if (i == Math.ceil(mWidth.get() / 107) - 1) {
            console.log(
              "PUSHING",
              i,
              xPos + ((mWidth.get() / 107 + 0.1) % 1) < 0.2,
              (xPos + mWidth.get()) / 107 + 0.1,
              xPos + mWidth.get() / 107 + 0.1
            );
            selectedMonths.push(
              months[
                (mWidth.get() / 107 + 0.1) % 1 < 0.4
                  ? Math.floor(mWidth.get() / 107) - 1
                  : Math.ceil(mWidth.get() / 107) - 1
              ]
            );
          } else {
            console.log("PUSHING", i);
            selectedMonths.push(months[Math.ceil(x.get() / 107) + i]);
          }
        });
      const total = mWidth.get() + x.get();
      console.log(
        [...new Set(selectedMonths)],
        {
          first: ((x.get() / 107) % 1) * 100,
          last:
            (((total - Math.floor(mWidth.get() / 107) * 5) / 107) % 1) * 100,
        },
        Math.floor(mWidth.get() / 107),
        mWidth.get() + x.get() - (Math.floor(mWidth.get() / 107) - 1) * 5
      );
      setHandleLastFirst({
        first: ((x.get() / 107) % 1) * 100,
        last:
          (((mWidth.get() +
            x.get() -
            (Math.floor(mWidth.get() / 107) - 1) * 5) /
            107) %
            1) *
          100,
      });
      setSelectedMonths([...new Set(selectedMonths)]);
    } else {
      setSelectedMonths([...currentMonth]);

      const containerWidth = (x.get() / container.current.offsetWidth) * 100;
      const cn = (107 / 100) * containerWidth;

      beforeChange.x = nm_spaces + nm_months + cn;
      beforeChange.width = nm_months - beforeChange.x;
    }
  };
  useEffect(() => {
    if (isMonth) {
      console.log(currentMonth);
      if (!beforeChange.x)
        setBeforeChange({ x: x.get(), mWidth: mWidth.get() });
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
            x.set(
              (container.current.offsetWidth / 100) * handleLastFirst.first
            );
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
              (container.current.offsetWidth / 100) * handleLastFirst.last
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
    } else if (isCreated) {
      x.set(beforeChange.x);
      mWidth.set(beforeChange.mWidth);
      setBeforeChange({});
      getSelected();
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
