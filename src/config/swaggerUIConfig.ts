import swaggerJSDoc from "swagger-jsdoc"

const options = {
    failOnErrors:true,
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movie Ticket Booking System API",
            version: "1.0.0",
            description: "A simple ticket booking API for a movie theatre"
        },
        servers : [{
           url: "/"}
        ]
    },
    apis: ["./src/**/*.ts"]
}

const specs = swaggerJSDoc(options)

export default specs