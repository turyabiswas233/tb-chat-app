function getVisitor() {
  if (typeof navigator !== "undefined") {
    return navigator;
  } else return;
}

export { getVisitor };
