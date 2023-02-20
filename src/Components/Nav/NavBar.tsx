import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, Box, CssBaseline } from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function Navbar(): JSX.Element {
  const location = useLocation().pathname;

  function getValue(pathname: string): number | boolean {
    // console.log(pathname);
    if (pathname === '/') {
      return 0;
    }  else if (pathname === '/Betting') {
      return 1;
    } else {
      return 0;
    }
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item md={3} sm={12} component={Link} to="/" style={{textDecoration: 'none'}}>
            <Box>
              <Typography style={{ color: "#ffffff"}} component="h1" variant="h4" >
                $am's DFS Opto
              </Typography>
            </Box>
          </Grid>
          <Grid item md={9} sm={12}>
            <Tabs value={getValue(location)} aria-label="tabs example" variant="scrollable">
              <Tab label="DFS" component={Link} to="/"/>
              <Tab label="PRA Prop Betting" component={Link} to="/Betting" />
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
