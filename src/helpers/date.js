import { parse, formatISO, parseISO, format } from 'date-fns'
import es from 'date-fns/locale/es'

export function stringToISO(dateString) {
  const newDate = parse(dateString, 'dd/MM/yyyy', new Date())
  return formatISO(newDate)
}

export function displayDate(isoDate) {
  const newDate = parseISO(isoDate)
  return format(newDate, 'PPPP', { locale: es })
}

export function convertToDDMMYYYY(isoDate) {
  const newDate = new Date(isoDate)
  return format(newDate, 'dd/MM/yyyy')
}