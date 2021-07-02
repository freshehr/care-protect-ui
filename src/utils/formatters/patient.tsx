import { formatDate, formatAge } from './time';

export const getGender = (value: string) =>
  value === 'female' ? 'Female' : 'Male';

export const getPatientListFormatter = patients => {
  return patients.map(
    ({
      assassments,
      gender,
      name,
      id,
      location,
      nhsnumber,
      birthDateAsString,
      //   admitted,
      //   discharge,
      //   consultant,
    }) => ({
      id,
      name,
      gender: getGender(gender),
      location,
      birthDate: `${formatDate(birthDateAsString)} ${formatAge(
        birthDateAsString,
      )}`,
      nhsnumber,
      //   admitted: formatAdmitted(admitted),
      //   discharge: formatDate(discharge),
      //   consultant,
      assassments,
    }),
  );
};
