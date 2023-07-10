export const replaceHeigthInUrlPicture = (url: string): string => {
	let index = url.search('px-') - 2;

	let strSplit = url.split('');

	strSplit.splice(index, 2, '500');

	return strSplit.join('');
};
