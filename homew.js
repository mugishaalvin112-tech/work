const http = require("http");
const url = require("url");

const conversionRates = {
  usd: 1500,
  eur: 1700,
  cny: 2000
};

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/convert") {

    let amount = parsedUrl.query.amount;
    let currency = parsedUrl.query.currency;

    if (!amount) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Amount is required" }));
      return;
    }

    if (!currency) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Currency is required" }));
      return;
    }

    amount = Number(amount);

    if (isNaN(amount)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Invalid number" }));
      return;
    }

    if (!conversionRates[currency]) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Unsupported currency" }));
      return;
    }

    let convertedAmount = amount * conversionRates[currency];

    let result = {
      input: {
        amount: amount,
        currency: currency
      },
      convertedAmount: convertedAmount,
      unit: "RWF"
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result, null, 2));

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }

});

server.listen(2000, () => {
  console.log("Server running on port 2000");
});