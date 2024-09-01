import { useAppDispatch } from "@/app/store";
import { addCompany, CompanyForm, CompanyFormData } from "@/entities/Company";
import { Alert, AlertType, Button, ButtonTheme, Modal } from "@/shared/ui";
import { useState } from "react";

export const AddCompany = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const onSubmitForm = (formData: CompanyFormData) => {
    setIsFormDisabled(true);
    dispatch(addCompany(formData))
      .unwrap()
      .then(() => setIsModalOpened(false))
      .catch((e) => setError(e.message))
      .finally(() => setIsFormDisabled(false));
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpened(true)}
        theme={ButtonTheme.Primary}
      >
        Добавить компанию
      </Button>
      <Modal
        closable
        isOpen={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      >
        <CompanyForm onSubmit={onSubmitForm} isFormDisabled={isFormDisabled} />
        {error && (
          <Alert type={AlertType.Error}>Что-то пошло не так. {error}</Alert>
        )}
      </Modal>
    </>
  );
};
