import Vue from 'vue';
import moment from 'moment';
Vue.filter('formatDate', (val, formatString) => {
    formatString = formatString || 'YYYY-MM-DD HH:mm';
    return moment(val).format(formatString);
});