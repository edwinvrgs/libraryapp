import * as CST from '../constants';
import initialState from '../store/initialState';
import R from 'ramda';

export default function setName(state = initialState, { type, payload }) {
  switch (type) {
    case CST.GET_NAME:
      return R.merge(state, payload);
    default:
      return state;
  }
}
