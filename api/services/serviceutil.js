module.exports = {
	toObject: item => {
		const plain = item.toObject();
		return { ...plain, id: plain._id, _id: undefined };
	},
	mapIdToCategoryId: item => {
		return { ...item, categoryId: item._id.toString(), _id: undefined };
	}
};
