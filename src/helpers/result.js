const ResultType = {
  Ok: 'Ok',
  Fail: 'Fail'
}

const Ok = (obj) => ({
  result: ResultType.Ok,
  message: 'Ok',
  data: obj
})

const Fail = (message, obj = null) => ({
  result: ResultType.Fail,
  message,
  data: obj
})

module.exports = {
  Result: {
    Ok, Fail
  },
  ResultType
}
