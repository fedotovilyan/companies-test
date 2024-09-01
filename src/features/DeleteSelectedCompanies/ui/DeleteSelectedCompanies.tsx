import { useAppDispatch } from "@/app/store";
import { deleteSelectedCompanies } from "@/entities/Company";
import {
  Alert,
  AlertType,
  Button,
  ButtonTheme,
  Flex,
  Modal,
} from "@/shared/ui";
import { useState } from "react";

export const DeleteSelectedCompanies = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const closeModal = () => setIsModalOpened(false);

  return (
    <>
      <Button onClick={() => setIsModalOpened(true)} theme={ButtonTheme.Error}>
        Удалить выбранные компании
      </Button>
      <Modal isOpen={isModalOpened} onClose={closeModal} closable>
        {error ? (
          <Alert type={AlertType.Error}>Что-то пошло не так. {error}</Alert>
        ) : (
          <Flex direction="column" gap={15}>
            <h4>Вы уверены, что хотите удалить выбранные компании?</h4>
            <Flex gap={10} justify="flex-end">
              <Button onClick={closeModal}>Отмена</Button>
              <Button
                onClick={() =>
                  dispatch(deleteSelectedCompanies())
                    .unwrap()
                    .then(() => closeModal())
                    .catch((e) => setError(e.message))
                }
                theme={ButtonTheme.Error}
              >
                Да
              </Button>
            </Flex>
          </Flex>
        )}
      </Modal>
    </>
  );
};
