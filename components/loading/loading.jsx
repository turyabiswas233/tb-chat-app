import styles from "./loader.module.css";

function Loading({ w, h }) {
  const style = [
    {
      transform: "rotate(calc(1*18deg))",
    },
    {
      transform: "rotate(calc(2*18deg))",
    },
    {
      transform: "rotate(calc(3*18deg))",
    },
    {
      transform: "rotate(calc(4*18deg))",
    },
    {
      transform: "rotate(calc(5*18deg))",
    },
    {
      transform: "rotate(calc(6*18deg))",
    },
    {
      transform: "rotate(calc(7*18deg))",
    },
    {
      transform: "rotate(calc(8*18deg))",
    },
    {
      transform: "rotate(calc(9*18deg))",
    },
    {
      transform: "rotate(calc(10*18deg))",
    },
    {
      transform: "rotate(calc(11*18deg))",
    },
    {
      transform: "rotate(calc(12*18deg))",
    },
    {
      transform: "rotate(calc(13*18deg))",
    },
    {
      transform: "rotate(calc(14*18deg))",
    },
    {
      transform: "rotate(calc(15*18deg))",
    },
    {
      transform: "rotate(calc(16*18deg))",
    },
    {
      transform: "rotate(calc(17*18deg))",
    },
    {
      transform: "rotate(calc(18*18deg))",
    },
    {
      transform: "rotate(calc(19*18deg))",
    },
    {
      transform: "rotate(calc(20*18deg))",
    },
  ];
  let min = w <= h ? w : h;
  return (
    <div>
      <section
        className={styles.loader}
        style={{
          width: w,
          height: h,
        }}
      >
        {style.map((child, id) => {
          return (
            <p key={id} style={child}>
              <span
                style={{
                  animationDelay: `calc(${(id + 1) * 0.1}s)`,
                  width: min / 2.5,
                  height: min / 2.5,
                }}
              ></span>
            </p>
          );
        })}
      </section>
    </div>
  );
}

export default Loading;
