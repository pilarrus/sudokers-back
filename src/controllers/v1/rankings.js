const Rankings = require('../../mongo/models/rankings');

const initialiseRanking = async (req, res) => {
  try {
    const levels = ['Fácil', 'Medio', 'Difícil', 'Extremo'];
    const { userId } = req.params;

    const results = [];

    for (const level of levels) {
      results.push(Rankings.create({ user: userId, level }));
    }
    const initialisedResults = await Promise.all(results);
    return res.status(201).json({ status: 'OK', message: initialisedResults });
  } catch (e) {
    return res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

const getResults = async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await Rankings.find({
      user: userId,
    });
    return res.status(200).json({ status: 'OK', message: results });
  } catch (e) {
    return res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

const compareNumbers = (x, y) => {
  if (x > y) return 1;
  if (x < y) return -1;
  return 0;
};

const compareTimer = (currentTimer, timer) => {
  if (timer.includes('---')) return 1;

  const minutes = parseInt(timer.slice(0, 2), 10);
  const currentMinutes = parseInt(currentTimer.slice(0, 2), 10);
  let response = compareNumbers(currentMinutes, minutes);
  if (response !== 0) return response;

  const seconds = parseInt(timer.slice(3, 5), 10);
  const currentSeconds = parseInt(currentTimer.slice(3, 5), 10);
  response = compareNumbers(currentSeconds, seconds);
  return response;
};

const updateRanking = async (req, res) => {
  try {
    const currentResult = req.body;
    const results = await Rankings.find({
      user: currentResult.user,
    });
    const resultFound = results.find(result => result.level === currentResult.level);
    const response = compareTimer(currentResult.timer, resultFound.timer);
    if (response === -1) {
      await Rankings.findByIdAndDelete(resultFound._id);
      await Rankings.create(currentResult);
      return res.status(200).json({ status: 'OK', message: 'current result saved' });
    }
    return res.status(200).json({ status: 'OK', message: 'unchanged' });
  } catch (e) {
    return res.status(500).json({ status: 'ERROR', message: e.message });
  }
};

module.exports = { initialiseRanking, getResults, updateRanking };
