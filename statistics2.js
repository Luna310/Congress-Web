var app = new Vue({
	el: '#app',
	data: {
		
		num_republican: 0,

		num_democrats: 0,

		num_independend: 0,

		total_representantes: 0,

		votes_pct_republicans: 0,

		votes_pct_democrats: 0,

		votes_pct_independence: 0,

		Most_Loyal_Top_of_Party: [],

		Least_Loyal_Bottom_of_Party: [],

		Least_Engaged_Bottom_Attendance: [],

		Most_Engaged_Top_Attendance: [],
		members: [],
		membersOriginal: [],
		senateFetch: "https://api.propublica.org/congress/v1/113/senate/members.json",
		houseFetch: "https://api.propublica.org/congress/v1/113/house/members.json",
	},
	created: function () {
		this.getData();
		this.getVotes();
		this.getName();
		this.missedVotes();
		this.votesWithParty();
	},
	methods: {

		selectPage: function () {

			var fetchUrl;
			if (document.getElementById("house")) {
				fetchUrl = this.houseFetch;
			} else {
				fetchUrl = this.senateFetch;
			}
			return fetchUrl;
		},
		getData: function () {
			fetch(this.selectPage(), {
				method: "GET",
				headers: {
					'X-API-Key': 'huqblbvuIkdDWR6BHiMGYTSZpftKpjMTh0ub5JNg'
				}
			}).then(function (response) {
				if (response.ok) {


					return response.json();
				}

			}).then(function (json) {
				//                app.name=json.results[0].members[0].first_name + json.results[0].members[0].middle_name + json.results[0].members[0].last_name;
				app.membersOriginal = json.results[0].members;
				app.members = json.results[0].members;
				app.getVotes();
				app.missedVotes();
				app.votesWithParty();
				console.log(app.members);

			}).catch(function (error) {
				console.log("Request failed:" + error.message);
			});
		},
		getVotes: function () {
			//declaración de variables 
			var votesR = this.members[0].total_votes;
			var votesD = this.members[0].total_votes;
			var votesI = this.members[0].total_votes;
			var numR = 0;
			var numD = 0;
			var numI = 0;
			/*sentencia for que va sumando los votos de cada representante de cada partido y ue tambien
			uso para averiguar el numero de representantes de cada partido*/
			for (i = 0; i < this.members.length; i++) {
				if (this.members[i].party == "R") {
					//esto hace que la variable vaya aumentando su valor segun recorre los miembros.
					votesR = this.members[i].total_votes + votesR;
					numR++;
				}


			}
			for (i = 0; i < this.members.length; i++) {
				if (this.members[i].party == "D") {
					votesD = this.members[i].total_votes + votesD;
					numD++;
				}
			}
			for (i = 0; i < this.members.length; i++) {
				if (this.members[i].party == "I") {
					votesI = this.members[i].total_votes + votesI;
					numI++;
				}
			} //hasta aqui llegan los for que hayan votos y representantes.

			/*declaracion de variables que calculan el total de votos y el porcentaje de votos por partidos*/
			var totalVotes = votesD + votesI + votesR;
			var porcentR = (votesR / totalVotes) * 100;
			var porcentD = (votesD / totalVotes) * 100;
			var porcentI = (votesI / totalVotes) * 100;


			//paso elvalor a los elementos del objeto principal.
			this.num_republican = numR;
			this.num_democrats = numD;
			this.num_independend = numI;
			//utilizando element.toFixed para limitar a dos los decimales.
			this.votes_pct_republicans = porcentR.toFixed(2) + " %";
			this.votes_pct_democrats = porcentD.toFixed(2) + " %";
			this.votes_pct_independence = porcentI.toFixed(2) + " %";

			this.total_representantes = numR + numD + numI;


			this.total_representantes = numR + numD + numI;

		},
		/*funcion para calcular el porcentaje de los representantes que mas veces y menos veces votan con su partido */
		missedVotes: function () {
			//declaracion de arrrays que uso en la funcion
			var VmissedVote = [];
			var arrayOrdenado = [];
			var arrayMissedFinalTop = [];

			//mrtodo for para introducir el valor de members[i].missed_votes en la variable array VmisseVote.
			for (i = 0; i < this.membersOriginal.length; i++) {

				VmissedVote.push(this.membersOriginal[i].missed_votes);
			}
			console.log(VmissedVote);
			//uso una funcion sort para ordnar numeros en mi array VmissedVotes.
			VmissedVote.sort(function (a, b) {
				return a - b
			});


			//uso esta variable para calcular el 10% de los representantes,uso Math.floor para redondear el resultado
			var totalMembers = Math.floor((this.membersOriginal.length / 100) * 10);
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
			/*aqui utilizo un metodo for para introducir en el array arrayMissedFinal los miembros que cumplen
			la condicion del método if que pide que sean iguales que el arrayOrdenado y el valor de members[j].missed_votes y a su vez que no se repitan comparandolos con los que ya estan dentro */
			for (i = 0; i < arrayOrdenado.length; i++) {
				for (j = 0; j < this.membersOriginal.length; j++) {
					if (arrayOrdenado[i] == this.membersOriginal[j].missed_votes && arrayOrdenado[i + 1] != this.membersOriginal[j].missed_votes) {
						arrayMissedFinalTop.push(this.membersOriginal[j])
					}
				}
			}
			arrayMissedFinalBotton = [];
			for (i = 0; i < arrayOrdenado.length; i++) {
				for (j = 0; j < this.membersOriginal.length; j++) {
					if (arrayOrdenado2[i] == this.membersOriginal[j].missed_votes && arrayOrdenado2[i + 1] != this.membersOriginal[j].missed_votes) {
						arrayMissedFinalBotton.push(this.membersOriginal[j])
					}
				}
			}
			for (i = 0; i < arrayMissedFinalTop.length; i++) {

			}
			for (i = 0; i < arrayMissedFinalBotton.length; i++) {

			}
			this.Least_Engaged_Bottom_Attendance = arrayMissedFinalBotton;
			this.Most_Engaged_Top_Attendance = arrayMissedFinalTop;
			console.log(arrayMissedFinalBotton)

		},
		/*funcion para calcular el porcentaje de llos representantes que mas veces y menos veces votan con su partido */
		votesWithParty: function () {
			//declaracion de arrrays que uso en la funcion
			var votesParty = [];
			var arrayOrdenado = [];
			var arrayVotesFinalTop = [];

			//mrtodo for para introducir el valor de members[i].missed_votes en la variable array VmisseVote.
			for (i = 0; i < this.membersOriginal.length; i++) {

				votesParty.push(this.membersOriginal[i].votes_with_party_pct);
			}

			//uso una funcion sort para ordnar numeros en mi array VmissedVotes.
			votesParty.sort(function (a, b) {
				return a - b
			});


			//uso esta variable para calcular el 10% de los representantes,uso Math.floor para redondear el resultado
			var totalMembers = Math.floor((this.membersOriginal.length / 100) * 10);
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
				for (j = 0; j < this.membersOriginal.length; j++) {
					if (arrayOrdenado[i] == this.membersOriginal[j].votes_with_party_pct && arrayOrdenado[i + 1] != this.membersOriginal[j].votes_with_party_pct) {
						arrayVotesFinalTop.push(this.membersOriginal[j])
					}
				}
			}
			arrayVotesFinalBotton = [];
			for (i = 0; i < arrayOrdenado.length; i++) {
				for (j = 0; j < this.membersOriginal.length; j++) {
					if (arrayOrdenado2[i] == this.membersOriginal[j].votes_with_party_pct && arrayOrdenado2[i + 1] != this.membersOriginal[j].votes_with_party_pct) {
						arrayVotesFinalBotton.push(this.membersOriginal[j])
					}
				}
			}



			this.Least_Loyal_Bottom_of_Party = arrayVotesFinalBotton;
			this.Most_Loyal_Top_of_Party = arrayVotesFinalTop;
		},
		

	}
});
