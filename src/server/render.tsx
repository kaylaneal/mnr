import { fetchContest, fetchContestList } from "../api-client"
import reactDOMServer from "react-dom/server"
import App from "./components/app"

const serverRender = async(req) => {
    //request.url or request.params.contestId
    const { contestId } = req.params;

    const initialData = 
        contestId ? { currentContest: await fetchContest(contestId) } : 
        { contests: await fetchContestList() };
    //fetchContests to get data
    
    // to render: <App initialData={{contests}} />
    const initialMarkup = reactDOMServer.renderToString(<App initialData />);

    return {initialMarkup, initialData};
};

export default serverRender;