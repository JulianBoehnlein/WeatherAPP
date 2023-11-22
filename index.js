import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) =>{
    res.render("index.ejs");
});
 //wenn ich get nehmen würde, dann mit req.query.city "Mit der GET-Methode werden die Formulardaten als Abfrageparameter an die URL angehängt und nicht im Anfragekörper gesendet"


app.post("/weather", async (req, res) => { //hier innerhalb der Funktion die const deklarieren
    
    const APIKey = "e008292b76564b7da96b3e52d5e4f9bb";
    const city = req.body["city"];
    const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric&lang=de`; 

  
    try{
        const response = await axios.get(APIurl);
        const result = response.data;

    let img;
  
    switch (result.weather[0].main) { //Rain, Snow, Thunderstorm, Drizzle, Mist, Clear, Clouds, Haze
        case "Rain" :
            img = './images/rain.png'
            break;
        
        case "Clear" :
            img = './images/Clear.png'
            break;

        case "Clouds" :
            img = './images/Clouds.png'
            break;

        case "Snow" :
            img = './images/Snow.png'
            break;

        case "Mist" :
            img = './images/Mist.png'
            break;

        case "Haze" :
            img = './images/Mist.png'
            break;

        case "Thunderstorm" :
            img = './images/Thunderstorm.png'
            break;

        default:
            img = './images/default.png'
            break;
    }

        res.render("index.ejs", {
            data: result, 
            city,
            img,
        });
  
    } catch(error) {
        console.log("Error:", error);
        res.render("index.ejs", {error:"Oops! Location not found!"});
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });