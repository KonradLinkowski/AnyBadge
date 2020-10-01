const express = require('express')
const app = express()

const port = process.env.PORT || 2137

const { validate, ValidationError: RequestValidationError, Joi } = require('express-validation')
const { makeBadge } = require('badge-maker')

const stripProperties = (original, allowedProperties) =>
  Object.entries(original).reduce((obj, [property, value]) => {
    if (allowedProperties.includes(property)) {
      obj[property] = value
    }
    return obj
  }, {})

// ref: https://gist.github.com/olmokramer/82ccce673f86db7cda5e#gistcomment-3170588
const colorRegex = /((?:[0-9a-fA-F]{2}){2,4}$|([0-9a-fA-F]{3}$)|(rgb|hsl)a?\\((-?\\d+%?[,\\s]+){2,3}\\s*[\\d\\.]+%?\\)$|black$|silver$|gray$|whitesmoke$|maroon$|red$|purple$|fuchsia$|green$|lime$|olivedrab$|yellow$|navy$|blue$|teal$|aquamarine$|orange$|aliceblue$|antiquewhite$|aqua$|azure$|beige$|bisque$|blanchedalmond$|blueviolet$|brown$|burlywood$|cadetblue$|chartreuse$|chocolate$|coral$|cornflowerblue$|cornsilk$|crimson$|darkblue$|darkcyan$|darkgoldenrod$|darkgray$|darkgreen$|darkgrey$|darkkhaki$|darkmagenta$|darkolivegreen$|darkorange$|darkorchid$|darkred$|darksalmon$|darkseagreen$|darkslateblue$|darkslategray$|darkslategrey$|darkturquoise$|darkviolet$|deeppink$|deepskyblue$|dimgray$|dimgrey$|dodgerblue$|firebrick$|floralwhite$|forestgreen$|gainsboro$|ghostwhite$|goldenrod$|gold$|greenyellow$|grey$|honeydew$|hotpink$|indianred$|indigo$|ivory$|khaki$|lavenderblush$|lavender$|lawngreen$|lemonchiffon$|lightblue$|lightcoral$|lightcyan$|lightgoldenrodyellow$|lightgray$|lightgreen$|lightgrey$|lightpink$|lightsalmon$|lightseagreen$|lightskyblue$|lightslategray$|lightslategrey$|lightsteelblue$|lightyellow$|limegreen$|linen$|mediumaquamarine$|mediumblue$|mediumorchid$|mediumpurple$|mediumseagreen$|mediumslateblue$|mediumspringgreen$|mediumturquoise$|mediumvioletred$|midnightblue$|mintcream$|mistyrose$|moccasin$|navajowhite$|oldlace$|olive$|orangered$|orchid$|palegoldenrod$|palegreen$|paleturquoise$|palevioletred$|papayawhip$|peachpuff$|peru$|pink$|plum$|powderblue$|rosybrown$|royalblue$|saddlebrown$|salmon$|sandybrown$|seagreen$|seashell$|sienna$|skyblue$|slateblue$|slategray$|slategrey$|snow$|springgreen$|steelblue$|tan$|thistle$|tomato$|transparent$|turquoise$|violet$|wheat$|white$|yellowgreen$|rebeccapurple$)/i

const querySchema = {
  query: Joi.object({
    label: Joi.string(),
    message: Joi.string().required(),
    labelColor: Joi.string().regex(colorRegex),
    color: Joi.string().regex(colorRegex),
    style: Joi.string().valid('plastic', 'flat', 'flat-square', 'for-the-badge', 'social')
  }).unknown(true)
}

app.get('/', (req, res) => {
  res.redirect('https://github.com/KonradLinkowski/AnyBadge')
})

app.get('/badge', validate(querySchema, {}, {}), (req, res) => {
  const badgeData = stripProperties(req.query, [...querySchema.query._ids._byKey.keys()])
  const svg = makeBadge(badgeData)
  res.setHeader('Content-Type', 'image/svg+xml')
  res.send(svg)
})

app.use(function(err, req, res, next) {
  console.error(err)
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json(err)
  }
 
  return res.status(500).json(err)
})

app.listen(port, () => console.log('App started at port:', port))
