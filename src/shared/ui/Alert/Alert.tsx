import classNames from "classnames";
import { FC, PropsWithChildren, useState } from "react";
import cls from "./Alert.module.scss";
import WarningSvg from "@/assets/diamond-exclamation.svg";
import SuccessSvg from "@/assets/check.svg";
import InfoSvg from "@/assets/exclamation.svg";
import ErrorSvg from "@/assets/x.svg";
import CrossSvg from "@/assets/cross.svg";
import { Button, ButtonTheme } from "../Button/Button";

export enum AlertType {
  Info = "info",
  Warning = "warning",
  Error = "error",
  Success = "success",
}

interface AlertProps extends PropsWithChildren {
	type?: AlertType;
	className?: string;
	closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
	const { children, className, type = AlertType.Info, closable } = props;
	const [isHidden, setIsHidden] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const onClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsHidden(true);
		}, 500);
	};

	return (
    <div
      className={classNames(
        cls.Alert,
        cls[type],
        { [cls.hidden]: isHidden, [cls.is_closing]: isClosing },
        className
      )}
    >
      {type === AlertType.Info && (
        <img
          src={InfoSvg}
          alt="Инфо"
          style={{ color: "#1677ff" }}
          width={24}
          height={24}
          className={cls.icon}
        />
      )}
      {type === AlertType.Error && (
				<img
          src={ErrorSvg}
          alt="Ошибка"
          style={{ color: "#ff4d4f" }}
          width={24}
          height={24}
          className={cls.icon}
        />
      )}
      {type === AlertType.Success && (
				<img
          src={SuccessSvg}
          alt="Успех"
          style={{ color: "#52c41a" }}
          width={24}
          height={24}
          className={cls.icon}
        />
      )}
      {type === AlertType.Warning && (
				<img
          src={WarningSvg}
          alt="Внимание"
          style={{ color: "#faad14" }}
          width={24}
          height={24}
          className={cls.icon}
        />
      )}
      {children}
      {closable && (
        <Button
          theme={ButtonTheme.Transparent}
          className={cls.close_btn}
          onClick={onClose}
        >
          <img src={CrossSvg} alt="Закрыть" width={20} height={20} className={cls.cross_icon} />

        </Button>
      )}
    </div>
  );
};
