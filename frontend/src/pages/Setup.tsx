import { useState } from "react";
import { saveSetting } from "../api/client";


function Setup() {


    const [jellyfinUrl, setJellyfinUrl] =
        useState("");

    const [apiKey, setApiKey] =
        useState("");

    const [message, setMessage] =
        useState("");



    async function handleSave() {


        await saveSetting(
            "jellyfin_url",
            jellyfinUrl
        );


        await saveSetting(
            "jellyfin_api_key",
            apiKey
        );


        setMessage(
            "Configuration saved!"
        );

    }



    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-slate-800 p-8 rounded-xl w-96">


                <h1 className="text-3xl font-bold mb-4">
                    JellyReport
                </h1>


                <p className="mb-6">
                    Connect your Jellyfin server
                </p>



                <input
                    className="w-full p-3 mb-3 rounded bg-slate-700"
                    placeholder="Jellyfin URL"
                    value={jellyfinUrl}
                    onChange={
                        e => setJellyfinUrl(
                            e.target.value
                        )
                    }
                />



                <input
                    className="w-full p-3 mb-4 rounded bg-slate-700"
                    placeholder="API Key"
                    type="password"
                    value={apiKey}
                    onChange={
                        e => setApiKey(
                            e.target.value
                        )
                    }
                />



                <button
                    className="w-full bg-blue-600 p-3 rounded"
                    onClick={handleSave}
                >

                    Save Configuration

                </button>



                <p className="mt-4">
                    {message}
                </p>


            </div>

        </div>

    );

}


export default Setup;
