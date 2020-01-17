import uuid from 'uuid/v1';
import { db } from '../../../../firebase';
export default [
  {
    id: uuid(),
    ref: 'Actualizar Software Versión',
    amount: 25.1,
    customer: {
      name: 'Rodrigo Govea'
    },
    createdAt: 1555016400000,
    status: 'pendiente'
  },
  {
    id: uuid(),
    ref: 'Error usuario incorrecto',
    amount: 25.1,
    customer: {
      name: 'Ana Maria'
    },
    createdAt: 1555016400000,
    status: 'urgente'
  },
  {
    id: uuid(),
    ref: 'Error el ADD no conecta',
    amount: 25.1,
    customer: {
      name: 'Chavon Ayála'
    },
    createdAt: 1555016400000,
    status: 'urgente'
  }
];
