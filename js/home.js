
const div = document.querySelector('.navContent');
const widthContent = div.offsetWidth;

$(document).ready(async function () {
    $("#sideNav").css("left", `-${widthContent}px`)

    $('#loadingScreen').fadeOut(1000, function () {
        $('#loadingScreen').removeClass('d-flex');
        $('body').css('overflow', "visible")

    })


    if (window.innerWidth <= 800) {
        const adjustContentMargin = () => {
            let sidebarWidth = $('.navHead').outerWidth();
            $('.cont').css('marginLeft', `${sidebarWidth}px`);
        };

        adjustContentMargin();
        $(window).resize(adjustContentMargin);
    }

    $(".cont").html(`
                <div class="">
                     <div class="row mealsrow mt-3 g-4 mb-5">
                     </div>
                 </div>
             </div>
         `);




    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data = await response.json();

    let temp = '';

    data.meals.forEach(meal => {
        temp += `
            <div class="col-md-3">
                <div class="position-relative eachmeal rounded-2 overflow-hidden" data-mealid="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="" class="w-100">
                    <div class="nameDiv">${meal.strMeal}</div>
                </div>
            </div>`;
    });

    $(".mealsrow").html(temp);

    $('.eachmeal').on("click", function () {
        let mealId = $(this).attr('data-mealid');
        details(mealId);
    });
});



$('.menuIcon').on("click", function () {



    if ($(this).hasClass('fa-bars')) {
        $('#sideNav').css({ "left": `0px` })
        $(this).removeClass('fa-bars').addClass('fa-xmark');
        $(".ulsidenav li").animate({ "top": "0" }, 700)
    }
    else if ($(this).hasClass('fa-xmark')) {
        $('#sideNav').css({ "left": `-${widthContent}px` })
        $(this).removeClass('fa-xmark ').addClass('fa-bars');
        $(".ulsidenav li").animate({ "top": "250px" }, 900)
    }

})

function closeSideNav() {
    $('.menuIcon').removeClass('fa-xmark ').addClass('fa-bars');
    $('#sideNav').css({ "left": `-${widthContent}px` })

}





function Search() {
    $('#loadingScreen').addClass('d-flex').show();
    $('body').css('overflow', 'hidden');


    $(document).ready(async function () {
        $('#loadingScreen').fadeOut(1000, function () {
            $('#loadingScreen').removeClass('d-flex');
            $('body').css('overflow', "visible")
        })

        if (window.innerWidth <= 800) {
            const adjustContentMargin = () => {
                let sidebarWidth = $('.navHead').outerWidth();
                $('.cont').css('marginLeft', `${sidebarWidth}px`);
            };

            adjustContentMargin();
            $(window).resize(adjustContentMargin);
        }


        $(".cont").html(`
        <div class="search mt-4 container">
            <div class="d-flex justify-content-center">
                <div class="input1 me-4">
                    <input type="text" class="form-control text-black" id="SearchByName" placeholder="Search By Name">
                </div>
                <div class="input2 me-3">
                    <input type="text" class="form-control" id="SearchByFirstLetter" placeholder="Search By First Letter">
                </div>
            </div>
            <div class="mt-5 mb-5">
                <div class="row mealsrow mt-5 g-4">
                </div>
            </div>
        </div>
    `);

        $('#SearchByName').on('keyup', async function () {
            let inputValue = this.value;
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
            let data = await response.json();

            let temp = '';
            if (data.meals) {
                data.meals.slice(0, 20).forEach(meal => {
                    temp += `
                    <div class="col-md-3">
                        <div class="position-relative eachmeal rounded-2 overflow-hidden" data-mealid="${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="" class="w-100">
                            <div class="nameDiv">${meal.strMeal}</div>
                        </div>
                    </div>`;
                });
            } else {
                $(".mealsrow").html("");
            }

            $(".mealsrow").html(temp);

            $('.eachmeal').on("click", function () {
                let mealId = $(this).attr('data-mealid');
                details(mealId);
            });

        });

        $('#SearchByFirstLetter').on('input', async function () {
            let inputValue = this.value;
            if (inputValue.length > 1) {
                this.value = inputValue.slice(0, 1);
            }

            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
            let data = await response.json();

            let temp = '';
            if (data.meals) {
                data.meals.slice(0, 20).forEach(meal => {
                    temp += `
                    <div class="col-md-3">
                        <div class="position-relative eachmeal rounded-2 overflow-hidden" data-mealid="${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="" class="w-100">
                            <div class="nameDiv">${meal.strMeal}</div>
                        </div>
                    </div>`;
                });
            } else {
                $(".mealsrow").html("");
            }

            $(".mealsrow").html(temp);

            $('.eachmeal').on("click", function () {
                let mealId = $(this).attr('data-mealid');
                details(mealId);
            });

        });

    })
}



async function Categories() {

    $('#loadingScreen').addClass('d-flex').show();
    $('body').css('overflow', 'hidden');


    $(document).ready(async function () {
        $('#loadingScreen').fadeOut(1000, function () {
            $('#loadingScreen').removeClass('d-flex');
            $('body').css('overflow', "visible")
        })

        if (window.innerWidth <= 800) {
            const adjustContentMargin = () => {
                let sidebarWidth = $('.navHead').outerWidth();
                $('.cont').css('marginLeft', `${sidebarWidth}px`);
            };

            adjustContentMargin();
            $(window).resize(adjustContentMargin);
        }


        $(".cont").html(`
    
        <div >
            <div class="row mealsrow mt-3 g-4 mb-5">
            </div>
        </div>
    </div>
`);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let data = await response.json();


        let temp = '';

        data.categories.forEach(meal => {

            let maxWords = 20;
            let words = meal.strCategoryDescription.split(' ');

            if (words.length > maxWords) {
                words = words.slice(0, maxWords);
            }

            let Description = words.join(' ');


            temp += `
            <div class="col-md-3">
                <div class="position-relative eachCateg rounded-2 overflow-hidden">
                    <img src="${meal.strCategoryThumb}" alt="" class="w-100">
                    <div class="categDiv" >
                      <h2>   ${meal.strCategory} </h2>
                      <p>${Description}</p>
                    </div>
                </div>
            </div>`;
        })
        $(".mealsrow").html(temp);


        $(".categDiv").on("click", async function () {
            let categ = $(this).find("h2").text().trim();

            $('#loadingScreen').addClass('d-flex').show();
            $('body').css('overflow', 'hidden');


            $(document).ready(async function () {
                $('#loadingScreen').fadeOut(1000, function () {
                    $('#loadingScreen').removeClass('d-flex');
                    $('body').css('overflow', "visible")
                })

                $(".cont").html(`
    
            <div >
                <div class="row mealsrow mt-3 g-4 mb-5">
                </div>
            </div>
        </div>
    `);

                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categ}`);
                let data = await response.json();

                let temp = '';
                data.meals.slice(0, 20).forEach(meal => {

                    temp += `
            <div class="col-md-3">
                <div class="position-relative eachmeal rounded-2 overflow-hidden" data-mealid="${meal.idMeal}">
                    <img src="${meal.strMealThumb}" alt="" class="w-100">
                    <div class="nameDiv">${meal.strMeal}</div>
                </div>
            </div>`;
                })
                $(".mealsrow").html(temp);
                $('.eachmeal').on("click", function () {
                    let mealId = $(this).attr('data-mealid');
                    details(mealId);
                });
            })
        })
    })
}


async function Area() {

    $('#loadingScreen').addClass('d-flex').show();
    $('body').css('overflow', 'hidden');


    $(document).ready(async function () {
        $('#loadingScreen').fadeOut(1000, function () {
            $('#loadingScreen').removeClass('d-flex');
            $('body').css('overflow', "visible")
        })

        if (window.innerWidth <= 800) {
            const adjustContentMargin = () => {
                let sidebarWidth = $('.navHead').outerWidth();
                $('.cont').css('marginLeft', `${sidebarWidth}px`);
            };

            adjustContentMargin();
            $(window).resize(adjustContentMargin);
        }


        $(".cont").html(` <div >
            <div class="row mealsrow mt-3 g-4 mb-5 ">
            </div>
        </div>
    </div>`)

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let data = await response.json();

        let temp = '';
        data.meals.forEach(meal => {

            temp += `
    <div class="col-md-3 d-flex justify-content-center align-items-center flex-column areas">
         
                       <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                        <h3 class="text-white">${meal.strArea}</h3>
                    
    </div>`;
        })
        $(".mealsrow").html(temp);

        $(".areas").on("click", async function () {
            $('#loadingScreen').addClass('d-flex').show();
            $('body').css('overflow', 'hidden');

            let area = $(this).find("h3").text().trim();

            $(document).ready(async function () {
                $('#loadingScreen').fadeOut(1000, function () {
                    $('#loadingScreen').removeClass('d-flex');
                    $('body').css('overflow', "visible")
                })

                $(".cont").html(`
    
            <div >
                <div class="row mealsrow mt-3 g-4 mb-5">
                </div>
            </div>
        </div>
    `);

                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
                let data = await response.json();

                let temp = '';
                data.meals.slice(0, 20).forEach(meal => {

                    temp += `
        <div class="col-md-3">
             <div class="position-relative eachmeal rounded-2 overflow-hidden" data-mealid="${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="" class="w-100">
                            <div class="nameDiv">${meal.strMeal}</div>
                        </div>
            </div>
        </div>`;
                })
                $(".mealsrow").html(temp);
                $('.eachmeal').on("click", function () {
                    let mealId = $(this).attr('data-mealid');
                    details(mealId);
                });
            })


        })

    })
}


async function Ingredients() {

    $('#loadingScreen').addClass('d-flex').show();
    $('body').css('overflow', 'hidden');


    $(document).ready(async function () {
        $('#loadingScreen').fadeOut(1000, function () {
            $('#loadingScreen').removeClass('d-flex');
            $('body').css('overflow', "visible")
        })


        if (window.innerWidth <= 800) {
            const adjustContentMargin = () => {
                let sidebarWidth = $('.navHead').outerWidth();
                $('.cont').css('marginLeft', `${sidebarWidth}px`);
            };

            adjustContentMargin();
            $(window).resize(adjustContentMargin);
        }


        $(".cont").html(`
        <div>
            <div class="row mealsrow mt-3 g-4 mb-5">
            </div>
        </div>
    `);


        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let data = await response.json();

        let temp = '';


        data.meals.slice(0, 20).forEach(ingredient => {
            let maxWords = 20;

            if (ingredient.strDescription) {
                let words = ingredient.strDescription.split(' ');

                if (words.length > maxWords) {
                    words = words.slice(0, maxWords);
                }

                let Description = words.join(' ');;
                console.log(Description)

                temp += `
                    <div class="col-md-3">
                        <div class="position-relative text-white d-flex flex-column justify-content-center align-items-center ingredient">
                            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                            <h3 class="text-center">${ingredient.strIngredient}</h3>
                            <p>${Description}</p>
                        </div>
                    </div>`;
            }
        });

        $(".mealsrow").html(temp);

        $(".ingredient").on("click", async function () {
            let ingred = $(this).find("h3").text().trim();

            $('#loadingScreen').addClass('d-flex').show();
            $('body').css('overflow', 'hidden');


            $(document).ready(async function () {
                $('#loadingScreen').fadeOut(1000, function () {
                    $('#loadingScreen').removeClass('d-flex');
                    $('body').css('overflow', "visible")
                })
                $(".cont").html(`
    
            <div >
                <div class="row mealsrow mt-3 g-4 mb-5">
                </div>
            </div>
        </div>
    `);

                let response = await fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${ingred}`);
                let data = await response.json();

                let temp = '';
                data.meals.slice(0, 20).forEach(meal => {

                    temp += `
        <div class="col-md-3">
             <div class="position-relative eachmeal rounded-2 overflow-hidden" data-mealid="${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="" class="w-100">
                            <div class="nameDiv">${meal.strMeal}</div>
                        </div>
            </div>
        </div>`;
                })
                $(".mealsrow").html(temp);
                $('.eachmeal').on("click", function () {
                    let mealId = $(this).attr('data-mealid');
                    details(mealId);
                });
            })
        })
    })
}

function contactUs() {

    $('#loadingScreen').addClass('d-flex').show();
    $('body').css('overflow', 'hidden');


    $(document).ready(async function () {
        $('#loadingScreen').fadeOut(1000, function () {
            $('#loadingScreen').removeClass('d-flex');
            $('body').css('overflow', "visible")
        })

        if (window.innerWidth > 600) {
            $(".cont").html(`
        <div class="d-flex justify-content-center align-items-center contact container mb-5 flex-column">
            <div class="row g-4 d-flex justify-content-center">
                <div class="inputs col-md-5">
                    <input type="text" class="form-control text-black" id="Name" placeholder="Enter Your Name">
                    <div id="alertName" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                        <p class="mt-3">Special characters and numbers not allowed</p>
                    </div>
                </div>
                <div class="inputs col-md-5">
                    <input type="email" class="form-control text-black" id="Email" placeholder="Enter Your Email">
                    <div id="alertEmail" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                        <p class="mt-3">Email not valid *example@yyy.zzz</p>
                    </div>
                </div>
                <div class="inputs col-md-5">
                    <input type="tel" class="form-control text-black" id="Phone" placeholder="Enter Your Phone">
                    <div id="alertphoneNum" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                        <p class="mt-3">Enter valid Phone Number</p>
                    </div>
                </div>
                <div class="inputs col-md-5">
                    <input type="number" class="form-control text-black" id="Age" placeholder="Enter Your Age">
                    <div id="alertAge" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                        <p class="mt-3">Enter valid age</p>
                    </div>
                </div>
                <div class="inputs col-md-5">
                    <input type="password" class="form-control text-black" id="Password" placeholder="Enter Your Password">
                    <div id="alertPassword" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                        <p class="mt-3">Enter valid password *Minimum eight characters, at least one letter and one number*</p>
                    </div>
                </div>
                <div class="inputs col-md-5">
                    <input type="password" class="form-control text-black" id="Repassword" placeholder="Re-enter Your Password">
                    <div id="alertRepassword" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                        <p class="mt-3">Passwords do not match</p>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-outline-danger mt-4" id="submitBtn" disabled>Submit</button>
        </div>
    `);
        }
        else {


            $(".cont").html(`
                <div class="d-flex justify-content-center align-items-center contact container mb-5 flex-column">
                    <div class="row g-4 d-flex justify-content-center flex-column">
                        <div class="inputs  w-100">
                            <input type="text" class="form-control text-black" id="Name" placeholder="Enter Your Name">
                            <div id="alertName" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                                <p class="mt-3">Special characters and numbers not allowed</p>
                            </div>
                        </div>
                        <div class="inputs w-100">
                            <input type="email" class="form-control text-black" id="Email" placeholder="Enter Your Email">
                            <div id="alertEmail" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                                <p class="mt-3">Email not valid *example@yyy.zzz</p>
                            </div>
                        </div>
                        <div class="inputs w-100">
                            <input type="tel" class="form-control text-black" id="Phone" placeholder="Enter Your Phone">
                            <div id="alertphoneNum" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                                <p class="mt-3">Enter valid Phone Number</p>
                            </div>
                        </div>
                        <div class="inputs w-100">
                            <input type="number" class="form-control text-black" id="Age" placeholder="Enter Your Age">
                            <div id="alertAge" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                                <p class="mt-3">Enter valid age</p>
                            </div>
                        </div>
                        <div class="inputs w-100">
                            <input type="password" class="form-control text-black" id="Password" placeholder="Enter Your Password">
                            <div id="alertPassword" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center ">
                                <p class="w-100 ">Enter valid password *Minimum eight characters, at least one letter and one number*</p>
                            </div>
                        </div>
                        <div class="inputs w-100">
                            <input type="password" class="form-control text-black" id="Repassword" placeholder="Re-enter Your Password">
                            <div id="alertRepassword" class="alert alerts alert-danger d-none mt-2 d-flex justify-content-center align-items-center">
                                <p class="mt-3">Passwords do not match</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-outline-danger mt-4" id="submitBtn" disabled>Submit</button>
                </div>
            `);

        }

        $("#Name").on("keyup", function () {
            var regexName = /^[A-Za-z]+$/;
            if (!regexName.test($(this).val())) {
                $("#alertName").removeClass('d-none');
            } else {
                $("#alertName").addClass('d-none');
            }
            checkValidity();
        });

        $("#Email").on("keyup", function () {
            var regexEmail = /^[a-zA-Z0-9._%+#$-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regexEmail.test($(this).val())) {
                $("#alertEmail").removeClass('d-none');
            } else {
                $("#alertEmail").addClass('d-none');
            }
            checkValidity();
        });

        $("#Phone").on("keyup", function () {
            var regexPhone = /^[0-9]{10,12}$/;
            if (!regexPhone.test($(this).val())) {
                $("#alertphoneNum").removeClass('d-none');
            } else {
                $("#alertphoneNum").addClass('d-none');
            }
            checkValidity();
        });

        $("#Age").on("keyup", function () {
            var regexAge = /^[0-9]{1,2}$/;
            if (!regexAge.test($(this).val())) {
                $("#alertAge").removeClass('d-none');
            } else {
                $("#alertAge").addClass('d-none');
            }
            checkValidity();
        });

        $("#Password").on("keyup", function () {
            var regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!regexPassword.test($(this).val())) {
                $("#alertPassword").removeClass('d-none');
            } else {
                $("#alertPassword").addClass('d-none');
            }
            checkValidity();
        });

        $("#Repassword").on("keyup", function () {
            var password = $("#Password").val();
            var repassword = $(this).val();
            if (password !== repassword) {
                $("#alertRepassword").removeClass('d-none');
            } else {
                $("#alertRepassword").addClass('d-none');
            }
            checkValidity();
        });

        function checkValidity() {
            var isValid = true;
            $(".alert").each(function () {
                if (!$(this).hasClass('d-none')) {
                    isValid = false;
                    return false;
                }
            });

            if (isValid) {
                $("#submitBtn").prop("disabled", false);
            } else {
                $("#submitBtn").prop("disabled", true);
            }
        }
    })
}

async function details(id) {

    $('#loadingScreen').addClass('d-flex').show();
    $('body').css('overflow', 'hidden');


    $(document).ready(async function () {

        $('#loadingScreen').fadeOut(1000, function () {
            $('#loadingScreen').removeClass('d-flex');
            $('body').css('overflow', "visible")
        })
        closeSideNav()

        if (window.innerWidth <= 800) {
            const adjustContentMargin = () => {
                let sidebarWidth = $('.navHead').outerWidth();
                $('.cont').css('marginLeft', `${sidebarWidth}px`);
            };

            adjustContentMargin();
            $(window).resize(adjustContentMargin);
        }


        $(".cont").html(`
        <div class=" inner ">
            <div class="row mt-5 mb-5 mealsrow">
            </div>
        </div>
    `);

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await response.json();

        let RecipesArray = [];

        for (let i = 1; i <= 20; i++) {
            let ingredientKey = `strIngredient${i}`;
            let measureKey = `strMeasure${i}`;

            if (data.meals[0][ingredientKey] && data.meals[0][ingredientKey].trim() !== "") {
                let ingredient = data.meals[0][ingredientKey];
                let measure = data.meals[0][measureKey] ? data.meals[0][measureKey] : "";
                let item = `${measure} ${ingredient}`;
                RecipesArray.push(item);
            }
        }

        let tags = data.meals[0].strTags ? data.meals[0].strTags.split(",") : [];

        let temp = '';

        data.meals.forEach(meal => {
            temp += `
         
                <div class="col-md-4 detailimage ">
                     <div class="detailimg">
                    <img src="${meal.strMealThumb}" alt="mealDetail" class="rounded-3">
                    </div>
                    <h2 class="text-white">${meal.strMeal}</h2>
                </div>
                <div class="col-lg-8 text-white position-relative">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bold">Area</span> : ${meal.strArea}</h3>
                    <h3><span class="fw-bold">Category</span> : ${meal.strCategory}</h3>
                    <h3> Recipes :</h3>
                    <ul class="listingred list-unstyled d-flex flex-wrap">
                        ${RecipesArray.map(item => `<li class="alert alert-info m-2 p-1">${item}</li>`).join("")}
                    </ul>
                    <div>
                        <h3>Tags :</h3>
                       <ul class="list-unstyled d-flex flex-wrap">
                            ${tags.map(item => `<li class="tagP">${item}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="d-flex mt-4">
                        <a href="${meal.strSource}" target="_blank" class="btn btn-success me-1">Source</a>
                        <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
                    </div>
                </div >
        `;
        });

        $(".mealsrow").html(temp);
    })
}




