const jwt = require('jsonwebtoken');

const makeId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateKeyPairs = async (user) => {
  try {
    const expiresIn = 60 * 10;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn,
    });
    const refreshToken = makeId(20);
    user.refresh_token = refreshToken;
    await user.save();

    return { token, refreshToken };
  } catch (e) {
    throw e;
  }
};

module.exports = { generateKeyPairs };
