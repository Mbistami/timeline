import React, { useRef } from "react";
import styles from "../styles/Row.module.css";
import { motion, useMotionValue } from "framer-motion";

const Row = () => {
  const mWidth = useMotionValue(200);
  const x = useMotionValue(0);
  const leftRef = useRef(null);
  const rigthRef = useRef(null);
  const container = useRef(null);
  const handleClick_Resize = (e, info) => {
    mWidth.set(mWidth.get() + info.delta.x);
  };
  const handleLeftClick = (e, info) => {
    mWidth.set(mWidth.get() - info.delta.x);
    x.set(x.get() + info.delta.x);
  };
  return (
    <div className={styles.container} ref={container}>
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
          <motion.div className={styles.timeLine} style={{ width: mWidth }}>
            <div className={styles.leftDragContainer} ref={leftRef}>
              <motion.div
                className={styles.leftDrag}
                drag="x"
                style={{ maxWidth: 20, width: 20 }}
                dragConstraints={leftRef}
                onDrag={handleClick_Resize}
                dragElastic={0}
                dragMomentum={false}
              />
            </div>
            <div className={styles.rightDragContainer} ref={rigthRef}>
              <motion.div
                className={styles.leftDrag}
                drag="x"
                style={{ maxWidth: 20, width: 20 }}
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
