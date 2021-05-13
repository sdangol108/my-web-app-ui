 const Reservation = {
    template: `
    <div class="float-container">
    <Navigation class="float-child"/>
    <div class="float-child">
      <h1> Reservation</h1>
       <form id="formReservation">
          <fieldset>
            <div class="field section align-left" style="margin-top:3em">
                <label for="emfirstNameail" class="label-format"> First Name: </label>
                <input type="text"  v-model="firstName" name="firstName" />
            </div>
            <div class="field section align-left" style="margin-top:3em">
                <label for="lastName" class="label-format "> Last Name: </label>
                <input type="text"  v-model="lastName" name="lastName" />
            </div>
            <div class="field section align-left" style="margin-top:3em">
                <label for="email" class="label-format">Email: </label>
                <input type="email"  v-model="email"  name="Email" />
            </div>
            <div class="field section align-left" style="margin-top:3em">
                <label for="partySize" class="label-format">Party Size: </label>
                <select id="partySize" name="partySize"   @change="changePartySize($event)" class=" number-setter">
                    <option v-for="partySize in partySizes" :value="partySize" v-model="partySize" :key="partySize">{{ partySize }}</option>
                </select>
            </div>
            <div class="field section align-left" style="margin-top:3em">
                <label for="datePicker" class="label-format">Date:</label>
                <input type="date" :value="selectedDateFormatting(reservationDate)" @input="reservationDate = $event.target.valueAsDate" name="datePicker" />
                <select id="hours" name="hours"   @change="changeHours($event)" class=" number-setter">
                    <option v-for="hour in hours" :value="hour" v-model="hour" :key="hour">{{ hour }}</option>
                </select>
                <select id="minutes" name="minutes"   @change="changeMinutes($event)"class="number-setter">
                    <option v-for="minute in minutes" :value="minute" v-model="minute" :key="minute">{{ minute }}</option>
                </select>
            </div>
            <div class="field section " style="margin-top:3em">
                <button  type="button" aria-label="Submit" v-on:click="createReservation">
                    Submit
                </button>
            </div>
          </fieldset>
          <div class="section">
                <i v-if="createSuccessMessage">{{createSuccessMessage}}</i>
                <i v-else>{{errorMessage}}</i>
        </div>
        </form>

    </div>
</div>`,
  
    data() {
      return {
        hours: Array.from(Array(23),(x,i)=> ("0" + (i+1)).slice(-2)),
        minutes: ["00", 15, 30, 45],
        partySizes: 50,
        firstName: '',
        lastName: '',
        email: '',
        selectedPartySize: 0,
        reservationDate: new Date(),
        selectedHour: '01',
        selectedMinutes: '00',
        errorMessage: '',
        createSuccessMessage: '',

      };
    },
    mounted() {
    },
    watch: {
    },
    methods: {
        changeHours(event) {
            this.selectedHour = event.target.options[event.target.options.selectedIndex].text;
        },
        changeMinutes(event) {
            this.selectedMinutes = event.target.options[event.target.options.selectedIndex].text;
        },
        changePartySize(event) {
            this.reservationDate = event.target.options[event.target.options.selectedIndex].text;
        },
        async createReservation() {
            const bodyDAta =JSON.stringify({ 
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                party_size: this.selectedPartySize,
                reservation_datetime : this.selectedDateFormatting(this.reservationDate) + ' ' + this.selectedHour + ':' + this.selectedMinutes+ ':' + '00'
            });
            const requestOptions = {
                url: "http://localhost:8081/api/createReservation.php",
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                data: bodyDAta
              };
              axios(requestOptions)
                .then(response => {
                    console.log(response);
                    if(response.status == 200) {
                        this.createSuccessMessage = response.data.message;
                    }
                }).catch(
                    function (error) {
                      console.log('Error while saving')
                      return Promise.reject(error)
                    }
                  );
        },

        selectedDateFormatting(d) {
            return d && new Date(d.getTime()-(d.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]
        }
        
    },
  };
  
  