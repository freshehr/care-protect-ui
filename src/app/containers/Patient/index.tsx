import React from 'react';
import { Card, Record } from 'components';
import { useSelector } from 'react-redux';
import { selectPatient } from './selectors';

const Patient = () => {
  const patient = useSelector(selectPatient);

  return (
    <div style={{ marginTop: '3.6rem' }}>
      <Card
        name={patient?.name}
        identifier={patient?.nhsnumber}
        assesments={patient?.assessment}
        id={patient?.id}
        //   className={classes.identityCard}
      >
        <Record
          birthDate={patient?.birthDate}
          gender={patient?.gender}
          location={patient?.location}
        />
      </Card>
    </div>
  );
};

export default Patient;
