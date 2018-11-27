var statistics = {
    "num_republican": 0,

    "num_democrats": 0,

    "num_independend": 0,

    "total_representantes": 0,

    "votes_pct_republicans": 0,

    "votes_pct_democrats": 0,

    "votes_pct_independence": 0,

    "Most_Loyal_Top_of_Party": [],

    "Least_Loyal_Bottom_of_Party": [],

    "Least_Engaged_Bottom_Attendance)": [],

    "Most_Engaged_Top_Attendance": []
}

var members = data.results[0].members;


/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


function getVotes() {
    //declaración de variables 
    var votesR = members[0].total_votes;
    var votesD = members[0].total_votes;
    var votesI = members[0].total_votes;
    var numR = 0;
    var numD = 0;
    var numI = 0;
    /*sentencia for que va sumando los votos de cada representante de cada partido y ue tambien
    uso para averiguar el numero de representantes de cada partido*/
    for (i = 0; i < members.length; i++) {
        if (members[i].party == "R") {
            //esto hace que la variable vaya aumentando su valor segun recorre los miembros.
            votesR = members[i].total_votes + votesR;
            numR++;
        }


    }
    for (i = 0; i < members.length; i++) {
        if (members[i].party == "D") {
            votesD = members[i].total_votes + votesD;
            numD++;
        }
    }
    for (i = 0; i < members.length; i++) {
        if (members[i].party == "I") {
            votesI = members[i].total_votes + votesI;
            numI++;
        }
    } //hasta aqui llegan los for que hayan votos y representantes.

    /*declaracion de variables que calculan el total de votos y el porcentaje de votos por partidos*/
    var totalVotes = votesD + votesI + votesR;
    var porcentR = (votesR / totalVotes) * 100;
    var porcentD = (votesD / totalVotes) * 100;
    var porcentI = (votesI / totalVotes) * 100;
    console.log(totalVotes);

    //paso elvalor a los elementos del objeto principal.
    statistics.num_republican = numR;
    statistics.num_democrats = numD;
    statistics.num_independend = numI;
    //utilizando element.toFixed para limitar a dos los decimales.
    statistics.votes_pct_republicans = porcentR.toFixed(2) + " %";
    statistics.votes_pct_democrats = porcentD.toFixed(2) + " %";
    statistics.votes_pct_independence = porcentI.toFixed(2) + " %";

    statistics.total_representantes = numR + numD + numI;


    statistics.total_representantes = numR + numD + numI;

    //salida por consola del valor de  los elementos para comprobar su estadoo
    console.log("numero de republicanos: " + numR)
    console.log("votos republicanos: " + votesR);
    console.log("porcentaje de votos republicano es: " + statistics.votes_with_party_pct_republicans);

    console.log("-------------------------------------------------------------------------------");

    console.log("numero de democratas: " + numD);
    console.log("votos democratas: " + votesD);
    console.log("porcentaje de votos democrata es: " + statistics.votes_with_party_pct_democrats)

    console.log("-------------------------------------------------------------------------------");

    console.log("numero de Independientes: " + numI);
    console.log("votos independientes: " + votesI);
    console.log("porcentaje de votos independientes es: " + statistics.votes_with_party_pct_independence);
}
//llamada a la funcion.
getVotes();

console.log("-------------------------------------------------------------------------------");
console.log(statistics.total_representantes);

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*funcion para calcular el porcentaje de los representantes que mas veces y menos veces votan con su partido */
function missedVotes() {
    //declaracion de arrrays que uso en la funcion
    var VmissedVote = [];
    var arrayOrdenado = [];
    var arrayMissedFinalTop = [];

    //mrtodo for para introducir el valor de members[i].missed_votes en la variable array VmisseVote.
    for (i = 0; i < members.length; i++) {

        VmissedVote.push(members[i].missed_votes);
    }

    //uso una funcion sort para ordnar numeros en mi array VmissedVotes.
    VmissedVote.sort(function (a, b) {
        return a - b
    });


    //uso esta variable para calcular el 10% de los representantes,uso Math.floor para redondear el resultado
    var totalMembers = Math.floor((members.length / 100) * 10);
    console.log(VmissedVote);


    //con este metodo for introduzco en arrayOrdenado el 10% de los elementos de VmissedVote mas bajos.
    for (i = 0; i < totalMembers; i++) {
        arrayOrdenado.push(VmissedVote[i]);
    }

    var VmissedVoteReverse = VmissedVote.reverse();
    //es lo mismo que el anterio pero usando la variable VmisseVotesReverse que revierte VmissedVote.
    arrayOrdenado2 = [];
    //for para llenar el nuevo array.
    for (i = 0; i < totalMembers; i++) {
        arrayOrdenado2.push(VmissedVoteReverse[i]);
    }
    console.log(VmissedVoteReverse);
    console.log(arrayOrdenado);
    console.log(arrayOrdenado2);
    /*aqui utilizo un metodo for para introducir en el array arrayMissedFinal los miembros que cumplen
    la condicion del método if que pide que sean iguales que el arrayOrdenado y el valor de members[j].missed_votes y a su vez que no se repitan comparandolos con los que ya estan dentro */
    for (i = 0; i < arrayOrdenado.length; i++) {
        for (j = 0; j < members.length; j++) {
            if (arrayOrdenado[i] == members[j].missed_votes && arrayOrdenado[i + 1] != members[j].missed_votes) {
                arrayMissedFinalTop.push(members[j])
            }
        }
    }
    arrayMissedFinalBotton = [];
    for (i = 0; i < arrayOrdenado.length; i++) {
        for (j = 0; j < members.length; j++) {
            if (arrayOrdenado2[i] == members[j].missed_votes && arrayOrdenado2[i + 1] != members[j].missed_votes) {
                arrayMissedFinalBotton.push(members[j])
            }
        }
    }
    //muestra el rsultado del array

    console.log(arrayMissedFinalTop.length);
    console.log("este es el array de los que menos se han perdido votaciones,LOYALTY")
    for (i = 0; i < arrayMissedFinalTop.length; i++) {

    }
    console.log(arrayMissedFinalBotton.length);
    console.log("este es el array de los que mas se han perdido votaciones,LOYALTY")
    for (i = 0; i < arrayMissedFinalBotton.length; i++) {
        console.log(arrayMissedFinalBotton[i]);
    }
    statistics.Least_Engaged_Bottom_Attendance = arrayMissedFinalBotton;
    statistics.Most_Engaged_Top_Attendance = arrayMissedFinalTop;


}

missedVotes();
console.log("--------------------");

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

/*funcion para calcular el porcentaje de llos representantes que mas veces y menos veces votan con su partido */
function votesWithParty() {
    //declaracion de arrrays que uso en la funcion
    var votesParty = [];
    var arrayOrdenado = [];
    var arrayVotesFinalTop = [];

    //mrtodo for para introducir el valor de members[i].missed_votes en la variable array VmisseVote.
    for (i = 0; i < members.length; i++) {

        votesParty.push(members[i].votes_with_party_pct);
    }

    //uso una funcion sort para ordnar numeros en mi array VmissedVotes.
    votesParty.sort(function (a, b) {
        return a - b
    });


    //uso esta variable para calcular el 10% de los representantes,uso Math.floor para redondear el resultado
    var totalMembers = Math.floor((members.length / 100) * 10);
    console.log(votesParty);


    //con este metodo for introduzco en arrayOrdenado el 10% de los elementos de VmissedVote mas bajos.
    for (i = 0; i < totalMembers; i++) {
        arrayOrdenado.push(votesParty[i]);
    }

    var VmissedVoteReverse = votesParty.reverse();
    //es lo mismo que el anterio pero usando la variable VmisseVotesReverse que revierte VmissedVote.
    arrayOrdenado2 = [];
    //for para llenar el nuevo array.
    for (i = 0; i < totalMembers; i++) {
        arrayOrdenado2.push(VmissedVoteReverse[i]);
    }
    console.log(VmissedVoteReverse);
    console.log(arrayOrdenado);
    console.log(arrayOrdenado2);
    /*aqui utilizo un metodo for para introducir en el array arrayMissedFinal los miembros que cumplen
    la condicion del método if que pide que sean iguales que el arrayOrdenado y el valor de members[j].missed_votes y a su vez que no se repitan comparandolos con los que ya estan dentro */
    for (i = 0; i < arrayOrdenado.length; i++) {
        for (j = 0; j < members.length; j++) {
            if (arrayOrdenado[i] == members[j].votes_with_party_pct && arrayOrdenado[i + 1] != members[j].votes_with_party_pct) {
                arrayVotesFinalTop.push(members[j])
            }
        }
    }
    arrayVotesFinalBotton = [];
    for (i = 0; i < arrayOrdenado.length; i++) {
        for (j = 0; j < members.length; j++) {
            if (arrayOrdenado2[i] == members[j].votes_with_party_pct && arrayOrdenado2[i + 1] != members[j].votes_with_party_pct) {
                arrayVotesFinalBotton.push(members[j])
            }
        }
    }



    statistics.Least_Loyal_Bottom_of_Party = arrayVotesFinalBotton;
    statistics.Most_Loyal_Top_of_Party = arrayVotesFinalTop;
}
votesWithParty();
/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

console.log("------------------------------------------------------------------------------------------")
console.log("------------------------------------------------------------------------------------------")
console.log("------------------------------------------------------------------------------------------")
console.log("numero Democratas " + statistics.num_democrats);
console.log("numero Republicanos " + statistics.num_republican);
console.log("numero Indepe " + statistics.num_independend);

console.log("Most_Engaged_Top_Attendance")
console.log(statistics.Most_Engaged_Top_Attendance);

console.log("Least_Engaged_Bottom_Attendance")
console.log(statistics.Least_Engaged_Bottom_Attendance);

console.log("Most_Loyal_Top_of_Party")
console.log(statistics.Most_Loyal_Top_of_Party);

console.log("Least_Loyal_Bottom_of_Party")
console.log(statistics.Least_Loyal_Bottom_of_Party);

console.log("total_representantes")
console.log(statistics.total_representantes);

console.log("votes_pct_democrats")
console.log(statistics.votes_pct_democrats);

console.log("votes_pct_independence")
console.log(statistics.votes_pct_independence);

console.log("votes_pct_republicans")
console.log(statistics.votes_pct_republicans);

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function insertTd1() {

    var numRep = document.createElement("td");
    document.getElementById("republican").appendChild(numRep);
    numRep.textContent = statistics.num_republican;

    var numDem = document.createElement("td");
    document.getElementById("democrat").appendChild(numDem);
    numDem.textContent = statistics.num_democrats;

    var numIdp = document.createElement("td");
    document.getElementById("independent").appendChild(numIdp);
    numIdp.textContent = statistics.num_independend;

    /*----------------------------------------------------------------------------------------*/
    var pctRep = document.createElement("td");
    document.getElementById("republican").appendChild(pctRep);
    pctRep.textContent = statistics.votes_pct_republicans;

    var pctDem = document.createElement("td");
    document.getElementById("democrat").appendChild(pctDem);
    pctDem.textContent = statistics.votes_pct_democrats;

    var pctIdp = document.createElement("td");
    document.getElementById("independent").appendChild(pctIdp);
    pctIdp.textContent = statistics.votes_pct_independence;



}
insertTd1();

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

if (document.getElementById("tableAtt2") !=null && document.getElementById("tableAtt3") != null) {
    function insertBottomAttendance() {


        function getName(i) {
            var firstName = statistics.Least_Engaged_Bottom_Attendance[i].first_name;
            var middleName = statistics.Least_Engaged_Bottom_Attendance[i].middle_name;
            var lastName = statistics.Least_Engaged_Bottom_Attendance[i].last_name;

            if (middleName == null) {
                middleName = " ";
            }
            var fullName = firstName + " " + middleName + " " + lastName;

            return fullName;
        }

        for (var i = 0; i < statistics.Least_Engaged_Bottom_Attendance.length; i++) {
            var newTr1 = document.createElement("tr");
            document.getElementById("tableAtt2").appendChild(newTr1);

            var fullName = document.createElement("td");
            newTr1.appendChild(fullName);
            var tagA = document.createElement("a");
            fullName.appendChild(tagA);
            tagA.setAttribute("href", statistics.Least_Engaged_Bottom_Attendance[i].url);
            tagA.textContent = getName(i);


            var numberMissed1 = document.createElement("td");
            newTr1.appendChild(numberMissed1);
            numberMissed1.textContent = statistics.Least_Engaged_Bottom_Attendance[i].missed_votes;

            var pctMissed1 = document.createElement("td");
            newTr1.appendChild(pctMissed1);
            pctMissed1.textContent = statistics.Least_Engaged_Bottom_Attendance[i].missed_votes_pct;
        }
    }
    insertBottomAttendance();

    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

    function insertTopAttendance() {


        function getName(i) {
            var firstName = statistics.Most_Engaged_Top_Attendance[i].first_name;
            var middleName = statistics.Most_Engaged_Top_Attendance[i].middle_name;
            var lastName = statistics.Most_Engaged_Top_Attendance[i].last_name;

            if (middleName == null) {
                middleName = " ";
            }
            var fullName = firstName + " " + middleName + " " + lastName;

            return fullName;
        }


        for (var i = 0; i < statistics.Most_Engaged_Top_Attendance.length; i++) {
            var newTr2 = document.createElement("tr");
            document.getElementById("tableAtt3").appendChild(newTr2);

            var fullName = document.createElement("td");
            newTr2.appendChild(fullName);
            var tagA = document.createElement("a");
            fullName.appendChild(tagA);
            tagA.setAttribute("href", statistics.Most_Engaged_Top_Attendance[i].url);
            tagA.textContent = getName(i);

            var numberMissed = document.createElement("td");
            newTr2.appendChild(numberMissed);
            numberMissed.textContent = statistics.Most_Engaged_Top_Attendance[i].missed_votes;

            var pctMissed = document.createElement("td");
            newTr2.appendChild(pctMissed);
            pctMissed.textContent = statistics.Most_Engaged_Top_Attendance[i].missed_votes_pct;
        }

    }
    insertTopAttendance();
}

/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
else {
    function insertTopLoyalty() {
        function getName(i) {
            var firstName = statistics.Least_Loyal_Bottom_of_Party[i].first_name;
            var middleName = statistics.Least_Loyal_Bottom_of_Party[i].middle_name;
            var lastName = statistics.Least_Loyal_Bottom_of_Party[i].last_name;

            if (middleName == null) {
                middleName = " ";
            }
            var fullName = firstName + " " + middleName + " " + lastName;

            return fullName;
        }
        for (var i = 0; i < statistics.Least_Loyal_Bottom_of_Party.length; i++) {
            var newTr7 = document.createElement("tr");
            document.getElementById("tableLoyal3").appendChild(newTr7);


            var fullName = document.createElement("td");
            newTr7.appendChild(fullName);
            var tagA = document.createElement("a");
            fullName.appendChild(tagA);
            tagA.setAttribute("href", statistics.Least_Loyal_Bottom_of_Party[i].url);
            tagA.textContent = getName(i);


            var numberMissed2 = document.createElement("td");
            newTr7.appendChild(numberMissed2);
            numberMissed2.textContent = statistics.Least_Loyal_Bottom_of_Party[i].total_votes;

            var pctMissed2 = document.createElement("td");
            newTr7.appendChild(pctMissed2);
            pctMissed2.textContent = statistics.Least_Loyal_Bottom_of_Party[i].votes_with_party_pct;
        }
    }
    insertTopLoyalty();

    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/


    function insertBottonLoyalty() {

        function getName(i) {
            var firstName = statistics.Least_Loyal_Bottom_of_Party[i].first_name;
            var middleName = statistics.Least_Loyal_Bottom_of_Party[i].middle_name;
            var lastName = statistics.Least_Loyal_Bottom_of_Party[i].last_name;

            if (middleName == null) {
                middleName = " ";
            }
            var fullName = firstName + " " + middleName + " " + lastName;

            return fullName;
        }

        for (var i = 0; i < statistics.Most_Loyal_Top_of_Party.length; i++) {
            var newTr6 = document.createElement("tr");
            document.getElementById("tableLoyal1").appendChild(newTr6);

            var fullName = document.createElement("td");
            newTr6.appendChild(fullName);
            var tagA = document.createElement("a");
            fullName.appendChild(tagA);
            tagA.setAttribute("href", statistics.Least_Loyal_Bottom_of_Party[i].url);
            tagA.textContent = getName(i);

            var numberMissed = document.createElement("td");
            newTr6.appendChild(numberMissed);
            numberMissed.textContent = statistics.Most_Loyal_Top_of_Party[i].missed_votes;

            var pctMissed = document.createElement("td");
            newTr6.appendChild(pctMissed);
            pctMissed.textContent = statistics.Most_Loyal_Top_of_Party[i].missed_votes_pct;
        }

    }
    insertBottonLoyalty();
}
