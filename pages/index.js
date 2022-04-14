import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion, useMotionValue } from "framer-motion";
import { useState, useCallback, useRef } from "react";

export default function Home() {
  const mWidth = useMotionValue(200);
  const leftRef = useRef(null);
  const rigthRef = useRef(null);
  const [isLeft, setIsLeft] = useState(false);
  const handleClick_Resize = (e, info) => {
    mWidth.set(mWidth.get() + info.delta.x);
  };
  const handleLeftClick = (e, info) => {
    mWidth.set(mWidth.get() - info.delta.x);
  };
  return (
    <div>
      <div className={styles.container}>
        <motion.div
          drag="x"
          dragConstraints={{ left: "-50%" }}
          style={{
            display: "flex",
            width: "fit-content",
            position: isLeft ? "relative" : "relative",
          }}
        >
          <div style={{ position: "relative" }}>
            <motion.div className={styles.timeLine} style={{ width: mWidth }}>
              <div
                className={styles.leftDragContainer}
                ref={leftRef}
                onMouseEnter={() => setIsLeft(false)}
              >
                <motion.div
                  className={styles.leftDrag}
                  drag="x"
                  style={{ maxWidth: 20, width: 20 }}
                  dragConstraints={leftRef}
                  onDrag={handleClick_Resize}
                  dragElastic={0}
                />
              </div>
              <div
                className={styles.rightDragContainer}
                ref={rigthRef}
                onMouseEnter={() => setIsLeft(true)}
              >
                <motion.div
                  className={styles.leftDrag}
                  drag="x"
                  style={{ maxWidth: 20, width: 20 }}
                  dragConstraints={rigthRef}
                  onDrag={handleLeftClick}
                  dragElastic={0}
                  onDragEnd={() => setIsLeft(false)}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
