import moment from "moment";

export const getMonthSelectedFormat = (
	monthSelected: Date,
	format = "MMMM_YYYY"
) => {
	return moment(monthSelected).format(format);
};
