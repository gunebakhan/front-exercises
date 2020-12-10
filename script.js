function getCurrencies() {
    let promise = new Promise((resolve, reject)=> {
        $.ajax({
            type: "get",
            url: "https://currency.jafari.li/json",
            success: function (response) {
                resolve(response);
            },
            fail: function (xhr, textStatus, errorThrown) { 
                reject('has error');
             }
        });
    });
    return promise;
}


function main() {
    getCurrencies()
        .then((response)=>{
            response = JSON.parse(response);
            currencies = response['Currency'];
            var str = '';
            currencies.forEach(element => {
                str += '<ul class="list-group my-3">';
                str += '<li class="list-group-item list-group-item-warning ">Name: '+ element['Currency'] + '</li>';
                str += '<li class="list-group-item list-group-item-danger">Sell: '+ element['Sell'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</li>';
                str += '<li class="list-group-item list-group-item-success">Buy: '+ element['Buy'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</li>';
                str += '</ul>'
            });
            document.getElementById("container").innerHTML = str;
            // console.log(currencies);
        })
        .catch((err)=> {
            console.log(err);
        });
    
    $(document).ready(function () {
        setTimeout(function(){
            location.reload(true);
            alert("The page will now refresh");
        }, 50000);       
    });
}

main();