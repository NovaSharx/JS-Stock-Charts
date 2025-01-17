async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch('https://api.twelvedata.com/time_series?symbol=BNTX,DIS,GME,MSFT&interval=1min&apikey=66e6e17a0edb42b29de0a8651b6d7c63', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'apikey 66e6e17a0edb42b29de0a8651b6d7c63'
        }
    })

    let jsonResponse = await response.json()
    
    // const {GME, MSFT, DIS, BNTX} = jsonResponse
    const {GME, MSFT, DIS, BNTX} = mockData
    const stocks = [GME, MSFT, DIS, BNTX] 

    stocks.forEach(stock => stock.values.reverse())

    // console.log(stocks)

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: 
                    getColor(stock.meta.symbol),
                borderColor:
                    getColor(stock.meta.symbol),
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => getHighest(stock.values)),
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol))
            }]
        }
    });

    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data: stocks.map(stock => getAverage(stock.values)),
                backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
                borderColor: stocks.map(stock => getColor(stock.meta.symbol))
            }]
        }
    });

    function getColor (stock) {
        if (stock === 'GME') {
            return 'rgba(61, 161, 61, 0.7)'
        }
        if (stock === 'MSFT') {
            return 'rgba(209, 4, 25, 0.7)'
        }
        if (stock === 'DIS') {
            return 'rgba(18, 4, 209, 0.7)'
        }
        if (stock === 'BNTX') {
            return 'rgba(166, 43, 158, 0.7)'
        }
    }   
    
    function getHighest(values) {
        let highest = 0
        values.forEach(value => {
            if (parseFloat(value.high) > highest) {highest = parseFloat(value.high)}
        })
        return highest
    }

    function getAverage(values) {
        let sum = 0
        values.forEach(value => {
            sum += parseFloat(value.high)
        })
        let average = sum/values.length
        return average
    }

}

main()