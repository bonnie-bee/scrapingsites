$.getJSON("/showMeTheScrapes", function(data){
    for(let i=0; i<data.length; i++){
        $("#secretDiv").append(`<img src="${data[i].pictureSrc}" alt="Secret #${i} data-id="${data[i]._id}>"`)
    }
})

$(document).on("click", "img", function(){
    $("#secretNotes").empty();
    const picId=$(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: `/showMeTheScrapes/${picId}`
    }).then(function(data){
        console.log(data);
    })
})


$("#secretFinder").on("click", function(){
    $.ajax({
        method: "GET",
        url: "/api/scraping"
    }).then(function(data){
        // location.reload();
        console.log(data);
    })
})