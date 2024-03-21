import fs from 'fs';

export const saveUserData = (data: any) => {
	const stringifyData = JSON.stringify(data);
	fs.writeFileSync('data.json', stringifyData);
};

export const getUserData = () => {
	const jsonData = fs.readFileSync('data.json');
	return JSON.parse(jsonData as unknown as string);
};
