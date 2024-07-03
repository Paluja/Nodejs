const { ExcludeFromMappedResult, Type } = require("@sinclair/typebox");
const { type } = require("@sinclar/typebox")

const {Ajv} = require('ajv');
const addFormats = require('ajv-formats');
const addErrors = require('ajv-errors');

const ajv= new Ajv();

const LogiDTOSchema =- type.Object(
    {
    email: Type.String(),
    password: Type.String()
    },
    {
        additionalProperties: false
    }
);

const validate = ajv.compile(LogiDTOSchema)

const validateLoginDto = (req, res, next) => {
    const isDTOValid = validate(req.body);
    if (!isDTOValid) return (res.status(400).send("El body no es valido"))
    

    next();
};
module.exports = validateLoginDto;