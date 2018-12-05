var app = new Vue({
	el: '#app',
	data: {
		loading: false,
		membersState: [],
		membersParty: [],
		members: [],
		membersOriginal: [],
		stateArray: ["all"],
		senateFetch: "https://api.propublica.org/congress/v1/113/senate/members.json",
		houseFetch: "https://api.propublica.org/congress/v1/113/house/members.json",
	},
	created: function () {
		this.getData();
		this.filterState();
		this.filterMembersState();
		this.filterMembersParty();
		this.filterFinal();
		this.multiFilter();
		this.ready();
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

				app.membersOriginal = json.results[0].members;
				app.members = json.results[0].members;
				app.membersParty = json.results[0].members;
				app.membersState = json.results[0].members;
				app.filterState();
				app.filterMembersState();
				app.filterMembersParty();
				app.multiFilter();
				app.filterFinal();
				app.ready();
				console.log(app.members);

			}).catch(function (error) {
				console.log("Request failed:" + error.message);
			});
		},
		filterState: function () {
			var aux = ["all"];
			for (i = 0; i < this.membersOriginal.length; i++) {

				aux.push(this.members[i].state)
			}
			this.stateArray = aux.filter(function (item, index, array) {
				return array.indexOf(item) === index;
			})


		},
		filterMembersState: function () {

			var stateFinal = [];

			var accesState = document.getElementById("selectState").value;
			console.log(accesState)
			if (accesState == "all") {
				console.log(stateFinal)
				stateFinal = this.membersOriginal;

			} else {
				for (j = 0; j < this.membersOriginal.length; j++) {
					if (accesState == this.membersOriginal[j].state) {
						stateFinal.push(this.membersOriginal[j]);
					}
				}
			}
			this.members = stateFinal;
			this.membersState = stateFinal;

		},
		filterMembersParty: function () {

			var checkBox = document.querySelectorAll('input[name=party]:checked');
			var membersFilter = [];
			for (i = 0; i < checkBox.length; i++) {
				for (j = 0; j < this.membersOriginal.length; j++) {
					if (checkBox[i].value == this.membersOriginal[j].party) {
						membersFilter.push(this.membersOriginal[j]);
					}
				}
			}
			this.members = membersFilter;
			this.membersParty = membersFilter;
		},
		filterFinal: function () {
			this.filterMembersState();
			this.filterMembersParty();

			var aux3 = [];
			for (i = 0; i < this.membersParty.length; i++) {
				for (j = 0; j < this.membersState.length; j++) {
					if (this.membersParty[i] == this.membersState[j]) {
						aux3.push(this.members[i])
					}
				}
			}
			this.members = aux3

		},
		
	}
});
