export default (value) => {
    const date = new Date(value)
    // si je laisse 'fr-fr' Vide cela prend la valeur de l'ordi
    return date.toLocaleString(['fr-fr'], {day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})
}