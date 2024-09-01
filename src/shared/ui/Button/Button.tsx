import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";
import cls from "./Button.module.scss";

export enum ButtonTheme {
  Primary = "primary",
  Default = "default",
  Link = "link",
  Transparent = "transparent",
  Error = 'error',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	theme?: ButtonTheme;
}

export const Button: FC<ButtonProps> = (props) => {
	const {
		theme = ButtonTheme.Primary,
		children,
		className,
		...rest
	} = props;

	return (
		<button
			className={classNames(
				cls.Button,
				cls[theme],
				className
			)}
			{...rest}
		>
			{children}
		</button>
	);
};
