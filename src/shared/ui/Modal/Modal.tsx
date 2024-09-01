import {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
} from "react";
import cls from "./Modal.module.scss";
import classNames from "classnames";
import { createPortal } from "react-dom";
import CrossSvg from "@/assets/cross.svg";
import { Button, ButtonTheme } from "..";

export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  closable?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
  const { isOpen, onClose, className, children, closable = true } = props;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const onChildrenClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const onOverlayClick: MouseEventHandler<HTMLDivElement> = () => {
    if (closable) {
      onClose?.();
    }
  };

  return createPortal(
    <div
      className={classNames(cls.modal_container, {
        [cls.opened]: isOpen,
      })}
      onClick={onOverlayClick}
    >
      <div
        onClick={onChildrenClick}
        className={classNames(cls.children, className)}
      >
        {closable && (
          <Button
            theme={ButtonTheme.Transparent}
            className={cls.close_btn}
            onClick={onClose}
          >
            <img
              height={15}
              width={15}
              src={CrossSvg}
              className={cls.cross}
              alt="Закрыть"
            />
          </Button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};
