import express from "express"
import config from "./config"
import apiRouter from "./api-router"
import serverRender from "./render"

const server = express();

//middleware: a layer
server.use(express.static("dist"));

server.set("view engine", "ejs");

server.use("/api", apiRouter);

server.use(["/", "/contest/:contestId"], async(req, res) => {
    const {initialMarkup, initialData} = await serverRender(req);
    res.render("index", {
        initialMarkup,
        initialData,
    });
});

// start server: 
server.listen(config.PORT, config.HOST, () => {
    console.info(
        `Express server is listening at ${config.SERVER_URL}`
    );
});