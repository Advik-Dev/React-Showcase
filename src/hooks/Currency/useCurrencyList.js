import { useState, useEffect } from "react";

function useCurrencyList() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(
            "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json"
        )
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Error fetching currency:", err));
    }, []);
    return data;
}

export default useCurrencyList;