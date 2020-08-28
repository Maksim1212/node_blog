function getUserMainFields(user) {
    const { name, _id } = user;
    return {
        _id,
        name,
    };
}

module.exports = {
    getUserMainFields,
};
