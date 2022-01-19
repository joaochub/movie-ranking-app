import { useEffect, useState } from "react";

function useOnScreen(ref, { root = null, rootMargin = "0px", threshold = 0 }) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref, root, rootMargin, threshold]);

  return isIntersecting;
}

export default useOnScreen;
