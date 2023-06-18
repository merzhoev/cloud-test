import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formActions, selectFields } from '@/store/slices/form-slice/form-slice';
import { PHONE_NUMBER_LENGTH } from '@/shared/ui/phone-input/phone-input.constants';
import { UserInfo } from '@/components/user-info/user-info';
import { ZeroStepFields } from '@/components/steps';
import { Button, PhoneInput, TextField } from '@/shared/ui';
import { routes } from '@/routes';

import styles from './profile-page.module.scss';

const socialLinks = [
  { id: 1, title: 'Telegram', url: 'https://t.me/arbimerzhoev' },
  { id: 2, title: 'Github', url: 'https://github.com/merzhoev' },
  {
    id: 3,
    title: 'Resume',
    url: 'https://stavropol.hh.ru/resume/805973b8ff0b1ff12a0039ed1f50686646424f?hhtmFrom=resume_list',
  },
];

const validationSchema = yup.object({
  phone: yup.string().min(PHONE_NUMBER_LENGTH, 'Обязательное поле'),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Введите правильный email',
    )
    .required('Обязательное поле'),
});

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentStep = 0;
  const stepFields = useAppSelector(selectFields<typeof currentStep>(currentStep));
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ZeroStepFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: stepFields,
  });
  const [phoneNumber, setPhoneNumber] = useState(stepFields.phone);

  const onPhoneChange = (phone: string) => {
    setPhoneNumber(phone);
    setValue('phone', phone, { shouldValidate: true });
  };

  const onNextStep = () => {
    dispatch(formActions.setStep(1));
  };

  const onFormSubmit: SubmitHandler<ZeroStepFields> = (data) => {
    dispatch(formActions.addFields(data));
    onNextStep();
    navigate(routes.create);
  };

  return (
    <div className={styles.profilePage}>
      <UserInfo firstName="Арби" lastName="Мержоев" socialLinks={socialLinks} />
      <hr className={styles.divider} />
      <form className={styles.profilePageForm} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.profilePageFormFields}>
          <PhoneInput
            disabled
            label="Номер Телефона"
            name="phone"
            value={phoneNumber}
            onChange={onPhoneChange}
            isError={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />
          <TextField
            disabled
            label="Email"
            placeholder="Введите email"
            {...register('email')}
            isError={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        </div>
        <Button id="button-start" className={styles.profilePageFormButton} type="submit">
          Начать
        </Button>
      </form>
    </div>
  );
}
