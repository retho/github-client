import React from 'react';
import './style.scss';
import {useFormik, FormikErrors} from 'formik';
import SvgIcon from 'components/atoms/SvgIcon';
import {sleep} from 'utils/async';
import {showMessage} from 'store/slices/globalMessages';
import {useDispatch} from 'react-redux';
import {isEmpty} from 'lodash-es';

interface IFormValues {
  age: string;
  monthlyIncome: string;
  unofficialMonthlyIncome: string;
  generalError: null;
}

export interface IDemoFormProps {}
const DemoForm: React.FC<IDemoFormProps> = () => {
  const dispatch = useDispatch();

  const {values, errors, handleChange, isSubmitting, handleSubmit} = useFormik<IFormValues>({
    initialValues: {
      age: '12',
      monthlyIncome: '20000',
      unofficialMonthlyIncome: '5000',
      generalError: null,
    },
    validate: async (vals) => {
      const errs: FormikErrors<IFormValues> = {};
      if (+vals.age < 21) {
        errs.age = 'Вы должны быть старше 21 года';
      }
      await sleep(1000);
      if (+vals.monthlyIncome + +vals.unofficialMonthlyIncome < 30000) {
        errs.generalError = 'Суммарный ежемесячный доход должен быть выше 30 000';
      }
      return errs;
    },
    onSubmit: async (vals, helpers) => {
      await sleep(1000);
      // eslint-disable-next-line no-console
      console.log('form submitted', vals);
      dispatch(
        showMessage({
          message: {
            type: 'success',
            title: 'Success',
            description: 'Form successfully submitted',
          },
          hideIn: 5000,
        })
      );
      helpers.setSubmitting(false);
    },
  });

  return (
    <form className="DemoForm" onSubmit={handleSubmit}>
      <div className="DemoForm__item">
        <label>Age</label>
        <input
          className="DemoForm__input"
          name="age"
          placeholder="aaa"
          type="number"
          onChange={handleChange}
          value={values.age}
        />
        <div className="DemoForm__field-error">{errors.age}</div>
      </div>
      <div className="DemoForm__item">
        <label>Monthly income</label>
        <input
          className="DemoForm__input"
          name="monthlyIncome"
          placeholder="bbb"
          type="number"
          onChange={handleChange}
          value={values.monthlyIncome}
        />
        <div className="DemoForm__field-error">{errors.monthlyIncome}</div>
      </div>
      <div className="DemoForm__item">
        <label>Unofficial monthly income</label>
        <input
          className="DemoForm__input"
          name="unofficialMonthlyIncome"
          placeholder="ccc"
          type="text"
          onChange={handleChange}
          value={values.unofficialMonthlyIncome}
        />
        <div className="DemoForm__field-error">{errors.unofficialMonthlyIncome}</div>
      </div>
      <div className="DemoForm__general-error">{errors.generalError}</div>
      <div className="DemoForm__submit">
        <button
          className="DemoForm__button"
          type="submit"
          disabled={isSubmitting || !isEmpty(errors)}
        >
          Submit
        </button>
        {isSubmitting && <SvgIcon className="DemoForm__icon-sync" type="octicon-sync" />}
      </div>
    </form>
  );
};

export default DemoForm;
