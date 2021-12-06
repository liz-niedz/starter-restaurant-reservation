const service = require('./reservations.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const hasProperties = require('../errors/hasProperties')

const VALID_PROPERTIES = [
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people'
]

function hasOnlyValidProperties (req, res, next) {
  const { data = {} } = req.body

  const invalidFields = Object.keys(data).filter(
    field => !VALID_PROPERTIES.includes(field)
  )

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(', ')}`
    })
  next()
}

const hasRequiredProperties = hasProperties(
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people'
)

/*function hasValidInputs (req, res, next) {
  const { people, reservation_date, reservation_time } = req.body.reservation.data
  let invalidInputs = 'Invalid input(s):'

  if (typeof people !== 'number') {
    invalidInputs = invalidInputs.concat('people')
  }

  if (!reservationDateIsValid(reservation_date)) {
    invalidInputs = invalidInputs.concat('reservation_date')
  }

  if (!reservationTimeIsValid(reservation_time)) {
    invalidInputs = invalidInputs.concat('reservation_time')
  }

  if (invalidInputs !== 'Invalid inputs(s):') {
    return next({
      status: 400,
      message: invalidInputs
    })
  }
  return next()
} */

function dateIsValid (req, res, next) {
  const { reservation_date } = req.body.data
  const isDate = Date.parse(reservation_date)
  console.log(reservation_date)

  if (!Number.isNaN(isDate)) {
    return next()
  }
  next({
    status: 400,
    message: `reservation_date is not a valid date.`
  })
}

function reservationTimeIsValid (req, res, next) {
  const { reservation_time } = req.body.data
  const isTime = reservation_time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  if (isTime) {
    return next()
  } else {
    next({
      status: 400,
      message: `reservation_time is not a valid time.`
    })
  }
}

async function reservationExists (req, res, next) {
  const reservation = await service.read(req.params.reservationId)
  if (reservation) {
    res.locals.reservation = reservation
    return next()
  }
  next({ status: 400, message: 'Reservation cannot be found.' })
}

function peopleIsNum (req, res, next) {
  const people = req.body.data.people
  if (typeof people !== 'number' || people < 0) {
    next({
      status: 400,
      message: `people must be a number and greater than zero.`
    })
  } else {
    return next()
  }
}

function notInPast (req, res, next) {
  const { reservation_date, reservation_time } = req.body.data
  let now = Date.now()
  let bookedTime = Date.parse(`${reservation_date} ${reservation_time} EST`)
  if (bookedTime > now) {
    return next()
  } else {
    return next({
      status: 400,
      message: 'Reservation must be made in the future.'
    })
  }
}

function notTuesday (req, res, next) {
  const { reservation_date, reservation_time } = req.body.data
  let day = new Date(`${reservation_date} ${reservation_time}`)
  if (day.getDay() !== 2) {
    next()
  } else {
    return next({
      status: 400,
      message: 'Restaurant is closed on Tuesdays, please select another day.'
    })
  }
}

function timeDuringOpenHours (req, res, next) {
  const { reservation_time } = req.body.data
  if (reservation_time < '10:30' || reservation_time > '21:30') {
    next({
      status: 400,
      message: 'Reservation time must be made between 10:30 am and 9:30 pm.'
    })
  } else {
    return next()
  }
}

async function create (req, res, next) {
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}

async function list (req, res) {
  res.json({
    data: await service.list(req.query.date)
  })
}

async function read (req, res) {
  const reservation = await service.read(req.params.reservationId)
  res.json({ data: reservation});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    dateIsValid,
    reservationTimeIsValid,
    peopleIsNum,
    notInPast,
    notTuesday,
    timeDuringOpenHours,
    asyncErrorBoundary(create)
  ]
}
