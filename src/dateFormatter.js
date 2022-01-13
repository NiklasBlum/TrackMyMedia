import moment from "moment";
export default {
  getGermanDate(date) {
    if (date) {
      if (date.seconds) {
        return moment(date.seconds * 1000)
          .locale("de")
          .format("DD.MM.YYYY");
      } else {
        return moment(date)
          .locale("de")
          .format("DD.MM.YYYY");
      }
    }
  },
};
