import React, { useEffect, useRef, RefObject } from "react";

type Props = {
  children: React.ReactNode;
  onContentEndVisible: () => void;
};

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    type IntersectionObserverOptions = {
      root?: null | Element;
      rootMargin?: string;
      threshold?: number | number[];
    };

    const options: IntersectionObserverOptions = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
