import styles from "./loader.module.css";

function Loading({ width, height, color }) {
  let min = width >= height ? width : height;
  return (
    <div
      className={styles.container}
      style={{
        width: `${min}px` || "40px",
        height: `${min}px` || "40px",
      }}
    >
      <section
        className={styles.loader}
        style={{
          border: `${min ? min / 10 : 4}px solid ${
            color ? color + "22" : "#6acfcf"
          }`,
          borderTopColor: color ? color : "#6acfcf",
        }}
      ></section>
    </div>
  );
}

export default Loading;
