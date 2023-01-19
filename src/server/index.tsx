// react-dom needed to render React component
import { createRoot } from "react-dom/client"
    // function creates container Reach will mount itself on the front end
import App from "./components/app"

const container = document.getElementById("app");
const root = createRoot(container);
        
root.render(<App initialData={(window as any).initialData}/>);
//root.render(<App/>);
    // to delay render until have data: move to axios promise handler