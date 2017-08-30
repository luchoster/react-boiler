import R from 'ramda'

const notEmpty = R.complement(R.isEmpty)

const notNil = R.complement(R.isNil)

const notNilOrEmpty = R.complement(R.either(R.isNil, R.isEmpty))

const notEquals = R.curry((a, b) => R.complement(R.equals(a))(b))

const nilOrEmpty = R.either(R.isNil, R.isEmpty)

const mapIndexed = R.addIndex(R.map)

export {
    notEmpty,
    notNil,
    notEquals,
    nilOrEmpty,
    notNilOrEmpty,
    mapIndexed
}
