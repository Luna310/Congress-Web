var members = data.results[0].members;
console.log(members);

var arrayThead = ["Full Name", "Party", "State", "Seniority", "Percentage of votes with party"];
var num = 1;


function addMultTable(rows, cols) {
    var newTabla = document.createElement("table");
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
        var firstName = members[i].first_name;
        var middleName = members[i].middle_name;
        var lastName = members[i].last_name;

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


    for (var i = 0; i < members.length; i++) {
        var newTr = document.createElement("tr");
        tblBody.appendChild(newTr);
        

        var fullName = document.createElement("td");
        newTr.appendChild(fullName);
        var tagA = document.createElement("a");
        fullName.appendChild(tagA);
        tagA.setAttribute("href", members[i].url);
        tagA.textContent = getName(i);

        var party = document.createElement("td");
        newTr.appendChild(party);
        party.textContent = members[i].party;

        var state = document.createElement("td");
        newTr.appendChild(state);
        state.textContent = members[i].state;

        var seniority = document.createElement("td");
        newTr.appendChild(seniority);
        seniority.textContent = members[i].seniority;

        var votes = document.createElement("td");
        newTr.appendChild(votes);
        votes.textContent = members[i].votes_with_party_pct + " %";

    }

    console.log(newTabla);
}
addMultTable(arrayThead.length, members.length);
