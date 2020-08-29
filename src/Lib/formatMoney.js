const Format = amount => {
  return Number(amount)
  .toFixed()
  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export default Format