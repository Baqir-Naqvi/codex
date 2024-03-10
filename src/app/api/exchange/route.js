// pages/api/convert.js

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const currency = searchParams.get("currency");
    let currencies_rate = [{ currency: 'CZK', rate: 1 },]

    //if currency == CZK return 1
    if (currency === 'CZK') {
        return Response.json({ status: 200, data: { currency: 'CZK', rate: 1 } });
    }

    try {
        const response = await fetch('https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt');
        const data = await response.text();

        const lines = data.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].split('|');
            currencies_rate.push({ currency: line[3], rate: line[4] })
            //find the currency
            if (line[3] === currency) {

                return Response.json({ status: 200, data: { currency: line[3], rate: line[4] } });
            }
        }
        if (currency =="all"){
            return Response.json({ status: 200, data: currencies_rate });
        }
        return Response.json({ status: 400, message: 'Currency not found' });
    } catch (error) {
        console.error('Error fetching currency conversion:', error);
        return Response.json({ status: 500, message: 'Unable to fetch currency conversion' });

    }
}
