import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DropdownOption } from '@/shared/ui/dropdown/dropdown.types';
import { Button, Dropdown, TextField } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formActions, selectFields } from '@/store/slices/form-slice/form-slice';
import { useNavigate } from 'react-router-dom';
import { FirstStepFields, Sex, useStep } from '../';
import { routes } from '@/routes';

import styles from '../steps.module.scss';

const dropdownOptions = [
  { id: 1, label: 'Man', value: Sex.MAN },
  { id: 2, label: 'Woman', value: Sex.WOMAN },
];

const validationSchema = yup.object({
  nickname: yup
    .string()
    .required('Обязательное поле')
    .matches(/^[aA-zZ|аА-яЯ|0-9]+$/, 'Допускаются только буквы и цифры')
    .max(30, 'Максимальная длина 30 символов'),
  name: yup
    .string()
    .required('Обязательное поле')
    .matches(/^[aA-zZ|аА-яЯ]+$/, 'Допускаются только буквы')
    .max(50, 'Максимальная длина 50 символов'),
  sername: yup
    .string()
    .required('Обязательное поле')
    .matches(/^[aA-zZ|аА-яЯ]+$/, 'Допускаются только буквы')
    .max(50, 'Максимальная длина 50 символов'),
  sex: yup.string().required('Обязательное поле'),
});

export function FirstStep() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentStep = 1;
  const stepFields = useAppSelector(selectFields<typeof currentStep>(currentStep));
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FirstStepFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: stepFields,
  });
  const { onPrevStep, onNextStep } = useStep({ currentStep, onPrev: () => navigate(routes.home) });

  const [dropdownValue, setDropdownValue] = useState<DropdownOption | null>(() => {
    const defaultOption = dropdownOptions.find(({ value }) => stepFields.sex === value);

    return defaultOption ?? null;
  });

  const onDropdownChange = (option: DropdownOption) => {
    setDropdownValue(option);
    setValue('sex', option.value as Sex, { shouldValidate: true });
  };

  const onFormSubmit: SubmitHandler<FirstStepFields> = (data) => {
    dispatch(formActions.addFields(data));
    onNextStep();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.formFields}>
          <TextField
            id="field-nickname"
            label="Nickname"
            placeholder="Введите никнейм"
            {...register('nickname')}
            isError={Boolean(errors.nickname)}
            helperText={errors.nickname?.message}
          />
          <TextField
            id="field-name"
            label="Name"
            placeholder="Введите имя"
            {...register('name')}
            isError={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
          <TextField
            id="field-sername"
            label="Sername"
            placeholder="Введите фамилию"
            {...register('sername')}
            isError={Boolean(errors.sername)}
            helperText={errors.sername?.message}
          />
          <Dropdown
            options={dropdownOptions}
            label="Sex"
            selectedOption={dropdownValue}
            onChange={onDropdownChange}
            isError={Boolean(errors.sex)}
            helperText={errors.sex?.message}
          />
        </div>
        <div className={styles.formButtons}>
          <Button id="button-back" onClick={onPrevStep} variant="outlined" type="button">
            Назад
          </Button>
          <Button id="button-next" type="submit">
            Далее
          </Button>
        </div>
      </form>
    </>
  );
}
