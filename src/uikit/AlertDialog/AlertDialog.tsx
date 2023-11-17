import { useId } from "react";
import { Button, Modal, ModalProps } from "..";
import { classNameFactory } from "@/utils/dom";
import "./AlertDialog.scss";

interface AlertDialogProps extends ModalProps {
  description: string;
  onSubmit: () => void;
}

const cn = classNameFactory("alert-dialog");

export function AlertDialog({ description, onSubmit, onClose, ...props }: AlertDialogProps) {
  const descriptionId = useId();
  return (
    <Modal role="alertdialog" aria-describedby={descriptionId} onClose={onClose} className={cn("")} {...props}>
      <p className={cn("description")} id={descriptionId}>
        {description}
      </p>
      <ul className={cn("options")}>
        <li>
          <Button varinat="secondary" onClick={onClose}>
            No
          </Button>
        </li>
        <li>
          <Button data-testid="submit" onClick={onSubmit}>
            Yes
          </Button>
        </li>
      </ul>
    </Modal>
  );
}
