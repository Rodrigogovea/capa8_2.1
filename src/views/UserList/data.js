import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    name: 'Rodrigo Govea ',
    address: {
      country: 'México',
      state: 'Michoacán',
      city: 'Zamora de hidalgo',
      street: 'Andalucia norte #20'
    },
    email: 'rodrigogovea@live.com.mx',
    phone: '3511530922',
    avatarUrl: '/images/avatars/avatar_rgm.png',
    createdAt: 1577885280000
  },
  {
    id: uuid(),
    name: 'Alfonso Ochoa',
    address: {
      country: 'México',
      state: 'Michoacán',
      city: 'Jacona',
      street: 'Madero norte 33'
    },
    email: 'aochoac011@accitesz.com',
    avatarUrl: '/images/avatars/avatar_poncho.png',
    phone: '3511111111',
    createdAt: 1577885280000
  }
];
