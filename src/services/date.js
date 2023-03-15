const formatPostDate = (date) => {
  let dateFormat = new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return dateFormat
}

export default formatPostDate
