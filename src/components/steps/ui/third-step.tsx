import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useDisclosure } from '@/shared/hooks/use-disclosure';
import { Button, Textarea } from '@/shared/ui';
import { formActions, selectFields, sendFormFields } from '@/store/slices/form-slice';
import { ThirdStepFields, useStep } from '../';
import { ModalNotification } from '@/components/modal-notification/';
import { routes } from '@/routes';

import styles from '../steps.module.scss';

const validationSchema = yup.object({
  about: yup
    .string()
    .required('Обязательное поле')
    .max(200, 'Максимальное количество 200 символов'),
});

export function ThirdStep() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentStep = 3;
  const stepFields = useAppSelector(selectFields<typeof currentStep>(currentStep));
  const { response, isLoading } = useAppSelector((state) => state.form);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ThirdStepFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: stepFields,
  });
  const { onPrevStep } = useStep({ currentStep });

  const [isOpen, { open, close }] = useDisclosure(false);
  const aboutValue = watch('about');

  const onFormSubmit: SubmitHandler<ThirdStepFields> = (data) => {
    dispatch(formActions.addFields(data));

    dispatch(sendFormFields()).unwrap().finally(open);
  };

  const onClickMain = () => {
    dispatch(formActions.clearFields());
    navigate(routes.home);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
      {response !== null && (
        <ModalNotification
          title={response.message}
          status={response.status}
          isOpen={isOpen}
          onClose={close}
          withCloseButton>
          {/* Действия в модалке вынесены на уровень выше, а не в самой модалке, для того, 
          чтобы максимально гибко переиспользовать компонент */}
          {response.status === 'success' ? (
            <Button id="button-to-main" onClick={onClickMain}>
              На главную
            </Button>
          ) : (
            <Button id="button-close" onClick={close}>
              Закрыть
            </Button>
          )}
        </ModalNotification>
      )}
      <Textarea
        id="field-about"
        {...register('about')}
        value={aboutValue}
        label="About"
        placeholder="Placeholder"
        isError={Boolean(errors.about)}
        helperText={errors.about?.message}
        isShownCount
      />
      <div className={styles.formButtons}>
        <Button
          isDisabled={isLoading}
          id="button-back"
          onClick={onPrevStep}
          variant="outlined"
          type="button">
          Назад
        </Button>
        <Button isLoading={isLoading} id="button-send" type="submit">
          Отправить
        </Button>
      </div>
    </form>
  );
}
