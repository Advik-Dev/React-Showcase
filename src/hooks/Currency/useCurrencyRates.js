import { useState, useEffect } from "react";

function useCurrencyRates(from, to, range) {
    const [data, setData] = useState(null);

    function getDates(range) {
        const today = new Date();
        let dates = [];

        const formatDate = (date) => date.toISOString().split("T")[0]; // "YYYY-MM-DD"

        if (range === "10D") {
            for (let i = 0; i < 10; i++) {
                const d = new Date(today);
                d.setDate(today.getDate() - i);
                dates.unshift(formatDate(d));
            }
        } else if (range === "1M") {
            for (let i = 0; i < 30; i++) {
                const d = new Date(today);
                d.setDate(today.getDate() - i);
                dates.unshift(formatDate(d));
            }
        } else if (range === "1Y") {
            for (let i = 0; i < 12; i++) {
                const d = new Date(today);
                d.setMonth(today.getMonth() - i);
                dates.unshift(formatDate(d));
            }
        } else if (range === "10Y") {
            for (let i = 0; i < 10; i++) {
                const d = new Date(today);
                d.setFullYear(today.getFullYear() - i);
                dates.unshift(formatDate(d));
            }
        }

        return dates;
    }

    useEffect(() => {
        if (!from || !to) {
            console.log("from or to undefined, skipping fetch", { from, to, range });
            return;
        }

        const controller = new AbortController();
        const dates = getDates(range);

        async function fetchRates() {
            try {
                const requests = dates.map(async (date) => {
                    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${from}.json`;
                    const res = await fetch(url, { signal: controller.signal });
                    if (!res.ok) return null;
                    const json = await res.json();
                    return { date, rate: json[from][to] };
                });

                const results = await Promise.all(requests);
                console.log("all results", results);
                setData(results.filter(Boolean));
                console.log(results)
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            }
        }

        fetchRates();

        return () => controller.abort();
    }, [from, to, range]);

    return data;
}

export default useCurrencyRates;
