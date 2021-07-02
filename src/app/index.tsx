/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages.
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { assessmentReducer } from 'store/assessmentTypeReducer';
import { authReducer, selectAuth, logOut } from 'store/authReducer';

import { sessionReducer } from 'redux-react-session';
// import { sessionSelector } from 'utils/selectors';
import { useInjectReducer } from 'redux-injectors';

import { AcuityDashboard } from './containers/AcuityDashboard';
import { Assessment } from './containers/Assessment';
import { InfectionControl } from './containers/InfectionControl';
import { NotFoundPage } from 'components/NotFoundPage/Loadable';
import { PatientList } from './containers/PatientList/';
import { PatientOverview } from './containers/PatientOverview';
import Login from './containers/Login';
import { TasksList } from './containers/TasksList';
import { AdminPage } from './containers/Admin';

import Layout from 'components/Layout';

export function App() {
  useInjectReducer({ key: 'session', reducer: sessionReducer });
  useInjectReducer({ key: 'assessmentType', reducer: assessmentReducer });
  useInjectReducer({ key: 'auth', reducer: authReducer });

  //Temporary mocked auth
  const auth = useSelector(selectAuth);
  // const session = useSelector(sessionSelector);
  // const { checked, authenticated } = session;
  const checked = true;
  const authenticated = Boolean(auth);
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s -Care Protect" defaultTitle="Care Protect">
        <meta
          name="Quick and effective sharing of data to ensure that patients are always in correct setting"
          content="Care Protect application"
        />
      </Helmet>
      {checked && (
        <Switch>
          <ProtectedRoute
            exact
            header="Patient List"
            path={process.env.PUBLIC_URL + '/'}
            component={PatientList}
            authenticated={authenticated}
            username={auth}
            bottomToolBar
          />
          <ProtectedRoute
            exact
            header="Acuity Dasboard"
            path={process.env.PUBLIC_URL + '/dashboard'}
            component={AcuityDashboard}
            authenticated={authenticated}
            username={auth}
            bottomToolBar
          />
          <ProtectedRoute
            exact
            header="Tasks List"
            path={process.env.PUBLIC_URL + '/tasks'}
            component={TasksList}
            authenticated={authenticated}
            username={auth}
            bottomToolBar
          />
          <ProtectedRoute
            exact
            header="Admin Page"
            path={process.env.PUBLIC_URL + '/admin'}
            component={AdminPage}
            authenticated={authenticated}
            username={auth}
            bottomToolBar
          />
          <ProtectedRoute
            exact
            path={process.env.PUBLIC_URL + '/covid-management/:id'}
            component={InfectionControl}
            authenticated={authenticated}
            username={auth}
          />
          <ProtectedRoute
            exact
            path={process.env.PUBLIC_URL + '/patient-overview/:id'}
            component={PatientOverview}
            authenticated={authenticated}
            username={auth}
          />
          <ProtectedRoute
            exact
            path={process.env.PUBLIC_URL + '/assessment/:id/:tab/:obsType'}
            component={Assessment}
            authenticated={authenticated}
            username={auth}
          />
          <LoginPage
            exact
            path={'/login'}
            component={Login}
            login
            authenticated={authenticated}
            username={auth}
          />
          <Route component={NotFoundPage} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

function ProtectedRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const handleLogout = React.useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return (
    <Route
      {...rest}
      render={props =>
        rest.authenticated ? (
          <Layout
            header={rest.header}
            bottomToolBar={Boolean(rest.bottomToolBar)}
            username={rest.username}
            logout={handleLogout}
          >
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function LoginPage({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.authenticated ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        ) : (
          <Layout
            login={rest.login}
            header={rest.header}
            bottomToolBar={Boolean(rest.bottomToolBar)}
          >
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
}
