import styles from "./loader.module.css";

function Loading({ width, height,stroke,  color }) {
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
          border: `${stroke? stroke / 10 : 4}px solid ${
            color ? color + "22" : "#6acfcf22"
          }`,
          borderTopColor: color ? color : "#6acfcf",
        }}
      ></section>
    </div>
  );
}

export default Loading;
