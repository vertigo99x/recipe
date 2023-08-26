
const baseUrl='https://api.spoonacular.com'
const myKey = ''
const itemNo = 5


document.getElementById('results').style.display = "none"

var searchForm = document.querySelector('.modal')


document.querySelector('.search-btn').onclick = () =>{
    searchForm.classList.toggle('showform');
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

const showProfile =() => {
    document.querySelector('.modal2').classList.toggle('showform');
}

document.querySelector('#checkbox').onclick = () =>{
    document.querySelector('.field .options').classList.toggle('showoptions');

}
document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('showform');
    
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}
document.querySelector('.close-icon').onclick = () => {

    searchForm.classList.toggle('showform');
    window.onscroll=function(){};
}

function deactivate(){
    let methodForm = document.querySelector('.method-form')
    methodForm.classList.toggle('showform');
    window.onscroll=function(){};
}


document.querySelector('#search-item').onclick = () => {
    document.getElementById('results').style.display = "block"
    var searchBox = document.getElementById('querybox').value
    if (searchBox.trim() == '') {
        alert('Please Enter An Ingredient!!')
        return ''
    }

    //document.getElementById('results').style.display=''

    resultbox = document.getElementById('result-box')
    resultbox.innerHTML = "Loading"

    if (searchBox.split(' ').length > 1) {
        document.getElementById('ingList').innerHTML = `${searchBox.split(' ').slice(0,searchBox.split(' ').length-1).join(',')} and ${searchBox.split(' ')[searchBox.split(' ').length-1]}`
    } else {
        document.getElementById('ingList').innerHTML = `${searchBox}`
    }

    const queryFilter = searchBox.split(' ').join(',')

    
    
    url = `${baseUrl}/recipes/complexSearch?apiKey=${myKey}&includeIngredients=${queryFilter}&number=${itemNo}&diet=paleo`
    //url = 'https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2'
    searchBox = ''

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            searchForm.classList.toggle('showform');
            window.onscroll = function () { };

            const result = data.results
            resultbox.innerHTML = ""


            for (let x = 0; x < result.length; x++){
                console.log(result[x])
                const pk = result[x].id
                const title = result[x].title
                const image = result[x].image

                resultbox.innerHTML += `
                <div class="box" data-aos="fade-up">
                    <div class="image">
                        <img src="${image}" alt="">
                    </div>
                    <div class="content">
                        <h3>${title}</h3>
                        <a href="#" class="btn" onclick="getSteps('${title}',${pk},'${image}')">Get Cooking Steps</a>
                        <div class="icons">
                            
                        </div>
                    </div>
                </div>
                `

                console.log('lili')
            }    
             
            
        })

}

const getSteps = (name, recipePK, itemImg) => {
    var methods = document.getElementById('methods')

    url = `${baseUrl}/recipes/${recipePK}/analyzedInstructions?apiKey=${myKey}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            //var result = [{'name': 'Bourbon Molasses Butter', 'steps': [{'number': 1, 'step': 'Combine the bourbon and sugar in a small saucepan and cook over high heat until reduced to 3 tablespoons, remove and let cool.', 'ingredients': [{'id': 10014037, 'name': 'bourbon', 'localizedName': 'bourbon', 'image': 'bourbon.png'}, {'id': 19335, 'name': 'sugar', 'localizedName': 'sugar', 'image': 'sugar-in-bowl.png'}], 'equipment': [{'id': 404669, 'name': 'sauce pan', 'localizedName': 'sauce pan', 'image': 'sauce-pan.jpg'}]}, {'number': 2, 'step': 'Put the butter, molasses, salt and cooled bourbon mixture in a food processor and process until smooth.', 'ingredients': [{'id': 19304, 'name': 'molasses', 'localizedName': 'molasses', 'image': 'molasses.jpg'}, {'id': 10014037, 'name': 'bourbon', 'localizedName': 'bourbon', 'image': 'bourbon.png'}, {'id': 1001, 'name': 'butter', 'localizedName': 'butter', 'image': 'butter-sliced.jpg'}, {'id': 2047, 'name': 'salt', 'localizedName': 'salt', 'image': 'salt.jpg'}], 'equipment': [{'id': 404771, 'name': 'food processor', 'localizedName': 'food processor', 'image': 'food-processor.png'}]}, {'number': 3, 'step': 'Scrape into a bowl, cover with plastic wrap and refrigerate for at least 1 hour to allow the flavors to meld.', 'ingredients': [{'id': 10018364, 'name': 'wrap', 'localizedName': 'wrap', 'image': 'flour-tortilla.jpg'}], 'equipment': [{'id': 404730, 'name': 'plastic wrap', 'localizedName': 'plastic wrap', 'image': 'plastic-wrap.jpg'}, {'id': 404783, 'name': 'bowl', 'localizedName': 'bowl', 'image': 'bowl.jpg'}], 'length': {'number': 60, 'unit': 'minutes'}}, {'number': 4, 'step': 'Remove from the refrigerator about 30 minutes before using to soften.', 'ingredients': [], 'equipment': [], 'length': {'number': 30, 'unit': 'minutes'}}]}]
            var result = data
            result = result[result.length - 1]
            console.log(result)
            var ingredients = []
            var ing_name_check = []
            var steps = []

            var rSteps = result.steps
            
            for (let x = 0; x < rSteps.length; x++){
            
                for (let y = 0; y < rSteps[x].ingredients.length; y++) {

                    if (ing_name_check.indexOf(rSteps[x].ingredients[y].id) == -1) {
                        ing_name_check.push(rSteps[x].ingredients[y].id)

                        ingredients.push(`<a href="https://spoonacular.com/cdn/ingredients_250x250/${rSteps[x].ingredients[y].image}" class="list-items">${rSteps[x].ingredients[y].localizedName}</a>`)
                    }
                }

                steps.push(`
                <tr>
                    <td>
                        <h3>Step ${rSteps[x].number}:</h3>
                    </td>
                    <td>${rSteps[x].step}</td>
                </tr>`)
            }
        

            methods.innerHTML = `
            <div class="modal showform method-form" id="method-form">
                <div class="modal-content">
                    <div class="closebutton">
                        <i class="material-icons" id="" style="color:#e32;" onclick="deactivate()">close</i>
                    </div>
            
                    <div class="field">
                        
                        <div class="image">
                            <img src="${itemImg}" alt="">
                        </div>
                        <h3 class="title">${name}</h3>
                        <div class="steps">
                            
                            <div class="ingredients-list">
                                <h3 style="text-decoration:underline;text-align:center;">Ingredients:</h3>
                                <div class="spread-items">
                                    ${ingredients.join('')}
                                    
                                </div>
                            </div>
            
                            <div class="step-list">
                                <h3 style="text-decoration:underline;text-align:center;">Steps:</h3>
                                <table border='1'>
                                    ${steps.join('')}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `

        })


}

