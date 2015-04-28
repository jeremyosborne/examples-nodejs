window.onload = function() {

    var updates = document.querySelector("#updates ul");
    var canvas = document.querySelector("#price-chart");
    var c = canvas.getContext("2d");

    var pricesTemplate = document.querySelector("#price-list-template").text;
    pricesTemplate = Handlebars.compile(pricesTemplate);

    var priceList = [];

    var updatePriceListView = function() {
        var p = priceList.slice();
        p.reverse();
        updates.innerHTML = pricesTemplate({prices: p});
    };

    var updatePriceChartView = function() {
        var i;
        var p = priceList;
        c.strokeStyle = "#0c5da5";

        // Redraw each time.
        c.clearRect(0, 0, canvas.width, canvas.height);

        c.beginPath();
        c.moveTo(p[0].time, p[0].price);
        for (i = 1; i < p.length; i++) {
            c.lineTo(p[i].time, canvas.height-p[i].price);
        }
        c.stroke();

    };

    var updatePrice = function(data) {
        var previousPrice = priceList.length > 0 ? priceList[priceList.length-1].price : undefined;
        priceList.push(data);

        // Modify the server data with data relevant to our app.
        if (previousPrice === undefined || data.price === previousPrice) {
            data.change = "even";
        }
        else if (data.price > previousPrice) {
            data.change = "up";
        }
        else {
            data.change = "down";
        }

        // Redraw things.
        updatePriceListView();
        updatePriceChartView();
    };


    //------------------------------------------------- Implement EventSource

    if (window.EventSource) {
        var url = "http://localhost:8080/stock-updates";

        source = new EventSource(url);

        source.addEventListener('open', function(e) {
            document.querySelector("#updates-active").className = "yes";
            console.log("Connection opened.");
        });
        source.addEventListener('message', function(e) {
            updatePrice(JSON.parse(e.data));
        });

        source.addEventListener('error', function(e) {
            if (e.readyState == EventSource.CLOSED) {
                document.querySelector("#updates-active").className = "no";
                console.log("Connection closed.");
            }
        });
    }
    else {
        alert("Sorry, the EventSource object is not supported by the browser you are using.");
    }

};
