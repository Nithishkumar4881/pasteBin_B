function getCurrentTime(req) {
  if (process.env.TEST_MODE === "1") {
    const testNow = req.headers["x-test-now-ms"];
    if (testNow) {
      return Number(testNow); // fake time from header
    }
  }
  return Date.now(); // real system time
}


module.exports = getCurrentTime;