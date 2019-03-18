import React from 'react';
import { Grid } from '@material-ui/core';
import SidePanel from './containers/SidePanel';

function App() {
  return (
    <React.Fragment>
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <SidePanel />
        </Grid>
        <Grid item xs={9}>
          <p>Hello</p>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
