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
    console.log(jsonResponse)

}

main()