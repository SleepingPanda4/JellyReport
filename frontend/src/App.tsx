import {
    useEffect,
    useState
} from "react";

import {
    getStatus
} from "./api/client";

import Setup from "./pages/Setup";

import Dashboard from "./pages/Dashboard";



function App() {


    const [complete, setComplete] =
        useState<boolean | null>(null);



    async function checkStatus() {

        const data = await getStatus();

        setComplete(
            data.setup_complete
        );

    }



    useEffect(() => {

        checkStatus();

    }, []);



    if (complete === null) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );

    }



    if (!complete) {

        return <Setup />;

    }



    return <Dashboard />;


}


export default App;
