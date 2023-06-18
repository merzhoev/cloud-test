import { useLayoutEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formActions, selectFields } from '@/store/slices/form-slice/form-slice';
import { Advantage, Button, Checkbox, Radio } from '@/shared/ui';
import { SecondStepFields, useStep } from '../';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { ReactComponent as IconPlus } from '@/assets/plus.svg';

import styles from '../steps.module.scss';

const checkboxes = [
  { id: 1, label: '1', value: 1 },
  { id: 2, label: '2', value: 2 },
  { id: 3, label: '3', value: 3 },
];

const radioButtons = [
  { id: 1, label: '1', value: 1 },
  { id: 2, label: '2', value: 2 },
  { id: 3, label: '3', value: 3 },
];

const validationSchema = yup.object({
  advantages: yup.array(yup.string().required('Обязательное поле')),
  checkbox: yup.array(yup.number()),
  radio: yup.number(),
});

export function SecondStep() {
  const dispatch = useAppDispatch();
  const isMountedRef = useIsMounted();
  const currentStep = 2;
  const stepFields = useAppSelector(selectFields<typeof currentStep>(currentStep));
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SecondStepFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: stepFields,
  });
  const { onPrevStep, onNextStep } = useStep({ currentStep });

  const [advantages, setAdvantages] = useState<string[]>(stepFields.advantages);

  const onRemoveAdvantage = (idx: number) => {
    if (advantages.length === 1) {
      return;
    }

    const newValue = advantages.filter((_, advantageIdx) => idx !== advantageIdx);
    setAdvantages(newValue);
  };

  const onAddAdvantage = () => {
    const newValue = [...advantages, ''];
    setAdvantages(newValue);
  };

  const onChangeAdvantage = (value: string, idx: number) => {
    const newValue = [...advantages];
    newValue[idx] = value;

    setAdvantages(newValue);
  };

  const onFormSubmit: SubmitHandler<SecondStepFields> = (data) => {
    dispatch(formActions.addFields(data));
    onNextStep();
  };

  useLayoutEffect(() => {
    setValue('advantages', advantages, { shouldValidate: isMountedRef.current });
  }, [advantages]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
        <div className={styles.formFields}>
          <div className={styles.formGroup}>
            <p className={styles.formGroupLabel}>Advantages</p>
            {advantages.map((advantage, idx) => (
              <Advantage
                key={idx}
                number={idx + 1}
                placeholder="Placeholder"
                value={advantage}
                onChange={(e) => onChangeAdvantage(e.target.value, idx)}
                onRemove={() => onRemoveAdvantage(idx)}
                isError={Boolean(errors.advantages?.[idx])}
                helperText={errors.advantages?.[idx]?.message}
              />
            ))}
            <Button
              id="button-add"
              onClick={onAddAdvantage}
              className={styles.formGroupButton}
              type="button"
              variant="outlined"
              IconLeft={<IconPlus />}
            />
          </div>
          <div className={styles.formGroup}>
            <p className={styles.formGroupLabel}>Checkbox group</p>
            <div>
              {checkboxes.map(({ id, label, value }) => (
                <Checkbox
                  id={`field-checkbox-group-option-${id}`}
                  key={id}
                  label={label}
                  value={value}
                  {...register('checkbox')}
                  defaultChecked={stepFields.checkbox.includes(value)}
                />
              ))}
            </div>
          </div>
          <div className={styles.formGroup}>
            <p className={styles.formGroupLabel}>Radio group</p>
            <div>
              {radioButtons.map(({ id, label, value }) => (
                <Radio
                  id={`field-radio-group-option-${id}`}
                  key={id}
                  {...register('radio')}
                  label={label}
                  value={value}
                  defaultChecked={stepFields.radio === value}
                />
              ))}
            </div>
          </div>
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
