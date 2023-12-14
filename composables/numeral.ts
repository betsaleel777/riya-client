import numeral from 'numeral'
numeral.register('locale', 'fr', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: 'FCFA'
  }
});
numeral.locale('fr')
const useCurrency = (value: string | number) => `${ numeral(value).format() } FCFA`
export { useCurrency }
