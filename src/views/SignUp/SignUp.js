import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

//import uuid from 'uuid/v4';
import { db } from '../../firebase';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'es requerido' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'es requerido' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'es requerido' },
    email: true,
    length: {
      maximum: 64
    }
  },

  telefono: {
    presence: {allowEmpty: false, message: 'no puedes dejar este campo vacío'},
    length: {
      maximum:10
    }
  },

  city: {
    presence: { allowEmpty: false, message: 'es requerido' },
    length: {
      maximum: 30
    }
  },

  state: {
    presence: { allowEmpty: false, message: 'es requerido' },
    length: {
      maximum: 30
    }
  },

  street: {
    presence: { allowEmpty: false, message: 'Así nooooo' },
    length: {
      maximum: 30
    }
  },

  password: {
    presence: { allowEmpty: false, message: 'es requerido' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'es requerido' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = event => {
    event.preventDefault();

    const { values } = formState;

    db.collection('usuarios').doc()
      .set({name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.telefono,
        address: {
          city: values.city,
          country: 'México',
          state: values.state,
          street: values.street
      },
        //phone: '3511111111',
        //address: {
          //city: 'Zamora de Hidalgo',
          //country: 'México',
          //state: 'Michoacán',
          //street: 'Default'
        //},
        avatarUrl: '/images/avatars/avatar_default.png',
        createdAt: Date.now()
      })
      .then(() => history.push('/'))
      .catch(err => console.log(err));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignUp}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Crear nueva cuenta
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Proporciona tus datos para proceder
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('firstName')}
                  fullWidth
                  helperText={
                    hasError('firstName') ? formState.errors.firstName[0] : null
                  }
                  label="Nombre(s)"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.firstName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('lastName')}
                  fullWidth
                  helperText={
                    hasError('lastName') ? formState.errors.lastName[0] : null
                  }
                  label="Apellidos"
                  name="lastName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.lastName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Contraseña"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  error={hasError('telefono')}
                  fullWidth
                  helperText={
                    hasError('telefono') ? formState.errors.telefono[0] : null
                  }
                  label="Télefono"
                  name="telefono"
                  onChange={handleChange}
                  type="telefono"
                  inputProps={{maxLength:10}}
                  
                  value={formState.values.telefono || ''}
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  error={hasError('city')}
                  fullWidth
                  helperText={
                    hasError('city') ? formState.errors.city[0] : null
                  }
                  label="Ciudad"
                  name="city"
                  onChange={handleChange}
                  type="city"
                  value={formState.values.city || ''}
                  variant="outlined"
                />

                <TextField
                  className={classes.textField}
                  error={hasError('state')}
                  fullWidth
                  helperText={
                    hasError('state') ? formState.errors.state[0] : null
                  }
                  label="Estado"
                  name="state"
                  onChange={handleChange}
                  type="state"
                  value={formState.values.state || ''}
                  variant="outlined"
                />

                {/* <TextField
                  className={classes.textField}
                  error={hasError('country')}
                  fullWidth
                  helperText={
                    hasError('country') ? formState.errors.city[0] : null
                  }
                  label="País"
                  name="country"
                  onChange={handleChange}
                  type="country"
                  value={formState.values.country || ''}
                  variant="outlined"
                /> */}

                <TextField
                  className={classes.textField}
                  error={hasError('street')}
                  fullWidth
                  helperText={
                    hasError('street') ? formState.errors.street[0] : null
                  }
                  label="Calle y número"
                  name="street"
                  onChange={handleChange}
                  type="street"
                  value={formState.values.street || ''}
                  variant="outlined"
                />


                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    Tu di que si aceptas{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      0_0
                    </Link>
                  </Typography>
                </div>
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Registrarse
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Ya tienes cuenta?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    acceder
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
