import * as React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { createRenderer } from 'react-test-renderer/shallow';

import { configureAppStore } from 'store/configureStore';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import { actions } from '../slice';
import Records from '../Records';

const renderRecords = (store: Store) =>
  render(
    <Provider store={store}>
      <HelmetProvider>
        <Records />
      </HelmetProvider>
    </Provider>,
  );

describe('<Records />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let component: ReturnType<typeof renderRecords>;

  beforeEach(() => {
    store = configureAppStore();
    component = renderRecords(store);
  });
  afterEach(() => {
    component.unmount();
  });

  it('should fetch records on mount', () => {
    component.unmount();
    store.dispatch(actions.loadRecords({}));
    expect(store.getState().patientsList.loading).toBe(true);
  });

  it('should match into snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
