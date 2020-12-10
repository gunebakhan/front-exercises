// $("#shorten").click(function (e) { 
//     e.preventDefault();
//     var value = $('#textInput').val()
//     $.ajax({
//         type: "POST",
//         url: "https://cleanuri.com/api/v1/shorten",
//         data: {'url': value},
//         success: function (response) {
//             $("#output").append(response['result_url']);
//         }
//     });
// });

function getUrlInput() {
    return $('#textInput').val();
}


function main() {
    var input_url = '';
    $('p').hide();
    $("#shorten").click(function (e) { 
        e.preventDefault();
        $('#spinner').show();
        input_url = getUrlInput();
        getUrl(input_url).then((response)=>{
            $('p').show();
            $("#output").text(response['result_url']);
        }).catch((err)=>{
            console.log(err);
        });
     });
}


function getUrl(url) {
    let promise = new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: "https://cleanuri.com/api/v1/shorten",
            data: {url: url},
            beforeSend: function () { 
                $('#spinner').show()
             },
            success: function (response) {
                resolve(response);
            },
            fail: function (xhr, textStatus, errorThrown) { 
                reject('has error')
             },
             complete: function () { 
                $('#spinner').show();
              }
        });
    });
    return promise;
}

function myFunction() {
    var copyText = document.getElementById("#output");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
  }


$('#copy').click(function (e) { 
    e.preventDefault();
    // $('#output').val();
    // $('#output').select();
    var copyText = document.getElementById('output');
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
});
jQuery.ajaxSetup({
    beforeSend: function() {
       $('#spinner').show();
    },
    complete: function(){
       $('#spinner').hide();
    },
    success: function() {}
  });
main();

