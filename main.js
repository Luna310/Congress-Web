var members = data.results[0].members;


function setState() {
    state1 = ["all"];
    for (i = 0; i < members.length; i++) {
        if (state1.indexOf(members[i].state) === -1) {
            state1.push(members[i].state);
        }

    }
}




function createDropdow() {

    setState();
    var newSelect = document.createElement("select");
    newSelect.setAttribute("id", "selectState");
    newSelect.setAttribute("name", "selectName")
    newSelect.onchange = function () {
        filterCongress();
    };
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

    console.log(newTabla);
}
addMultTable(arrayThead.length, members);

function filterCongress() {

    var dropTable = document.getElementById("divTable");
    dropTable.innerHTML = "";

    var stateFinal = [];

    var accesState = document.getElementById("selectState").value;
    console.log(accesState)
    if (accesState == "all") {
        console.log(stateFinal)
        stateFinal = members;

    } else {
        for (j = 0; j < members.length; j++) {
            if (accesState == members[j].state) {
                stateFinal.push(members[j]);
            }
        }
    }

    var checkBox = document.querySelectorAll('input[name=party]:checked');
    var membersFilter = [];
    for (i = 0; i < checkBox.length; i++) {
        for (j = 0; j < members.length; j++) {
            if (checkBox[i].value == members[j].party) {
                membersFilter.push(members[j]);
            }
        }
    }
    var multiFilter = [];
    console.log(stateFinal, "statefinal");
    for (i = 0; i < membersFilter.length; i++) {
        for (j = 0; j < stateFinal.length; j++){
            console.log( stateFinal[j])
            if (membersFilter[i] == stateFinal[j]) {
                multiFilter.push(membersFilter[i])

            }
    }
    }
    console.log(multiFilter, "multifilter");

        addMultTable(arrayThead.length, multiFilter);


}

addMultTable(arrayThead.length, members);
createDropdow();
