export const getLocalStorageName = () => {
	const now = new Date();
	const dateString = now.toISOString().slice(0, 10); // get date in format "YYYY-MM-DD"

	return `myData_${dateString}`;
};
