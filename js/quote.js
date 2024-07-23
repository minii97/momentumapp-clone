fetch('./assets/data/quote.json')
  .then((res) => res.json())
  .then((data) => {
    const author = document.querySelector('.author')
    const quote = document.querySelector('.quote')

    const quoteLength = 10
    crateRandomNum(quoteLength - 1)

    author.innerHTML = data[randomNum].author
    quote.innerHTML = `"${data[randomNum].quote}"`

    const quoteBtn = document.querySelector('.quote-btn')

    quoteBtn.addEventListener('click', () => {
      const quoteList = document.querySelector('.quote-list')
      overlay.classList.remove('hide')
      quoteList.classList.add('is-active')

      overlay.addEventListener('click', (e) => {
        e.currentTarget.classList.add('hide')
        quoteList.classList.remove('is-active')
      })
    })
  })
  .catch((error) => {
    console.log(error)
  })
