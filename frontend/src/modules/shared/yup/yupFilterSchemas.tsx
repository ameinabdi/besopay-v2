import * as yup from 'yup';
import dayjs from 'dayjs';

interface YupFilterSchemas {
  [key: string]: (label: string) => yup.Schema<any>;
}

const yupFilterSchemas: YupFilterSchemas = {
  generic(label) {
    return yup.mixed().label(label);
  },

  string(label) {
    return yup
      .string()
      .nullable()
      .transform((cv, ov) => (ov === '' ? null : cv))
      .trim()
      .label(label);
  },

  stringArray(label) {
    return yup
      .array()
      .compact()
      .ensure()
      .of(
        yup
          .string()
          .transform((cv, ov) => (ov === '' ? null : cv))
          .trim(),
      )
      .transform((value, originalValue) => {
        if (!originalValue || !Array.isArray(originalValue)) {
          return [originalValue];
        }

        return originalValue;
      })
      .label(label);
  },

  boolean(label) {
    return yup.bool().nullable().label(label);
  },

  relationToOne(label) {
    return yup
      .mixed()
      .nullable()
      .transform((value, originalValue) => (originalValue ? originalValue.id : null))
      .label(label);
  },

  relationToMany(label) {
    return yup
      .mixed()
      .nullable()
      .transform((value, originalValue) => (originalValue && originalValue.length ? originalValue.map((item) => item.id) : []))
      .label(label);
  },

  json(label) {
    return yup.mixed().nullable().label(label);
  },

  integer(label) {
    return yup
      .number()
      .nullable()
      .transform((cv, ov) => (ov === '' ? null : cv))
      .integer()
      .label(label);
  },

  integerRange(label) {
    return yup.mixed().label(label);
  },

  enumerator(label) {
    return yup
      .string()
      .nullable()
      .transform((cv, ov) => (ov === '' ? null : cv))
      .label(label);
  },

  email(label) {
    return yup
      .string()
      .nullable()
      .transform((cv, ov) => (ov === '' ? null : cv))
      .trim()
      .label(label);
  },

  decimal(label) {
    return yup
      .number()
      .nullable()
      .transform((cv, ov) => (ov === '' ? null : cv))
      .label(label);
  },

  decimalRange(label) {
    return yup
      .array()
      .ensure()
      .compact()
      .of(
        yup
          .number()
          .nullable()
          .transform((cv, ov) => (ov === '' ? null : cv))
          .label(label),
      )
      .label(label);
  },

  datetime(label) {
    return yup
      .mixed()
      .nullable()
      .label(label)
      .transform((value, originalValue) =>
        originalValue ? dayjs(originalValue, 'YYYY-MM-DD HH:mm').toISOString() : null,
      );
  },

  datetimeRange(label) {
    return yup.mixed().label(label);
  },

  date(label) {
    return yup
      .mixed()
      .nullable()
      .label(label)
      .test(
        'is-date',
        'Invalid date format',
        (value:any) => !value || dayjs(value, 'YYYY-MM-DD').isValid(),
      );
  },

  dateRange(label) {
    return yup
      .array()
      .ensure()
      .compact()
      .of(
        yup
          .mixed()
          .nullable()
          .label(label)
          .test(
            'is-date',
            'Invalid date format',
            (value:any) => !value || dayjs(value, 'YYYY-MM-DD').isValid(),
          )
          .transform((value) => (value ? dayjs(value).format('YYYY-MM-DD') : null)),
      )
      .label(label);
  },
};

export default yupFilterSchemas;