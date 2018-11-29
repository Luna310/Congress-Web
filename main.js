var data;
var fetch;
var senateFetch = "https://api.propublica.org/congress/v1/113/senate/members.json";
var houseFetch = "https://api.propublica.org/congress/v1/113/house/members.json";

function selectPage() {
    if (document.getElementById("house")) {
        fetch = houseFetch;
    } else {
        fetch = senateFetch;
    }
    return fetch;
}


fetch(selectPage(), {
    method: "GET",
    headers: {
        'X-API-Key': 'huqblbvuIkdDWR6BHiMGYTSZpftKpjMTh0ub5JNg'
    }
}).then(function (response) {
    if (response.ok) {
        //			console.log(2);

        return response.json();
    }

}).then(function (json) {
    data = json;
    //	console.timeEnd('ajaxTime');
    members = data.results[0].members;

    addMultTable(arrayThead.length, members);

    createDropdow(members);

    //    filterCongress(members);
    //    console.log(members);

}).catch(function (error) {
    console.log("Request failed:" + error.message);
});


var members = [];

//function setState(array) {
//    state1 = ["all"];
//    for (i = 0; i < array.length; i++) {
//        if (state1.indexOf(array[i].state) === -1) {
//            state1.push(array[i].state);
//        }
//
//    }
//}




function createDropdow(array) {

    state1 = ["all"];
    for (i = 0; i < array.length; i++) {
        if (state1.indexOf(array[i].state) === -1) {
            state1.push(array[i].state);
        }
    }
    console.log("state1");
    console.log(state1);
    var newSelect = document.createElement("select");
    newSelect.setAttribute("id", "selectState");
    newSelect.setAttribute("name", "selectName")
    newSelect.onchange = function () {
        filterCongress(array);
    }
    document.getElementById("divDropdown").appendChild(newSelect);

    for (i = 0; i < state1.length; i++) {
        var optionState = document.createElement("option");
        newSelect.appendChild(optionState);
        optionState.textContent = state1[i];
        optionState.setAttribute("value", state1[i]);
        optionState.setAttribute("name", "estado")
    }
}
var arrayThead = ["Full Name", "Party", "State", "Seniority", "Percentage of votes with party"];



/*//////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function addMultTable(rows, array) {
    var newTabla = document.createElement("table");
    newTabla.classList.add("table", "table-striped");
    newTabla.setAttribute("id", "tabla1");
    document.getElementById("divTable").appendChild(newTabla);
    var tblHead = document.createElement("thead");
    newTabla.appendChild(tblHead);
    var tittleHead = document.createElement("tr");
    tblHead.appendChild(tittleHead);

    var tblBody = document.createElement("tbody");
    tblBody.setAttribute("id", "tbody1");
    newTabla.appendChild(tblBody);

    function getName(i) {
        var firstName = array[i].first_name;
        var middleName = array[i].middle_name;
        var lastName = array[i].last_name;

        if (middleName == null) {
            middleName = " ";
        }
        var fullName = firstName + " " + middleName + " " + lastName;

        return fullName;
    }


    for (var i = 0; i < rows; i++) {
        var newTh = document.createElement("th");
        tittleHead.appendChild(newTh);
        newTh.innerHTML = arrayThead[i];
    }


    for (var i = 0; i < array.length; i++) {
        var newTr = document.createElement("tr");
        tblBody.appendChild(newTr);


        var fullName = document.createElement("td");
        newTr.appendChild(fullName);
        var tagA = document.createElement("a");
        fullName.appendChild(tagA);
        tagA.setAttribute("href", array[i].url);
        tagA.textContent = getName(i);

        var party = document.createElement("td");
        newTr.appendChild(party);
        party.textContent = array[i].party;

        var state = document.createElement("td");
        newTr.appendChild(state);
        state.textContent = array[i].state;

        var seniority = document.createElement("td");
        newTr.appendChild(seniority);
        seniority.textContent = array[i].seniority;

        var votes = document.createElement("td");
        newTr.appendChild(votes);
        votes.textContent = array[i].votes_with_party_pct + " %";

    }

    //    console.log(newTabla);
}


function filterCongress(array) {
    console.log(array);
    var dropTable = document.getElementById("divTable");
    dropTable.innerHTML = "";
    //    console.log(dropTable);
    var stateFinal = [];

    var accesState = document.getElementById("selectState").value;
    //    console.log(accesState)
    if (accesState == "all") {
        //        console.log(stateFinal)
        stateFinal = array;
        console.log(stateFinal)
        console.log("statefinal1");
    } else {
        for (j = 0; j < array.length; j++) {
            if (accesState == array[j].state) {
                stateFinal.push(array[j]);
            }
        }
    }
    console.log("statefinal2");
    console.log(stateFinal);

    var checkBox = document.querySelectorAll('input[name=party]:checked');
    var membersFilter = [];
    for (i = 0; i < checkBox.length; i++) {
        for (j = 0; j < stateFinal.length; j++) {
            if (checkBox[i].value == stateFinal[j].party) {
                membersFilter.push(stateFinal[j]);
            }
        }
    }

    var multiFilter = [];
    for (i = 0; i < membersFilter.length; i++) {
        for (j = 0; j < stateFinal.length; j++) {

            if (membersFilter[i] == stateFinal[j]) {
                multiFilter.push(membersFilter[i])

            }
        }
    }
    console.log(stateFinal)
    console.log("miltifilter");
    console.log(multiFilter);

    addMultTable(arrayThead.length, multiFilter);


}

//    addMultTable(arrayThead.length, members);
//    createDropdow();
