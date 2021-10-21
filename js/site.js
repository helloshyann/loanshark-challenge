// Button Event
document.getElementById('calc').addEventListener('click', function () {

    let verifyBal = Number(document.getElementById('balance').value);
    let verifyTerm = Number(document.getElementById('term').value);
    let verifyRate = Number(document.getElementById('rate').value);


    if (verifyBal == "" || verifyTerm == "" || verifyRate == "" ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill out all selections before using the calculator.',
        })
    }
    else {
        calculate();
    }
});

function calculate() {

    // Step 1: Getting the data
    let bal = Number(document.getElementById("balance").value); 
    let term = Number(document.getElementById("term").value); 
    let rate = Number(document.getElementById("rate").value);  


    // Step 2: Run Collected Data
    let totMonPay = (bal) * (rate / 1200) / (1 - Math.pow((1 + rate / 1200), -term)); 
    let remBal = bal;                                                 
    let intPay = remBal * rate / 1200;                               
    let prinPay = totMonPay - intPay;                                
    let totIntPay = 0;                                              
    let accuPay = 0;

    // Step 3: Result / Outputting to table
    let template = `<tr>
        <th>Month</th>
        <th>Payment</th>
        <th>Principal</th>
        <th>Interest</th>
        <th>Total Interest</th>
        <th>Balance</th>        
    </tr>`;


    // Loop will dynamically fill the table based on how many months the interest is
    // i = starting month

    for (let i = 1; i <= term; i++) {

        totIntPay += intPay;                        
        prinPay = totMonPay - intPay;                
        remBal = remBal - prinPay;                  
        intPay = remBal * rate / 1200;              
        accuPay += totMonPay;




        //How result will be formatted as loop continues 
        template += `<tr>
        <td>${i}</td>
        <td>${totMonPay.toFixed(2)}</td>
        <td>${prinPay.toFixed(2)}</td>
        <td>${intPay.toFixed(2)}</td>
        <td>${totIntPay.toFixed(2)}</td>
        <td>${remBal.toFixed(2)}</td>
    </tr>`
    };

    //Puts into HTML
    document.getElementById("result").innerHTML = template;
    document.getElementById("termMon").innerHTML = `${term} months`
    document.getElementById("totBal").innerHTML = `$${bal}`
    document.getElementById("monPay").innerHTML = `$${totMonPay.toFixed(2)}`;
    document.getElementById("intRate").innerHTML = `${rate}%`


};

// function prevents input of all letters into input field
function isNumber(evt) {                                     
    evt = (evt) ? evt : window.event;                        
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 46) || (charCode > 46 && (charCode < 48) || charCode > 57)) {
        return false;
    }
    return true;
};

