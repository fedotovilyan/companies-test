import { Button, ErrorText, Flex, Input } from "@/shared/ui";
import cls from "./CompanyForm.module.scss";
import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";

export interface CompanyFormData {
  name: string;
  address: string;
}

interface CompanyFormProps {
  onSubmit: (formData: CompanyFormData) => void;
  submitButtonText?: string;
  isFormDisabled?: boolean;
	defaultValues?: CompanyFormData;
}

export const CompanyForm = ({
  onSubmit,
  submitButtonText = "Добавить компанию",
  isFormDisabled,
	defaultValues,
}: CompanyFormProps) => {
  const id = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompanyFormData>();

	useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, val]) => {
        setValue(key as keyof CompanyFormData, val, { shouldValidate: true });
      });
    }
  }, [defaultValues, setValue]);

  return (
    <form className={cls.company_form} onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={5}>
        <label htmlFor={`${id}-name`}>Название компании:</label>
        <Input
          {...register("name", {
            required: "Введите название!",
            maxLength: {
              value: 255,
              message: "Не больше 255 символов",
            },
          })}
          aria-invalid={errors.name ? "true" : "false"}
          className={classNames({
            [cls.err_input]: !!errors.name,
          })}
          id={`${id}-name`}
          placeholder="Введите название"
        />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      </Flex>
      <Flex direction="column" gap={5}>
        <label htmlFor={`${id}-address`}>Адрес:</label>
        <Input
          {...register("address", {
            required: "Введите адрес!",
          })}
          id={`${id}-address`}
          placeholder="Введите адрес"
          aria-invalid={errors.address ? "true" : "false"}
          className={classNames({
            [cls.err_input]: !!errors.address,
          })}
        />
        {errors.address && <ErrorText>{errors.address.message}</ErrorText>}
      </Flex>
      <Button disabled={isFormDisabled} type="submit">
        {submitButtonText}
      </Button>
    </form>
  );
};
