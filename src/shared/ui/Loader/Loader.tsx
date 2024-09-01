import classNames from "classnames";
import { FC, PropsWithChildren } from "react";
import cls from "./Loader.module.scss";

interface LoaderProps extends PropsWithChildren {
  className?: string;
  spinning?: boolean;
  fullscreen?: boolean;
}

export const Loader: FC<LoaderProps> = (props) => {
  const { children, className, spinning, fullscreen } = props;

  return (
    <div
      className={classNames(
        cls.Loader,
        {
          [cls.spinning]: spinning,
          [cls.fullscreen]: fullscreen,
        },
        className
      )}
    >
      <div className={classNames({ [cls.spinner]: spinning })}></div>
      <div className={cls.children}>{children}</div>
    </div>
  );
};
