import Ember from 'ember';
import moment from 'moment';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

export function date([date, format] /*, hash*/ ) {
  return moment(date).format(format || DATE_FORMAT);
}

export default Ember.Helper.helper(date);
