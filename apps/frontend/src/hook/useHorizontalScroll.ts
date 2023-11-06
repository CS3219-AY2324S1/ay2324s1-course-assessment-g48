import { RefObject, useEffect, useRef } from "react";

//https://stackoverflow.com/a/66687839/18753727
export function useHorizontalScroll() {
  const elRef: RefObject<HTMLDivElement> = useRef(null);

  const onWheel = (e: { deltaY: number; preventDefault: () => void }) => {
    const el = elRef.current;
    if (!el) return;

    if (e.deltaY === 0) return;
    if (
      !(el.scrollLeft === 0 && e.deltaY < 0) &&
      !(
        el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 &&
        e.deltaY > 0
      )
    ) {
      e.preventDefault();
    }
    el.scrollTo({
      left: el.scrollLeft + e.deltaY,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  return elRef;
}
