import { useRef, useEffect, useId, DialogHTMLAttributes } from "react";
import { Button } from "..";
import "./Modal.scss";
import { classNameFactory } from "@/utils/dom";
import classNames from "classnames";

export interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  title: string;
}

const cn = classNameFactory("modal");

export function Modal({ children, onClose, isOpen, title, className: classNameProp, ...rest }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const labelId = useId();
  const className = classNames(cn(""), classNameProp);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      if (onClose) onClose();
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} aria-labelledby={labelId} onKeyDown={handleKeyDown} className={className} {...rest}>
      <header className={cn("header")}>
        <h2 id={labelId} className={cn("title")}>
          {title}
        </h2>
        <Button data-testid="modal-close" aria-label="close the modal" className={cn("button-close")} onClick={onClose}>
          {"X"}
        </Button>
      </header>
      {children}
    </dialog>
  );
}
