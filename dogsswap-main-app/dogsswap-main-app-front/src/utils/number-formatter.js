export default function numberFormatter (val) {
  console.log(val)
  return new Intl.NumberFormat('en', {
    maximumFractionDigits: 4
  }).format(val) || ''
}
