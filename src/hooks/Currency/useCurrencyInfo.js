import { useState, useEffect } from "react";

function useCurrencyRates(currencyName) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!currencyName) return;

        const controller = new AbortController();

        fetch(
            `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyName}.json`,
            { signal: controller.signal }
        )
            .then((res) => res.json())
            .then((data) => setData(data[currencyName]))
            .catch((err) => {
                if (err.name !== "AbortError") console.error("Error fetching currency:", err);
            });

        return () => controller.abort(); // cleanup on unmount
    }, [currencyName]);

    return data;
}

export default useCurrencyRates;
