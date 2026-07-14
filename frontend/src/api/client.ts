const API_URL = "/api";


export async function getStatus() {

    const response = await fetch(
        `${API_URL}/status`
    );

    return response.json();

}



export async function saveSetting(
    key: string,
    value: string
) {

    const response = await fetch(
        `${API_URL}/settings`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                key,
                value
            })
        }
    );


    return response.json();

}
