const ipcRenderer = require('electron').ipcRenderer
const $ = require('jquery')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')
var j = require('request').jar()
var proxyUrl = null
var request = require('request').defaults({
    timeout: 30000,
    jar: j,
    proxy: proxyUrl
})

function log(m) {
    var date = new Date()
    var formatted = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
    $("#log-box").append(`<span class="console-log">[${formatted}] ${m}</span><br><br><br>`)
}

ipcRenderer.on('log', function(event, data) {
    log(data.msg)
    init(data.link)
})

function init(url) {
    log('Adding to cart...')
    request({
        url: url,
        method: 'get',
        encoding: null,
        gzip: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
            'Referer': url,
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'en-US,en;q=0.8'
        }
    }, function(err, res, body) {

        if (err) {
            return log('Error has occured while trying to pickup session id')
        } else {
            var bodyWithCorrectEncoding = iconv.decode(body, 'iso-8859-1')
            var $ = cheerio.load(bodyWithCorrectEncoding);
        }

        var subtotal = $('.payment-due__price').text().replace(/\s+/g, '')

        if (subtotal === '') {
            return log('Item Sold Out')
        }

        log('Subtotal: ' + subtotal)

        var storeID = $('.edit_checkout').attr('action').split('/')[1]
        var checkoutID = $('.edit_checkout').attr('action').split('checkouts/')[1]
        var auth_token = $('input[name=authenticity_token]').attr('value')

        var config = null
        log('Checkout ID: ' + checkoutID)
        return input(id, checkoutID, auth_token, config, storeID)

    })
}

function input(id, checkoutID, auth_token, config, storeID) {

  console.log(id)
  console.log(checkoutID)
  console.log(auth_token)
  console.log(config)
  console.log(storeID)

}
