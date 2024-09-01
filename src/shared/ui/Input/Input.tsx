import { InputHTMLAttributes } from "react";
import classNames from "classnames";
import cls from "./Input.module.scss";
import { forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  theme?: "transparent";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props: InputProps,
  ref
) {
  const { className, theme, ...rest } = props;

  return (
    <input
      ref={ref}
      className={classNames(cls.Input, theme ? cls[theme] : "", className)}
      {...rest}
    />
  );
});
