import express from "express";
import axios from "axios";

const port=3000;
const app=express();

app.use(express.static("public"));

app.get("/",async (req,res)=>{
    try{
    const response=await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const stri=response.data;
    const drink = stri.drinks[0];
    const ing=[];
    let j=0;
for (let i = 1; i <= 15; i++) {
  const ingredient = drink[`strIngredient${i}`];
  const measure = drink[`strMeasure${i}`];

  if (ingredient) {
    ing[j]=(`${measure} of ${ingredient}`);
    j++;

  }
}
//console.log(ing);
    res.render("index.ejs",{
        name:stri.drinks[0].strDrink,
        ingd:ing,
        cat:stri.drinks[0].strCategory,
        ins:stri.drinks[0].strInstructions,
        img:stri.drinks[0].strDrinkThumb,
        glass:stri.drinks[0].strGlass,
    });
    }
    catch(error){
        res.render("index.ejs",{content:error.response.data})
    }
    
});

app.use("/random",async (req,res)=>{
    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
});