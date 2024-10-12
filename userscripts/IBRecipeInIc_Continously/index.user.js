// ==UserScript==
// @name        Make infinibrowser lineage in IC
// @namespace   infinityCommunity
// @match       https://neal.fun/infinite-craft/*
// @match       https://infinibrowser.zptr.cc/item/*
// @grant       unsafeWindow
// @grant       GM.getValue
// @grant       GM.setValue
// @run-at      document-end
// @version     1.0
// @author      Alexander_Andercou
// @description 8/5/2024, 12:32:42 AM
// ==/UserScript==
window.addEventListener("load", async () => {
  if (window.location.host == "neal.fun") {



    setInterval( async function(){


   //do lineage when state is start

   let currentState= await GM.getValue("state");
    if(currentState=="start")
    {


      GM.setValue("state","progress");
      let recipeRaw= await GM.getValue("recipeIB");
      console.log("recipe raw",recipeRaw);
      let recipes=JSON.parse(recipeRaw);



     for(let recipe of recipes)
      {


        let elm=unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements.find(x=>x.text==recipe[1]);
        let elm1=unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0]._data.elements.find(x=>x.text==recipe[0]);
          try{



        console.log("this ones:",elm,elm1);
       await unsafeWindow.$nuxt.$root.$children[2].$children[0].$children[0].craft({text:recipe[0],emoji:elm1?.emoji,discovered:elm1?.discovered}, {text:recipe[1],emoji:elm?.emoji,discovered:elm?.discovered});


          }catch(err)
            {
              console.log(err);
            }






      }


    }



    },20000);


  } else if (window.location.pathname.startsWith("/item/") || window.location.pathname.startsWith("/item?")) {


    GM.setValue("state","init");

     let stepsRefined=[];


    let stepsRaw=document.querySelector(".recipes").querySelectorAll(".step");

    let Wait=setInterval(async function(){if(stepsRaw)
                        {
                         stepsRaw=document.querySelector(".recipes").querySelectorAll(".step");
                          clearInterval(Wait);
                           for(let stepRaw of stepsRaw)
                            {
                             let itemsRaw=stepRaw.querySelectorAll(".item");
                             let step=[];
                             for(let item of itemsRaw)
                              {

                                let itemText=item.childNodes[1].textContent;
                                step.push(itemText);


                                    }

                             stepsRefined.push(step);

                             }

                    let textRecipe=JSON.stringify(stepsRefined);
                  console.log(textRecipe);
                  GM.setValue("recipeIB",textRecipe);
                  GM.setValue("state","start");



                        }




       },2000);











  } else if (window.location.pathname.startsWith("/search")) {

  }
});
