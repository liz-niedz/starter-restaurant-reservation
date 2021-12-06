const service = require('./tables.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const hasProperties = require('../errors/hasProperties')

const VALID_PROPERTIES = [
    "table_name",
    "capacity"
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

  const hasRequiredProperties = hasProperties("table_name", "capacity");

  function validTableName(req, res, next) {
      const tableName = req.body.data.table_name;
      if(tableName.length <= 1) {
          next({
              status:400,
              message: "table_name must be longer than one character"
          })
      } 
      next()
  }

  function capacityIsNum(req, res, next) {
      const capacity = req.body.data.capacity;
    if(typeof capacity !== 'number') {
        next({
            status:400,
            message: "capacity must be a number."
        })
    }
    next()
  }


async function create (req, res, next) {
    const data = await service.create(req.body.data)
    res.status(201).json({ data })
  }

  async function list (req, res) {
      const data = await service.list();
    res.json({ data: data });
  }

module.exports = {
create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validTableName,
    capacityIsNum,
    asyncErrorBoundary(create),
],
list: [asyncErrorBoundary(list)],
}
