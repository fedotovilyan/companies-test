import classNames from "classnames";
import cls from "./InfiniteScroll.module.scss";
import { useEffect, useRef } from "react";
import { Loader } from "../Loader/Loader";

interface InfiniteScrollProps {
  className?: string;
  onIntersection?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
  isLoading?: boolean;
}

export const InfiniteScroll = (props: InfiniteScrollProps) => {
  const { onIntersection, className, isLoading } = props;
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;

    let observerRefValue: HTMLDivElement | null = null;
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          onIntersection?.(entry, observer);
        }
      },
      { threshold: 1 }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
      observerRefValue = divRef.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [onIntersection, isLoading]);

  return (
    <div ref={divRef} className={classNames(cls.infinite_scroll, className)}>
      {isLoading && <Loader spinning />}
    </div>
  );
};
